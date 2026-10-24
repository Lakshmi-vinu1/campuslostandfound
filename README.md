# Campus Lost & Found Management System (MERN)

A student project starter aligned with the uploaded MERN guidelines: separated client/server, REST API, MongoDB/Mongoose models, validation, environment variables, authentication, error handling, Git hygiene, and a testing checklist.

## Features in this starter
- Student registration and login (bcrypt password hashing + JWT)
- Create lost/found reports, list reports, search/filter by status/type, update or delete your own reports
- Admin role can review all reports and update report status
- Responsive React UI with loading, empty and error states
- API URL configured using `VITE_API_URL`

## Requirements
- Node.js LTS and npm
- MongoDB local instance or MongoDB Atlas database

## Run locally
### 1. Backend
```bash
cd server
npm install
```
Copy `.env.example` to `.env`, then set `MONGODB_URI` and a long random `JWT_SECRET`.
```bash
npm run dev
```
API runs on `http://localhost:5000` by default.

### 2. Frontend (open a second terminal)
```bash
cd client
npm install
```
Copy `.env.example` to `.env` (default API URL is `http://localhost:5000/api`).
```bash
npm run dev
```
Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Admin setup
The first registered user is not automatically an admin. To promote a trusted account, update that user's `role` to `admin` in MongoDB using MongoDB Compass. Do not expose admin promotion in the public UI.

## Main API contract
- `POST /api/auth/register` — `{ name, email, password }`
- `POST /api/auth/login` — `{ email, password }`
- `GET /api/items` — public list; optional `type=lost|found`, `status=open|matched|returned`, `search=...`
- `POST /api/items` — authenticated report creation
- `GET /api/items/mine` — authenticated user's reports
- `PATCH /api/items/:id` — owner or admin; validates fields
- `DELETE /api/items/:id` — owner or admin
- `PATCH /api/items/:id/status` — admin only; `{ status }`
- `GET /api/health` — health check

## Before submission
- Test success, empty, invalid input, unauthenticated, forbidden, not-found, and server-error cases.
- Do not commit `.env`, passwords, real student contact details, or personal data.
- Set `CLIENT_ORIGIN` and `VITE_API_URL` to deployed URLs before production deployment.
- Deploy the React frontend, Express API, and MongoDB separately as appropriate; configure HTTPS and CORS.
- Add screenshots and live URLs to this README after deployment.

## Suggested milestone commits
1. `Set up MERN project structure`
2. `Add MongoDB item model and REST API`
3. `Implement registration and login`
4. `Build responsive report dashboard`
5. `Connect frontend to backend API`
6. `Test validation and authorization`
7. `Document deployment and screenshots`
