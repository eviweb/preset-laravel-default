import path from 'path'
import { GitOptions } from './git-options'

export async function init(options: GitOptions) {
    let worktree = options.worktree
    let gitdir = options.gitdir ? options.gitdir : path.resolve(options.worktree, '.git')

    await executeCommand({
        command: 'git', arguments: [
            '--git-dir=' + gitdir,
            '--work-tree=' + worktree,
            'init',
        ]
    })

    await commit(options)
}

export async function commit(options: GitOptions) {
    let message = options.message
    let worktree = options.worktree
    let gitdir = options.gitdir ? options.gitdir : path.resolve(options.worktree, '.git')

    await executeCommand({
        command: 'git', arguments: [
            '--git-dir=' + gitdir,
            '--work-tree=' + worktree,
            'add',
            '.',
        ]
    })
    await executeCommand({
        command: 'git', arguments: [
            '--git-dir=' + gitdir,
            '--work-tree=' + worktree,
            'commit',
            '-v',
            '-sm',
            message,
        ]
    })
}
