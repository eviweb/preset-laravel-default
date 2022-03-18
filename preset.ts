import path from "path"
import { existsSync, mkdirSync } from "fs"
import * as git from 'src/command/git'

export default definePreset({
	name: 'laravel-default',
	options: {
		dir: null,
		newLaravel: null,
		usePreset: null,
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

			await git.init({
				message: 'chore: initialize project',
				worktree: targetdir,
			})

			context.applyOptions.targetDirectory = targetdir
		}

		if (context.options.viteJs) {
			await applyNestedPreset({
				preset: 'laravel:vite',
				args: ['--no-tailwindcss']
			})

			await git.commit({
				message: 'feat: add vitejs support',
				worktree: context.applyOptions.targetDirectory,
			})
		}

		if (context.options.usePreset) {
			let presetInfo = context.options.usePreset

			if (!Array.isArray(presetInfo)) {
				presetInfo = new Array<string>(presetInfo);
			}
			for (var i = 0, l = presetInfo.length; i < l; i++) {
				let presetArgs = presetInfo[i].split(',')
				let presetName = presetArgs.shift();

				await applyNestedPreset({
					preset: presetName,
					args: presetArgs,
				})

				await git.commit({
					message: 'feat: apply ' + presetName + ' preset',
					worktree: context.applyOptions.targetDirectory,
				})
			}
		}

		await extractTemplates()
		// ...
	},
})
