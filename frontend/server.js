import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.PORT || 8080);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildDir = path.join(__dirname, 'build');
const indexFile = path.join(buildDir, 'index.html');

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.avif', 'image/avif'],
  ['.txt', 'text/plain; charset=utf-8'],
]);

const safeResolve = (requestPath) => {
  const decodedPath = decodeURIComponent(requestPath || '/');
  const resolvedPath = path.resolve(buildDir, '.' + decodedPath);
  if (!resolvedPath.startsWith(buildDir)) {
    return null;
  }
  return resolvedPath;
};

const sendFile = (filePath, res) => {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = contentTypes.get(ext) || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Internal Server Error');
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;
  const filePath = safeResolve(pathname);

  if (filePath && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    sendFile(filePath, res);
    return;
  }

  if (pathname.startsWith('/static/') && filePath) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Not Found');
    return;
  }

  sendFile(indexFile, res);
});

server.listen(port, () => {
  console.log(`Frontend server running on port ${port}`);
});
