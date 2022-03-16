import path from "path"

export default definePreset({
	name: 'laravel-default',
	options: {
		newLaravel: null// ...
	},
	handler: async (context) => {
		if (context.options.newLaravel) {
			let targetdir = path.resolve(context.options.newLaravel)

			await executeCommand({
				command: 'composer', arguments: [
					'create-project',
					'laravel/laravel',
					context.options.newLaravel,
				]
			})
			await executeCommand({
				command: 'git', arguments: [
					'init',
					context.options.newLaravel,
				]
			})
			await executeCommand({
				command: 'git', arguments: [
					'--git-dir=' + targetdir + '/.git',
					'--work-tree=' + targetdir,
					'add',
					'.',
				]
			})
			await executeCommand({
				command: 'git', arguments: [
					'--git-dir=' + targetdir + '/.git',
					'--work-tree=' + targetdir,
					'commit',
					'-v',
					'-sm',
					'init: first commit',
				]
			})

			context.applyOptions.targetDirectory = targetdir
		}

		await extractTemplates()
		// ...
	},
})
