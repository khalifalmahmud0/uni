import { env } from 'process';
import { anyObject } from '../common_types/object';
require('dotenv').config();

const protocol = env.SERVER_PROTOCOL || 'http';
const host = env.SERVER_HOST || '127.0.0.1';
const port = env.SERVER_PORT || 5000;
const server_url = `${protocol}://${host}:${port}`;

export const app_config = {
    port,
    server_url,
} as anyObject;

export function config(key: string) {
    return app_config[key];
}
