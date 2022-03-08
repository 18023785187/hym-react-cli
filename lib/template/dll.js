module.exports = {
    funcName: 'dllConfig',
    func: `
// dll配置
function dllConfig(config) {
    if (process.env.NODE_ENV === 'development') {
        config.plugins.push(
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require(path.resolve('./', 'dll/dev/manifest.json')),
            }),
            new AddAssetHtmlWebpackPlugin({
                filepath: path.resolve('./', 'dll/dev/vendor.js'),
                outputPath: 'dll',
                publicPath: 'dll',
                includeSourcemap: false
            })
        )
    } else {
        config.plugins.push(
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require(path.resolve('./', 'dll/prod/manifest.json')),
            }),
            new AddAssetHtmlWebpackPlugin({
                filepath: path.resolve('./', 'dll/prod/vendor.js'),
                outputPath: 'dll',
                publicPath: 'dll',
                includeSourcemap: false
            })
        )
    }
    return config
}`
}
