const path = require('path')
const { ejsCompile, writeFile, mkdirSync } = require('./utils/file')
const fs = require('fs')
const chalk = require("chalk")
const ora = require("ora")
const shell = require('shelljs')

const add_stylus = () => {
    return require('./template/stylus')
}
const add_cesium = () => {
    return require('./template/cesium')
}
const add_dll = () => {
    return require('./template/dll')
}
const handleTemplate = async (dir, templates) => {
    shell.cd(dir)
    mkdirSync('./scripts')
    const modules = new Set()
    if (templates.includes('stylus')) {
        const process = ora(chalk.blue(`config stylus\n`))
        process.start()
        process.color = "yellow"
        process.text = chalk.blue(`config stylus\n`)
        shell.exec('npm i stylus@0.56.0 stylus-loader@6.2.0 -D')
        process.stop()
    }
    if (templates.includes('cesium')) {
        modules.add(`const webpack = require('webpack')`)
        modules.add(`const CopyWebpackPlugin = require('copy-webpack-plugin')`)

        const process = ora(chalk.blue(`config cesium\n`))
        process.start()
        process.color = "yellow"
        process.text = chalk.blue(`config cesium\n`)
        shell.exec('npm i cesium@1.90.0 -S')
        shell.exec('npm i copy-webpack-plugin@10.2.4 -D')
        process.stop()
    }
    if (templates.includes('dll')) {
        const vendor = []
        if (templates.includes('cesium')) vendor.push('cesium')
        modules.add(`const webpack = require('webpack')`)
        modules.add(`const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')`)

        const dll = await ejsCompile(path.resolve(__dirname, './template/dll.js.ejs'), { vendor })
        await writeFile(path.resolve('./scripts', 'dll.js'), dll)
        const dll_bundle = await ejsCompile(path.resolve(__dirname, './template/dll_bundle.js.ejs'), { vendor })
        await writeFile(path.resolve('./scripts', 'dll_bundle.js'), dll_bundle)

        fs.readFile(`./package.json`, 'utf8', async (err, data) => {
            const sign = '"eject": "react-scripts eject"'
            const indexOf = data.indexOf(sign)
            const package =
                data.substring(0, indexOf + sign.length) +
                ',\n    "dll": "webpack --config ./scripts/dll.js",\n    "dll:build": "webpack --config ./scripts/dll_bundle.js"' +
                data.substring(indexOf + sign.length)

            fs.writeFileSync(path.resolve(`./`, 'package.json'), package)

            const process = ora(chalk.blue(`config dll\n`))
            process.start()
            process.color = "yellow"
            process.text = chalk.blue(`config dll\n`)
            shell.exec('npm i webpack-cli@4.9.2 add-asset-html-webpack-plugin@3.2.0 -D')
            if (templates.includes('cesium')) {
                process.text = chalk.blue(`npm run dll\n`)
                shell.exec('npm run dll')
                process.text = chalk.blue(`npm run dll:build\n`)
                shell.exec('npm run dll:build')
            }
            process.stop()
        })
    }

    const templateConfig = templates.map(templateTag => eval(`add_${templateTag}()`))
    const dataEjs = {
        modules: [...modules],
        funcName: templateConfig.map(config => config.funcName),
        func: templateConfig.map(config => config.func)
    }
    const overrides = await ejsCompile(path.resolve(__dirname, './template/overrides.js.ejs'), dataEjs)
    await writeFile(path.resolve('./scripts', 'overrides.js'), overrides)
}

module.exports = {
    handleTemplate
}