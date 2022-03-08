module.exports = {
    funcName: 'cesiumConfig',
    func:`
// cesium配置
function cesiumConfig(config) {
    // cseium配置 1.创建路径
    const cesiumSource = './node_modules/cesium/Source'
    const cesiumWorkers = '../Build/Cesium/Workers'
    // loader
    config.module.unknownContextCritical = false
    // plugins
    config.plugins.push(
        new CopyWebpackPlugin({
            patterns: [{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' }]
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: path.join(cesiumSource, 'Core'), to: 'Core' }]
        }),
        // cseium配置 3. 配置CESIUM_BASE_URL路径
        new webpack.DefinePlugin({
            CESIUM_BASE_URL: JSON.stringify('')
        })
    )
    return config
}`
}
