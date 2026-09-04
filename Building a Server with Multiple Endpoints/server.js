const http = require('node:http');

const routes = {
  '/home': 'Welcome to the home page',
  '/contact-us': 'Contact us',
  '/about': 'about us',
};

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host || 'localhost'}`).pathname;

  if (request.method === 'GET' && Object.hasOwn(routes, pathname)) {
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(routes[pathname]);
    return;
  }

  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Page not found');
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 3001;

  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

module.exports = server;
