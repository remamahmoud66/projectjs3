# EduTrack Student Portal

A responsive student portal built with HTML, CSS, Vanilla JavaScript (ES6 modules), json-server and Web Storage.

## Features

- Student registration with validation (required fields, valid email, matching passwords, unique email and Student ID)
- Login with clear error messages
- Session stored with ID, name, email and login time
- Remember Me: localStorage when checked, sessionStorage when unchecked
- Protected dashboard and auto-redirect away from login/register when logged in
- Profile details and profile update
- Enrolled courses, teachers and scores loaded from the API
- Logout
- Bonus: password visibility toggle
- Bonus: auto-logout after 30 minutes of inactivity

## Project Structure

```
edutrack/
├── index.html        Login page
├── register.html     Registration page
├── dashboard.html    Student dashboard
├── db.json           json-server database
├── css/style.css
└── js/
    ├── api.js        All requests to json-server
    ├── session.js    Session helpers (save, read, logout, auto-logout)
    ├── register.js
    ├── login.js
    └── dashboard.js
```

## Setup

1. Install [Node.js](https://nodejs.org).
2. Start the API from the project folder:

   ```bash
   npx json-server db.json
   ```

   The API runs on `http://localhost:3000`.
3. Open the project with VS Code **Live Server** (ES6 modules do not work when opening the HTML file directly).

## json-server Endpoints

| Method | Endpoint | Used for |
|---|---|---|
| GET | /students | Login, duplicate checks |
| POST | /students | Registration |
| PATCH | /students/:id | Profile update |
| GET | /courses | Course names and teachers |
| GET | /enrollments | Student scores |

## Test Account

- Email: `ahmad@edutrack.com`
- Password: `123456`

New students start with no courses. To enroll a student, add an object to `enrollments` in `db.json` with their `studentId`.

## Screenshots

Add screenshots of the Login, Register and Dashboard pages here.
