export default definePreset({
	name: 'laravel-default',
	options: {
		// ...
	},
	handler: async() => {
		await extractTemplates()
		// ...
	},
})
