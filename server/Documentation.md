````md
# Internal-Portal-Project – Backend (Node.js + Express + MongoDB)

Backend API for **Internal-Portal-Project**: an internal portal for users (students/job seekers), admins, and super admins to manage profiles, documents, visa applications, job applications, and support tickets.

---

## 🔧 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT (Bearer tokens)
- **File Uploads**: Multer (local `uploads/` folder)
- **Logging**: morgan
- **Env**: dotenv

---

## 📂 Project Structure (backend)

```text
backend/
  .env
  package.json
  src/
    server.js
    app.js
    config/
      db.js
      env.js
      multer.js
    models/
      User.js
      Profile.js
      Education.js
      Document.js
      VisaApplication.js
      JobPosting.js
      JobApplication.js
      SupportTicket.js
      SupportMessage.js
    middleware/
      auth.js
      roles.js
      errorHandler.js
    routes/
      auth.routes.js
      profile.routes.js
      documents.routes.js
      visa.routes.js
      jobs.routes.js
      jobApplications.routes.js
      support.routes.js
      admin.routes.js
      superAdmin.routes.js
    controllers/
      auth.controller.js
      profile.controller.js
      documents.controller.js
      visa.controller.js
      jobs.controller.js
      jobApplications.controller.js
      support.controller.js
      admin.controller.js
      superAdmin.controller.js
    utils/
      jwt.js
      password.js
      constants.js
  uploads/   # (gitignored) – uploaded files
```
````

---

## ⚙️ Setup & Installation

### 1. Clone & install

```bash
cd backend
npm install
```

### 2. Environment variables

Create `.env` in `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/internal_portal_project
JWT_SECRET=super-secret-key-change-me
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 3. Run the server

```bash
npm run dev   # uses nodemon
# or
npm start
```

Server defaults to: `http://localhost:5000`

Health check:
`GET /api/health` → `{ "status": "ok", "service": "Internal-Portal-Project API" }`

---

## 👥 Roles & Auth

### User Roles

Defined in `utils/constants.js`:

- `STUDENT` (default)
- `ADMIN`
- `SUPER_ADMIN`

### Auth Flow

- Register → `POST /api/auth/register`
- Login → `POST /api/auth/login` → returns `{ user, token }`
- Use token in protected routes:

```http
Authorization: Bearer <token>
```

JWT payload contains: `{ id: <userId>, role: <role> }`.

---

## 🗄️ Data Models (Overview)

### User

`models/User.js`

- `email` (unique)
- `passwordHash`
- `role` (`STUDENT` | `ADMIN` | `SUPER_ADMIN`)
- `status` (`ACTIVE` | `BLOCKED`)
- timestamps

---

### Profile

`models/Profile.js`

- `userId` → User
- `fullName`
- `fatherName`
- `dateOfBirth`
- `nationality`
- `contactNumber`
- `address`
- timestamps

---

### Education

`models/Education.js`

- `userId` → User
- `highestQualification`
- `institutionName`
- `yearOfPassing`
- `major`
- `gradesCgpa`
- timestamps

---

### Document

`models/Document.js`

- `userId` → User
- `type` (`EDUCATION`, `PASSPORT`, `CV`, `VISA_SUPPORTING`, `JOB_SUPPORTING`, `COVER_LETTER`)
- `filePath` (local path: e.g. `uploads/xyz.pdf`)
- `originalName`
- `mimeType`
- `status` (`PENDING`, `VERIFIED`, `REJECTED`)
- `verifiedBy` → User (Admin)
- `verifiedAt`
- timestamps

Files served at: `GET /uploads/<filename>`

---

### VisaApplication

`models/VisaApplication.js`

- `userId` → User
- `passportDetails`:

  - `number`
  - `country`
  - `issueDate`
  - `expiryDate`

