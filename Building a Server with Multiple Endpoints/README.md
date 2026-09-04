# Building a Server with Multiple Endpoints

A basic HTTP server created with Node.js.

## Run the server

```bash
npm start
```

The server runs at `http://localhost:3001` by default.

## Endpoints

| Method | Route | Response |
| --- | --- | --- |
| GET | `/home` | `Welcome to the home page` |
| GET | `/contact-us` | `Contact us` |
| GET | `/about` | `about us` |

Any unknown route returns `404 Page not found`.

## Run the tests

```bash
npm test
```
