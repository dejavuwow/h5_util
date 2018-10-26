module.exports = {
	presets: [
		'@vue/app',
	],
	compact: false,
	plugins: [
		[
			"component",
			{
				"libraryName": "element-ui",
				"styleLibraryName": "theme-chalk"
			}
		]
	]
}
