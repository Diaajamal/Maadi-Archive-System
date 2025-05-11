# Maadi Archive System

A comprehensive archive management system for Maadi, built with Spring Boot and React.

## 🚀 Features

- **Archive Management**
  - Create, read, update, and delete archive records
  - Track internal and external departments
  - File attachments support
  - Advanced search and filtering

- **Department Management**
  - Internal and external department tracking
  - Department-specific archive organization
  - Department status indicators

- **User Interface**
  - Modern, responsive design using Material-UI
  - Arabic language support
  - Intuitive navigation
  - Real-time updates

## 🛠️ Tech Stack

### Backend
- Spring Boot 3.2.3
- Spring Data JPA
- MySQL Database
- Maven for dependency management
- Java 17

### Frontend
- React 18
- Vite
- Material-UI (MUI)
- React Router
- Axios for API calls

## 📋 Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure the database in `src/main/resources/application.yaml`:
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/maadi_archive
       username: your_username
       password: your_password
   ```

3. Build the project:
   ```bash
   ./mvnw clean package
   ```

4. Run the application:
   ```bash
   java -jar target/archive-0.0.1-SNAPSHOT.jar
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:
   ```
   VITE_API_URL=http://localhost:8083/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

The application exposes the following main endpoints:

### Archive Endpoints (`/api/v1/archive`)
- `POST /api/v1/archive/add` - Create a new archive with file attachments
- `GET /api/v1/archive/all` - List all archives with pagination and filtering
- `GET /api/v1/archive/download` - Download an archive file

### Department Endpoints (`/api/v1/department`)
- `POST /api/v1/department/add` - Add a new department
- `DELETE /api/v1/department/delete` - Delete a department
- `GET /api/v1/department/getDepartment` - Get department by name
- `GET /api/v1/department/departments` - Get all departments
- `GET /api/v1/department/all` - Get all department names

## 📁 Project Structure

```
maadi-archive-system/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/maadinzm/archive/
│   │   │   │       ├── archive/
│   │   │   │       ├── config/
│   │   │   │       ├── department/
│   │   │   │       ├── dtos/
│   │   │   │       └── ArchiveApplication.java
│   │   │   └── resources/
│   │   │       ├── static/
│   │   │       └── application.yaml
│   │   └── test/
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   ├── utils/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
```

## 🔧 Configuration

### Backend Configuration
- Server port: 8083
- Database configuration in `application.yaml`
- File storage configuration in `StorageConfig.java`

### Frontend Configuration
- API URL configuration in `.env`
- Build configuration in `vite.config.js`
- Material-UI theme configuration

## 🚀 Deployment

### Production Build

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Build the backend:
   ```bash
   cd backend
   ./mvnw clean package -Pprod
   ```

3. Run the production build:
   ```bash
   java -jar target/archive-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
   ```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Diaa Jamal - diaa.jamall01@gmail.com

Project Link: [https://github.com/Diaajamal/maadi-archive-system](https://github.com/Diaajamal/maadi-archive-system)
