/**
 * Helper class to generate role strings for `Permission`.
 */
export declare class Role {
    /**
     * Grants access to anyone.
     *
     * This includes authenticated and unauthenticated users.
     *
     * @returns {string}
     */
    static any(): string;
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
    static user(id: string, status?: string): string;
    /**
     * Grants access to any authenticated or anonymous user.
     *
     * You can optionally pass verified or unverified for
     * `status` to target specific types of users.
     *
     * @param {string} status
     * @returns {string}
     */
    static users(status?: string): string;
    /**
     * Grants access to any guest user without a session.
     *
     * Authenticated users don't have access to this role.
     *
     * @returns {string}
     */
    static guests(): string;
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
    static team(id: string, role?: string): string;
    /**
     * Grants access to a specific member of a team.
     *
     * When the member is removed from the team, they will
     * no longer have access.
     *
     * @param {string} id
     * @returns {string}
     */
    static member(id: string): string;
    /**
     * Grants access to a user with the specified label.
     *
     * @param {string} name
     * @returns  {string}
     */
    static label(name: string): string;
}
