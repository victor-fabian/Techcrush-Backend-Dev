const { after, before, test } = require('node:test');
const assert = require('node:assert/strict');
const server = require('./server');

let baseUrl;

before(() => {
  server.listen(0);
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

const endpoints = [
  ['/home', 'Welcome to the home page'],
  ['/contact-us', 'Contact us'],
  ['/about', 'about us'],
];

for (const [route, expectedResponse] of endpoints) {
  test(`GET ${route} returns the expected response`, async () => {
    const response = await fetch(`${baseUrl}${route}`);

    assert.equal(response.status, 200);
    assert.equal(await response.text(), expectedResponse);
  });
}

test('an unknown route returns 404', async () => {
  const response = await fetch(`${baseUrl}/unknown`);

  assert.equal(response.status, 404);
  assert.equal(await response.text(), 'Page not found');
});
