module.exports = {
	"root": true,
	"env": {
		"node": true
	},
	"extends": [
		"plugin:vue/essential",
		"plugin:prettier/recommended", // we added this line
		"@vue/prettier"
	],
	"rules": {
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"indent": [1, "tab"]
	},
	"parserOptions": {
		"parser": "babel-eslint"
	}
}
