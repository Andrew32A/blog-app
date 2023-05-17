// import { createServer } from 'http';
// import { parse } from 'url';
// import posts from './pages/api/posts';
// import authors from './pages/api/authors';
// import tags from './pages/api/tags';
// import search from './pages/api/search';

// const server = createServer((req, res) => {
//   const parsedUrl = parse(req.url, true);
//   const { pathname, query } = parsedUrl;

//   if (pathname === '/api/posts') {
//     req.query = query;
//     posts(req, res);
//   } else if (pathname === '/api/authors') {
//     req.query = query;
//     authors(req, res);
//   } else if (pathname === '/api/tags') {
//     req.query = query;
//     tags(req, res);
//   } else if (pathname === '/api/search') {
//     req.query = query;
//     search(req, res);
//   } else {
//     res.statusCode = 404;
//     res.end('Not Found');
//   }
// });

// export default server;
