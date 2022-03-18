export interface GitOptions {
    /**
     * Work tree directory
     */
    worktree: string

    /**
     * Git directory if different from worktree/.git
     */
    gitdir?: string

    /**
     * Message
     */
    message: string
}
