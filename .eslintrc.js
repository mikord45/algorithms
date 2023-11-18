export const config = {
	"env": {
		"es2021": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	// probably not needed after modifying file extension from .cjs to .js and implementing `export` keyword
	// "overrides": [
	// 	{
	// 		"env": {
	// 			"node": true
	// 		},
	// 		"files": [
	// 			".eslintrc.{js,cjs}"
	// 		],
	// 		"parserOptions": {
	// 			"sourceType": "script"
	// 		}
	// 	}
	// ],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "12",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		]
	}
}
