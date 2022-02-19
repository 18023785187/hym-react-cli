const chalk = require("chalk")
// 用户与命令行交互的工具
// const Prompt = require("inquirer")
const clone = require("./clone")

const create = async (projectName, isTs, templates) => {
    try {
        await clone(projectName, isTs, templates)
    } catch (error) {
        console.log(chalk.red(error))
    }
}

module.exports = create