- `purposeOfVisit`
- `travelHistory` (string)
- `supportingDocumentIds` → [Document]
- `applicationFee`
- `status` (`SUBMITTED`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`, `CANCELLED`)
- `statusHistory[]`:

  - `status`
  - `changedBy` → User
  - `comment`
  - `changedAt`

- timestamps

---

### JobPosting

`models/JobPosting.js`

- `title`
- `industry`
- `position`
- `description`
- `requirements`
- `location`
- `isActive`
- `createdBy` → User (Admin)
- timestamps

---

### JobApplication

`models/JobApplication.js`

- `userId` → User
- `jobId` → JobPosting
- `workExperience`
- `coverLetterDocumentId` → Document
- `otherDocumentIds` → [Document]
- `status` (`SUBMITTED`, `UNDER_REVIEW`, `SHORTLISTED`, `REJECTED`, `HIRED`)
- `statusHistory[]` (same pattern as visa)
- timestamps

---

### SupportTicket

`models/SupportTicket.js`

- `userId` → User
- `subject`
- `description`
- `status` (`OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`)
- `assignedTo` → User (Admin)
- timestamps

### SupportMessage

`models/SupportMessage.js`

- `ticketId` → SupportTicket
- `senderId` → User
- `message`
- timestamps

---

## 🌐 API Endpoints

### 0. Health

| Method | Endpoint      | Auth | Description      |
| ------ | ------------- | ---- | ---------------- |
| GET    | `/api/health` | ❌   | API status check |

---

### 1. Auth

Base: `/api/auth`

| Method | Endpoint    | Auth | Description                 |
| ------ | ----------- | ---- | --------------------------- |
| POST   | `/register` | ❌   | Register new `STUDENT` user |
| POST   | `/login`    | ❌   | Login, returns JWT token    |

**Register – Request**

```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "Password123"
}
```

**Login – Response**

```json
{
  "user": {
    "id": "…",
    "email": "user@example.com",
    "role": "STUDENT"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Profile & Education

Base: `/api/profile` (all require auth)

| Method | Endpoint        | Auth | Description                    |
| ------ | --------------- | ---- | ------------------------------ |
| GET    | `/me`           | ✅   | Get own profile + education    |
| PUT    | `/me`           | ✅   | Create/update own profile      |
| PUT    | `/me/education` | ✅   | Create/update education record |

**Example: Update profile**

```json
PUT /api/profile/me
Authorization: Bearer <token>

{
  "fullName": "Test User",
  "fatherName": "Father Name",
  "dateOfBirth": "1995-01-01",
  "nationality": "Pakistani",
  "contactNumber": "0300-1234567",
  "address": "Karachi"
}
```

**Education**

- Without `educationId` → creates new record
- With `educationId` → updates existing record

```json
PUT /api/profile/me/education
{
  "highestQualification": "Bachelors",
  "institutionName": "ABC University",
  "yearOfPassing": 2020,
  "major": "Computer Science",
  "gradesCgpa": "3.5/4.0"
}
```

---

### 3. Documents

Base: `/api/documents`

| Method | Endpoint      | Auth       | Description                          |
| ------ | ------------- | ---------- | ------------------------------------ |
| POST   | `/`           | ✅ (user)  | Upload document (file + type)        |
| GET    | `/my`         | ✅ (user)  | List own documents                   |
| PUT    | `/:id/status` | ✅ (admin) | Update document status (`PENDING`/…) |

Upload uses **form-data**:

- `type` (text) – e.g. `EDUCATION`, `PASSPORT`, `CV`, `VISA_SUPPORTING`, `JOB_SUPPORTING`, `COVER_LETTER`
- `file` (file) – actual document

```http
POST /api/documents
Authorization: Bearer <token>
Content-Type: multipart/form-data

type = EDUCATION
file = <attach file>
```

Files served from:
`GET /uploads/<filename>`

---

### 4. Visa Applications

Base: `/api/visa-applications`

#### User

| Method | Endpoint | Auth | Description              |
| ------ | -------- | ---- | ------------------------ |
| POST   | `/`      | ✅   | Create visa application  |
| GET    | `/my`    | ✅   | List own applications    |
| GET    | `/:id`   | ✅   | Get own (or admin) by id |

**Create visa application**

```json
POST /api/visa-applications
Authorization: Bearer <token>

{
  "passportNumber": "AB1234567",
  "passportCountry": "Pakistan",
  "passportIssueDate": "2020-01-01",
  "passportExpiryDate": "2030-01-01",
  "purposeOfVisit": "Study in Canada",
  "travelHistory": "Visited UAE in 2023",
  "supportingDocumentIds": [],
  "applicationFee": 150
}
```

#### Admin / Super Admin

| Method | Endpoint      | Auth              | Description                       |
| ------ | ------------- | ----------------- | --------------------------------- |
| GET    | `/`           | ✅ (`ADMIN`/`SA`) | List all (optional `status`)      |
| PUT    | `/:id/status` | ✅ (`ADMIN`/`SA`) | Update status (`UNDER_REVIEW`, …) |

---

### 5. Jobs

Base: `/api/jobs`

#### Public / User

| Method | Endpoint | Auth | Description                   |
| ------ | -------- | ---- | ----------------------------- |
| GET    | `/`      | ❌   | List active jobs (filterable) |
| GET    | `/:id`   | ❌   | Job details                   |

Query filters: `industry`, `position`.

#### Admin / Super Admin

| Method | Endpoint | Auth              | Description        |
| ------ | -------- | ----------------- | ------------------ |
| POST   | `/`      | ✅ (`ADMIN`/`SA`) | Create job posting |

```json
POST /api/jobs
Authorization: Bearer <admin-token>

{
  "title": "Software Engineer",
  "industry": "IT",
  "position": "Junior Developer",
  "description": "Job details...",
  "requirements": "Requirements...",
  "location": "Remote"
}
```

---

### 6. Job Applications

Base: `/api/job-applications`

#### User

| Method | Endpoint | Auth | Description               |
| ------ | -------- | ---- | ------------------------- |
| POST   | `/`      | ✅   | Apply to a job            |
| GET    | `/my`    | ✅   | List own job applications |

**Apply to job**

```json
POST /api/job-applications
Authorization: Bearer <token>

{
  "jobId": "<JobPosting _id>",
  "workExperience": "2 years Node.js",
  "coverLetterDocumentId": "<Document _id>",
  "otherDocumentIds": []
}
```

#### Admin / Super Admin

| Method | Endpoint      | Auth              | Description                                |
| ------ | ------------- | ----------------- | ------------------------------------------ |
| GET    | `/`           | ✅ (`ADMIN`/`SA`) | List applications (optional `status`)      |
| PUT    | `/:id/status` | ✅ (`ADMIN`/`SA`) | Update status (`UNDER_REVIEW`, `HIRED`, …) |

---

### 7. Support Tickets

Base: `/api/support`

#### User

| Method | Endpoint                | Auth | Description                      |
| ------ | ----------------------- | ---- | -------------------------------- |
| POST   | `/tickets`              | ✅   | Create ticket                    |
| GET    | `/tickets/my`           | ✅   | List own tickets                 |
| GET    | `/tickets/:id/messages` | ✅   | Get ticket + messages (if owner) |
| POST   | `/tickets/:id/messages` | ✅   | Add message to ticket            |

**Create ticket**

```json
POST /api/support/tickets
Authorization: Bearer <token>

{
  "subject": "Visa status",
  "description": "I want to know about my visa application status."
}
```

#### Admin / Super Admin

| Method | Endpoint              | Auth              | Description                                |
| ------ | --------------------- | ----------------- | ------------------------------------------ |
| GET    | `/tickets`            | ✅ (`ADMIN`/`SA`) | List all tickets (optional `status` query) |
| PUT    | `/tickets/:id/status` | ✅ (`ADMIN`/`SA`) | Update ticket status / assign handler      |

---

### 8. Admin

Base: `/api/admin`
All require `ADMIN` or `SUPER_ADMIN`.

| Method | Endpoint            | Description                                 |
| ------ | ------------------- | ------------------------------------------- |
| GET    | `/users`            | List users (filters: `role`, `status`, `q`) |
| GET    | `/users/:id`        | Get single user (no passwordHash)           |
| PUT    | `/users/:id/status` | Update user status (`ACTIVE`/`BLOCKED`)     |
| GET    | `/stats`            | Basic system stats                          |

`/stats` returns:

```json
{
  "totalUsers": 10,
  "totalDocuments": 25,
  "pendingDocuments": 5,
  "totalVisaApplications": 3,
  "totalJobApplications": 7
}
```

---

### 9. Super Admin

Base: `/api/super-admin`
All require `SUPER_ADMIN`.

| Method | Endpoint          | Description                               |
| ------ | ----------------- | ----------------------------------------- |
| POST   | `/admins`         | Create new admin user                     |
| PUT    | `/users/:id/role` | Change user role (`STUDENT`/`ADMIN`/`SA`) |

**Create admin**

```json
POST /api/super-admin/admins
Authorization: Bearer <super-admin-token>

{
  "email": "admin@example.com",
  "password": "AdminPass123"
}
```

---

## 🔒 Middleware Summary

- `auth`

  - Reads `Authorization: Bearer <token>`
  - Verifies token → sets `req.user = { id, role, email }`
  - Returns `401` if invalid/missing

- `requireRole(...roles)`

  - Checks `req.user.role` ∈ allowed roles
  - Returns `403` if insufficient role

- `errorHandler`

  - Catches thrown errors and sends JSON with `message` and `statusCode` (default 500)

---

## ✅ Testing Checklist (Manual)

When you’re ready to test everything:

1. **Auth**

   - Register student
   - Login → get token

2. **Profile**

   - `PUT /api/profile/me`
   - `PUT /api/profile/me/education`
   - `GET /api/profile/me`

3. **Documents**

   - Upload document with form-data
   - List `/api/documents/my`

4. **Visa**

   - Create `/api/visa-applications`
   - List `/api/visa-applications/my`

5. **Jobs**

   - (Super admin) create admin
   - (Admin) create job
   - List jobs + apply

6. **Job Applications**

   - User: `/api/job-applications/my`
   - Admin: list + change status

7. **Support**

   - Create ticket + messages (user)
   - Admin: list tickets, reply, change status

8. **Admin / Super Admin**

   - `/api/admin/users`, `/api/admin/stats`
   - `/api/super-admin/users/:id/role`, `/api/super-admin/admins`

---

That’s the complete backend documentation for **Internal-Portal-Project**.
You can drop this directly into `backend/README.md`.

```

```
