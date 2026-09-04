# Student Portal API

A small REST API that lets students create an account and retrieve, rename, or delete only their own account.

## Setup

```bash
npm install
npm start
```

The server runs at `http://localhost:3000` by default. Set the `PORT` environment variable to use another port.

## Authentication

Creating an account returns a `token`. Send that token with every GET, PATCH, and DELETE request:

```text
Authorization: Bearer <token>
```

The token must belong to the student ID in the URL. Store it securely because it is returned only when the account is created.

## Endpoints

### Create an account

`POST /students`

```json
{
  "name": "Victor Fabian",
  "registrationNumber": "BAD/2026/TC-8/0226",
  "email": "victorvakes@gmail.com"
}
```

Returns `201 Created`, the new student, and their authentication token.

### Get your account

`GET /students/:id`

Requires the bearer token. Returns `200 OK`.

### Update your name

`PATCH /students/:id`

Requires the bearer token.

```json
{
  "name": "Victor Fabian"
}
```

Only `name` is accepted. Attempts to update the registration number or email return `400 Bad Request`.

### Delete your account

`DELETE /students/:id`

Requires the bearer token. Returns `204 No Content`.

## Notes

- Email addresses and registration numbers must be unique.
- This assignment stores data in memory, so restarting the server clears all accounts.
- A missing student returns `404`; using another student's ID or token returns `403`.
