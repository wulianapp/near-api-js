import { TypedError } from '@chainless-js/types';
import { Logger } from '@chainless-js/utils';
import createError from 'http-errors';

import { exponentialBackoff } from './exponential-backoff';

const START_WAIT_TIME_MS = 1000;
const BACKOFF_MULTIPLIER = 1.5;
const RETRY_NUMBER = 10;

export interface ConnectionInfo {
    url: string;
    user?: string;
    password?: string;
    allowInsecure?: boolean;
    timeout?: number;
    headers?: { [key: string]: string | number };
}

/**
 * Performs an HTTP request to a specified URL or connection and returns the parsed JSON response.
 * @param connectionInfoOrUrl The connection information or URL for the HTTP request.
 * @param json The JSON payload to be included in the request body for POST requests.
 * @returns A Promise that resolves to the parsed JSON response from the HTTP request.
 */
export async function fetchJson(connectionInfoOrUrl: string | ConnectionInfo, json?: string): Promise<any> {
    let connectionInfo: ConnectionInfo = { url: null };
    if (typeof (connectionInfoOrUrl) === 'string') {
        connectionInfo.url = connectionInfoOrUrl;
    } else {
        connectionInfo = connectionInfoOrUrl as ConnectionInfo;
    }

    const response = await exponentialBackoff(START_WAIT_TIME_MS, RETRY_NUMBER, BACKOFF_MULTIPLIER, async () => {
        try {

            const response = await (global.fetch ?? (await import('./fetch')).default)(connectionInfo.url, {
                method: json ? 'POST' : 'GET',
                body: json ? json : undefined,
                headers: { ...connectionInfo.headers, 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                if (response.status === 503) {
                    Logger.warn(`Retrying HTTP request for ${connectionInfo.url} as it's not available now`);
                    return null;
                } else if (response.status === 408) {
                    Logger.warn(`Retrying HTTP request for ${connectionInfo.url} as the previous connection was unused for some time`);
                    return null;
                }
                throw createError(response.status, await response.text());
            }
            return response;
        } catch (error) {
            if (error.toString().includes('FetchError') || error.toString().includes('Failed to fetch')) {
                Logger.warn(`Retrying HTTP request for ${connectionInfo.url} because of error: ${error}`);
                return null;
            }
            throw error;
        }
    });
    if (!response) {
        throw new TypedError(`Exceeded ${RETRY_NUMBER} attempts for ${connectionInfo.url}.`, 'RetriesExceeded');
    }
    return await response.json();
}
