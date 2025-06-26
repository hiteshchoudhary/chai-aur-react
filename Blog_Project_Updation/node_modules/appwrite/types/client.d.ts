import 'isomorphic-form-data';
import { Models } from './models';
declare type Payload = {
    [key: string]: any;
};
declare type Headers = {
    [key: string]: string;
};
export declare type RealtimeResponseEvent<T extends unknown> = {
    events: string[];
    channels: string[];
    timestamp: number;
    payload: T;
};
export declare type UploadProgress = {
    $id: string;
    progress: number;
    sizeUploaded: number;
    chunksTotal: number;
    chunksUploaded: number;
};
declare class AppwriteException extends Error {
    code: number;
    response: string;
    type: string;
    constructor(message: string, code?: number, type?: string, response?: string);
}
declare class Client {
    config: {
        endpoint: string;
        endpointRealtime: string;
        project: string;
        jwt: string;
        locale: string;
    };
    headers: Headers;
    /**
     * Set Endpoint
     *
     * Your project endpoint
     *
     * @param {string} endpoint
     *
     * @returns {this}
     */
    setEndpoint(endpoint: string): this;
    /**
     * Set Realtime Endpoint
     *
     * @param {string} endpointRealtime
     *
     * @returns {this}
     */
    setEndpointRealtime(endpointRealtime: string): this;
    /**
     * Set Project
     *
     * Your project ID
     *
     * @param value string
     *
     * @return {this}
     */
    setProject(value: string): this;
    /**
     * Set JWT
     *
     * Your secret JSON Web Token
     *
     * @param value string
     *
     * @return {this}
     */
    setJWT(value: string): this;
    /**
     * Set Locale
     *
     * @param value string
     *
     * @return {this}
     */
    setLocale(value: string): this;
    private realtime;
    /**
     * Subscribes to Appwrite events and passes you the payload in realtime.
     *
     * @param {string|string[]} channels
     * Channel to subscribe - pass a single channel as a string or multiple with an array of strings.
     *
     * Possible channels are:
     * - account
     * - collections
     * - collections.[ID]
     * - collections.[ID].documents
     * - documents
     * - documents.[ID]
     * - files
     * - files.[ID]
     * - executions
     * - executions.[ID]
     * - functions.[ID]
     * - teams
     * - teams.[ID]
     * - memberships
     * - memberships.[ID]
     * @param {(payload: RealtimeMessage) => void} callback Is called on every realtime update.
     * @returns {() => void} Unsubscribes from events.
     */
    subscribe<T extends unknown>(channels: string | string[], callback: (payload: RealtimeResponseEvent<T>) => void): () => void;
    call(method: string, url: URL, headers?: Headers, params?: Payload): Promise<any>;
}
export { Client, AppwriteException };
export { Query } from './query';
export type { Models, Payload };
export type { QueryTypes, QueryTypesList } from './query';
