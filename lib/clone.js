// node的 util 模块 promisify可以把回调promise化
const { promisify } = require("util")
// 进度显示工具
const ora = require("ora")
// 颜色显示工具
const chalk = require("chalk")
// 下载git 仓库代码工具
const download = promisify(require("download-git-repo"))
const shell = require('shelljs')
const figlet = promisify(require('figlet'))
const { github, js } = require('./config/remote')
const { handleTemplate } = require('./action')

const clone = async function (dir, isTs, templates) {
    const repo = isTs ? github : github + js
    const process = ora(`download ${chalk.blue(repo)}\n`)
    process.start()
    process.color = "yellow"
    process.text = `download..... ${chalk.yellow(repo)}\n`

    try {
        await download(repo, dir, {})
        // 根据配置创建模板
        await handleTemplate(dir, isTs, templates)

        // 执行终端命令npm install
        const message = await figlet(`npm install`)
        console.log(chalk.green(message))
        shell.cd(dir)
        shell.exec('npm install')

        process.succeed(`successfully!
        ${chalk.yellow(`cd ${dir}`)}
        ${chalk.yellow('npm run start')}
        ${chalk.yellow('npm run build')}
        `)
        setTimeout(async () => {
            const success = await figlet(`666`)
            console.log(chalk.blue(success))
        }, 1000)
    } catch (error) {
        process.fail(chalk.red(error + '\nexit!'))
    }
}

module.exports = clone