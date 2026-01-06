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
