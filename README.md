# Smart Internship Management System

A web-based Internship Management System developed using Spring Boot, React.js, and SQLite. The system allows students and internship information to be managed and provides daily internship report tracking.

## Technologies Used

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST APIs
- SQLite
- Maven

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Vite

## Features

### Student Management
- Add student
- View students
- Update student
- Delete student
- Search students

### Internship Management
- Create internship
- View internship details
- Track internship status
- Assign mentor
- Store internship start and end dates

### Daily Reports
- Submit daily internship reports
- View daily reports
- Filter reports
- Record task completed and hours worked
- Track report status and remarks
- Prevent duplicate reports for the same student and date

## Project Structure

```text
internship-management/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── internship-management/
│   ├── src/main/java/
│   │   └── com/acadeno/internshipmanagement/
│   │       ├── controller/
│   │       ├── entity/
│   │       ├── exception/
│   │       ├── repository/
│   │       └── service/
│   │
│   ├── src/main/resources/
│   ├── pom.xml
│   └── queries.sql
│
├── .gitignore
└── README.md