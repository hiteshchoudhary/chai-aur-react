/**
 * Helper class to generate role strings for `Permission`.
 */
export class Role {

    /**
     * Grants access to anyone.
     * 
     * This includes authenticated and unauthenticated users.
     * 
     * @returns {string}
     */
    public static any(): string {
        return 'any'
    }

    /**
     * Grants access to a specific user by user ID.
     * 
     * You can optionally pass verified or unverified for
     * `status` to target specific types of users.
     *
     * @param {string} id 
     * @param {string} status 
     * @returns {string}
     */
    public static user(id: string, status: string = ''): string {
        if (status === '') {
            return `user:${id}`
        }
        return `user:${id}/${status}`
    }

    /**
     * Grants access to any authenticated or anonymous user.
     * 
     * You can optionally pass verified or unverified for
     * `status` to target specific types of users.
     * 
     * @param {string} status 
     * @returns {string}
     */
    public static users(status: string = ''): string {
        if (status === '') {
            return 'users'
        }
        return `users/${status}`
    }

    /**
     * Grants access to any guest user without a session.
     * 
     * Authenticated users don't have access to this role.
     * 
     * @returns {string}
     */
    public static guests(): string {
        return 'guests'
    }

    /**
     * Grants access to a team by team ID.
     * 
     * You can optionally pass a role for `role` to target
     * team members with the specified role.
     * 
     * @param {string} id 
     * @param {string} role 
     * @returns {string}
     */
    public static team(id: string, role: string = ''): string {
        if (role === '') {
            return `team:${id}`
        }
        return `team:${id}/${role}`
    }

    /**
     * Grants access to a specific member of a team.
     * 
     * When the member is removed from the team, they will
     * no longer have access.
     * 
     * @param {string} id 
     * @returns {string}
     */
    public static member(id: string): string {
        return `member:${id}`
    }

    /**
     * Grants access to a user with the specified label.
     * 
     * @param {string} name 
     * @returns  {string}
     */
    public static label(name: string): string {
        return `label:${name}`
    }
}