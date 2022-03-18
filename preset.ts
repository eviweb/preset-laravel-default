import path from "path"
import { existsSync, mkdirSync } from "fs"

export default definePreset({
	name: 'laravel-default',
	options: {
		newLaravel: null,
		dir: null,
		viteJs: true,
	},
	handler: async (context) => {
		if (context.options.dir) {
			if (!existsSync(context.options.dir)) {
				mkdirSync(context.options.dir, { recursive: true, mode: 0o755 })
			}

			context.applyOptions.targetDirectory = path.resolve(context.options.dir)
		} else {
			context.options.dir = context.applyOptions.targetDirectory
		}

		if (context.options.newLaravel) {
			let targetdir = path.resolve(path.join(context.options.dir, context.options.newLaravel))

			await executeCommand({
				command: 'composer', arguments: [
					'create-project',
					'laravel/laravel',
					context.options.newLaravel,
				]
			})
			await executeCommand({
				command: 'git', arguments: [
					'--git-dir=' + targetdir + '/.git',
					'--work-tree=' + targetdir,
					'init',
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

		if (context.options.viteJs) {
			await applyNestedPreset({
				preset: 'laravel:vite',
				args: ['--no-tailwindcss']
			})
			await executeCommand({
				command: 'git', arguments: [
					'--git-dir=' + context.applyOptions.targetDirectory + '/.git',
					'--work-tree=' + context.applyOptions.targetDirectory,
					'add',
					'.',
				]
			})
			await executeCommand({
				command: 'git', arguments: [
					'--git-dir=' + context.applyOptions.targetDirectory + '/.git',
					'--work-tree=' + context.applyOptions.targetDirectory,
					'commit',
					'-v',
					'-sm',
					'feat: add vitejs support',
				]
			})
		}

		await extractTemplates()
		// ...
	},
})
