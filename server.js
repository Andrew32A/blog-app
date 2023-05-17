const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    // Handle API routes
    if (pathname === '/api/posts') {
      if (req.method === 'GET') {
        // Handle GET /api/posts request
        const posts = await prisma.post.findMany();
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(posts));
      } else if (req.method === 'POST') {
        // Handle POST /api/posts request
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', async () => {
          const { title, body } = JSON.parse(body);
          const newPost = await prisma.post.create({
            data: {
              title,
              body,
            },
          });
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 201;
          res.end(JSON.stringify(newPost));
        });
      } else {
        // Unsupported HTTP method
        res.statusCode = 405;
        res.end();
      }
    } else {
      // Let Next.js handle other routes
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('Server listening on http://localhost:3000');
  });
});
