import * as fs from 'fs';
import { IServer } from 'types';
import { createServer } from './server.ts';

const file = fs.readFileSync("server.json", "utf8");

try {

    const configs: IServer[] = JSON.parse(file);

    createServer(configs);

} catch (e) {
    console.error('Error parsing JSON file.');
    console.error('Error:', e);

    process.exit(1);
}