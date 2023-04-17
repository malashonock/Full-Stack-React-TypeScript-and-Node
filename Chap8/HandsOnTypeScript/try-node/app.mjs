import * as fs from 'fs/promises';

await fs.writeFile('test.txt', 'Hello, world!');
const msg = await fs.readFile('test.txt', 'utf-8');
console.log(msg);