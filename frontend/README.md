# Smart Internship Management System

A full-stack web application for managing students, internships, and daily internship progress reports.

## Technologies Used

### Backend
- Java 17
- Spring Boot 4
- Spring Data JPA
- Hibernate
- SQLite
- Maven

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS
- Fetch API

## Features

### Student Management
- Add student
- View students
- Search students by name
- Update student
- Delete student

### Internship Management
- Create internship
- View internships
- Assign internship to a student
- Track program, dates, status, and mentor

### Daily Progress Reports
- Submit daily progress report
- View daily reports
- Filter reports by status
- Track task completed
- Track hours worked
- Add remarks

### Duplicate Report Protection

A student cannot submit more than one daily report for the same date.

The backend checks for an existing report before saving a new report.

Duplicate submissions return:

`409 Conflict`

## Database

SQLite is used as the database.

Main tables:

- students
- internships
- daily_reports

Relationships:

- One student can have multiple internships.
- One student can have multiple daily reports.
- Internships and daily reports are connected to students using foreign keys.

## REST API

### Student APIs

```text
POST   /api/students
GET    /api/students
GET    /api/students/{id}
PUT    /api/students/{id}
DELETE /api/students/{id}
GET    /api/students/search?name={name}