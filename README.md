# Web_Rest_ApI

#  Task Management System (Angular + .NET Core)

A full-stack Task Management System that allows users to create, view, edit, filter, and delete tasks. Built using Angular for the frontend and ASP.NET Core Web API for the backend.

---

##  Technologies Used

- **Frontend**: Angular 15+, Angular Material
- **Backend**: ASP.NET Core Web API (.NET 7)
- **Database**: SQL Server with Entity Framework Core
- **API Docs**: Swagger/OpenAPI

---

## Project Structure

```
root/
│
├── backend/               # ASP.NET Core Web API project
│   ├── Controllers/
│   ├── Models/
│   └── Db/
│
├── frontend/              # Angular application
│   ├── src/app/
│   ├── services/
│   └── features/tasks/
```

---

## Setup Instructions

### Backend (.NET Core API)

```bash
cd backend/
dotnet restore
dotnet ef database update
dotnet run
```

- App runs at: `http://localhost:5296`
- Swagger: `http://localhost:5296/swagger`

Make sure to update `appsettings.json` with your DB connection string.

---

### Frontend (Angular)

```bash
cd frontend/
npm install
ng serve
```

- Angular app runs at: `http://localhost:4200`

> Update `src/environments/environment.ts` to match your backend URL.

---

##  Features

-  Create, update, delete, and view tasks
-  Pagination and sorting
-  Filtering by title, priority, and status
-  Edit mode with reactive forms
-  Date validation (no past due dates)
-  Loading spinners & error handling
-  Material UI with responsive design
-  Swagger UI for live API testing

---

##  API Endpoints

| Endpoint            | Method | Description           |
|---------------------|--------|-----------------------|
| `/api/Tasks`        | GET    | List all tasks        |
| `/api/Tasks/{id}`   | GET    | Get task by ID        |
| `/api/Tasks`        | POST   | Create a task         |
| `/api/Tasks/{id}`   | PUT    | Update a task         |
| `/api/Tasks/{id}`   | DELETE | Delete a task         |

Query params like `sortBy`, `desc`, `title`, `status` are supported.

---

##  Database Schema

| Field     | Type      | Notes                                |
|-----------|-----------|--------------------------------------|
| Id        | int       | Primary Key                          |
| Title     | string    | Required                             |
| DueDate   | DateTime  | Required, must be in the future      |
| Priority  | string    | Required: Low, Medium, High          |
| Status    | string    | Required: Pending, InProgress, Completed |

---

##  Migration Guide

To generate or update the database schema:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

To reset and reapply:

```bash
dotnet ef database drop
dotnet ef database update
```

---

##  Swagger API Testing

Visit:
```
http://localhost:5296/swagger
```

Use it to test all GET, POST, PUT, DELETE endpoints interactively.

---

##  Deployment (Optional)

You can containerize the app using Docker:


---

##  Author

Developed by **Naga Chandra Mouli.Thammineni**

