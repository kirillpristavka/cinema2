import { createServer } from 'https';
import { parse } from 'url';
import next from 'next';
import fs from 'fs';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
key: fs.readFileSync('./server.key'),
cert: fs.readFileSync('./server.crt'),
};

app.prepare().then(() = {
createServer(httpsOptions, (req, res) = {
const parsedUrl = parse(req.url, true);
handle(req, res, parsedUrl);
}).listen(port, (err) = {
if (err) throw err;
console.log(`Server listening at https://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
});
});