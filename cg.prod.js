const { merge } = require('webpack-merge')
const __ClCommon = require("./.devcontainer/cl.common")

module.exports = merge(__ClCommon, {
    devtool: "source-map",
    mode: "production",
})
