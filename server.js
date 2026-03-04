const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const mime = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/index.html';

    const filePath = path.join(ROOT, urlPath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 – Not Found');
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        const contentType = mime[ext] || 'application/octet-stream';

        // Cache static assets for 1 year, others (like HTML) for shorter or revalidate
        let cacheControl = 'no-cache';
        if (['.css', '.js', '.woff', '.woff2', '.png', '.jpg', '.jpeg', '.svg', '.ico'].includes(ext)) {
            cacheControl = 'public, max-age=31536000, immutable';
        }

        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': cacheControl,
            'X-Content-Type-Options': 'nosniff'
        });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log('\n🚀  Portfolio is live!');
    console.log(`\n   ➜  Local:   http://localhost:${PORT}`);
    console.log('\n   Press Ctrl+C to stop.\n');
});
