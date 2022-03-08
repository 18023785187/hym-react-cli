module.exports = {
    funcName: 'stylConfig',
    func: `
// stylus配置
function stylConfig(config) {
    const stylusLoader = {
        test: /\.styl(us)?$/,
        use: [
            {
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
            }, {
                loader: 'stylus-loader'
            }
        ]
    }
    const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf
    oneOf.unshift(stylusLoader)
    return config
}`
}