import { Service } from '../service';
import { Client } from '../client';
import type { Models } from '../models';
export declare class Functions extends Service {
    constructor(client: Client);
    /**
     * List executions
     *
     * Get a list of all the current user function execution logs. You can use the
     * query params to filter your results.
     *
     * @param {string} functionId
     * @param {string[]} queries
     * @param {string} search
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    listExecutions(functionId: string, queries?: string[], search?: string): Promise<Models.ExecutionList>;
    /**
     * Create execution
     *
     * Trigger a function execution. The returned object will return you the
     * current execution status. You can ping the `Get Execution` endpoint to get
     * updates on the current execution status. Once this endpoint is called, your
     * function execution process will start asynchronously.
     *
     * @param {string} functionId
     * @param {string} body
     * @param {boolean} async
     * @param {string} xpath
     * @param {string} method
     * @param {object} headers
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    createExecution(functionId: string, body?: string, async?: boolean, xpath?: string, method?: string, headers?: object): Promise<Models.Execution>;
    /**
     * Get execution
     *
     * Get a function execution log by its unique ID.
     *
     * @param {string} functionId
     * @param {string} executionId
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    getExecution(functionId: string, executionId: string): Promise<Models.Execution>;
}
