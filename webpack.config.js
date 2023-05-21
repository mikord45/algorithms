const prodConfig = require("./webpack/prod")
const devConfig = require("./webpack/dev")

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  return isProduction ? prodConfig : devConfig
} 