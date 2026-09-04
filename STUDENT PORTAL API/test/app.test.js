const { after, before, beforeEach, test } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');
const studentStore = require('../src/studentStore');

let server;
let baseUrl;

before(() => {
  server = app.listen(0);
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());
beforeEach(() => studentStore.clear());

async function createStudent(overrides = {}) {
  const response = await fetch(`${baseUrl}/students`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: 'Ada Lovelace',
      registrationNumber: 'STU/001',
      email: 'ada@example.com',
      ...overrides,
    }),
  });
  return { response, body: await response.json() };
}

test('creates a student account', async () => {
  const { response, body } = await createStudent();
  assert.equal(response.status, 201);
  assert.equal(body.student.name, 'Ada Lovelace');
  assert.ok(body.student.id);
  assert.ok(body.token);
});

test('gets only the authenticated student account', async () => {
  const first = await createStudent();
  const second = await createStudent({ registrationNumber: 'STU/002', email: 'grace@example.com' });

  const ownResponse = await fetch(`${baseUrl}/students/${first.body.student.id}`, {
    headers: { authorization: `Bearer ${first.body.token}` },
  });
  assert.equal(ownResponse.status, 200);

  const otherResponse = await fetch(`${baseUrl}/students/${second.body.student.id}`, {
    headers: { authorization: `Bearer ${first.body.token}` },
  });
  assert.equal(otherResponse.status, 403);
});

test('updates only the name', async () => {
  const { body } = await createStudent();
  const headers = {
    authorization: `Bearer ${body.token}`,
    'content-type': 'application/json',
  };

  const validResponse = await fetch(`${baseUrl}/students/${body.student.id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ name: 'Ada Byron' }),
  });
  assert.equal(validResponse.status, 200);
  assert.equal((await validResponse.json()).student.name, 'Ada Byron');

  const invalidResponse = await fetch(`${baseUrl}/students/${body.student.id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ email: 'new@example.com' }),
  });
  assert.equal(invalidResponse.status, 400);
});

test('deletes an authenticated student account', async () => {
  const { body } = await createStudent();
  const response = await fetch(`${baseUrl}/students/${body.student.id}`, {
    method: 'DELETE',
    headers: { authorization: `Bearer ${body.token}` },
  });
  assert.equal(response.status, 204);
  assert.equal(studentStore.findById(body.student.id), null);
});
