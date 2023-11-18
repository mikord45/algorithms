import prodConfig from "./webpack/prod.js"
import devConfig from "./webpack/dev.js"

const main = (env, argv) => {
	const isProduction = argv.mode === "production"
	return isProduction ? prodConfig : devConfig
} 

export default main