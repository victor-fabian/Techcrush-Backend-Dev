# Victor Fabian User Authentication API

A Node.js, Express, and MongoDB CRUD API built during TechCrush Cohort 8.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and update `MONGODB_URI` if necessary.

3. Start MongoDB, then run:

   ```bash
   npm start
   ```

The API runs at `http://localhost:5555` by default.

## Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/users/new-user` | Create a user |
| GET | `/users/all-users` | Get all users |
| GET | `/users/get-one-user/:id` | Get one user |
| PATCH | `/users/update-user/:userId` | Update a user |
| DELETE | `/users/delete-user/:userId` | Delete a user |

Example request body:

```json
{
  "name": "Victor Fabian",
  "email": "victor@example.com",
  "password": "choose-a-secure-password"
}
```

For a production authentication system, passwords should be hashed and protected routes should use session or token authentication.
