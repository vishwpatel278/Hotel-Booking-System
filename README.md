# 🏨 Hotel Booking System

A full-stack hotel booking application built with **Spring Boot**, **React**, **MySQL**, and **JWT-based authentication**. The application allows users to browse rooms, check room availability, make and manage bookings, while administrators can manage rooms and view bookings.

## 🚀 Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Axios
- Bootstrap / React-Bootstrap
- React Icons
- React Date Range
- JWT Decode

### Backend
- Java 21
- Spring Boot 4
- Spring Web
- Spring Data JPA / Hibernate
- Spring Security
- JWT
- Spring Boot Validation
- Spring Boot Mail
- Lombok
- Maven

### Database
- MySQL

---

## ✨ Features

### 👤 User Features
- User registration
- Email verification
- User login with JWT authentication
- OTP-based login
- Password reset
- User profile
- Browse available rooms
- Filter rooms by room type and dates
- View room details
- Book a room
- Generate booking confirmation code
- View personal bookings
- Cancel bookings

### 🛠️ Admin Features
- Admin authentication and role-based authorization
- Add new rooms
- Upload room images
- View all rooms
- Update room details
- Delete rooms
- View all bookings

### 🔐 Security
- JWT-based authentication
- Role-based authorization
- Protected admin endpoints
- Password encryption
- Email verification / OTP functionality
- CORS configuration

---

## 📁 Project Structure

```text
Hotel-Booking-System/
│
├── lackside-hotels front/          # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── booking/
│   │   ├── common/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── room/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── Lakesidehotel backend/          # Spring Boot backend
    ├── src/
    │   ├── main/
    │   │   ├── java/com/hotel/Lakesidehotel/
    │   │   │   ├── controller/
    │   │   │   ├── dto/
    │   │   │   ├── models/
    │   │   │   ├── repository/
    │   │   │   ├── request/
    │   │   │   ├── response/
    │   │   │   ├── responses/
    │   │   │   ├── security/
    │   │   │   └── service/
    │   │   └── resources/
    │   │       └── application.yml
    │   └── test/
    ├── pom.xml
    └── mvnw
```

---

## ⚙️ Prerequisites

Make sure you have installed:

- **Java 21**
- **Node.js 18+**
- **npm**
- **MySQL 8+**
- **Git**
- **Maven** (optional because the project includes Maven Wrapper)

---

## 📥 Clone the Repository

```bash
git clone https://github.com/vishwpatel278/Hotel-Booking-System.git
cd Hotel-Booking-System
```

---

# 🗄️ Backend Setup

### 1. Create the MySQL database

Open MySQL and run:

```sql
CREATE DATABASE lakeSide_hotel_db;
```

### 2. Configure the backend

Go to:

```text
Lakesidehotel backend/src/main/resources/application.yml
```

Update your local database and mail configuration.

Example:

```yaml
spring:
  datasource:
    username: root
    password: YOUR_MYSQL_PASSWORD
    url: jdbc:mysql://localhost:3306/lakeSide_hotel_db

  mail:
    host: smtp.gmail.com
    port: 587
    username: YOUR_EMAIL
    password: YOUR_GMAIL_APP_PASSWORD
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true

auth:
  token:
    expirationTime: 3600000
    secret: YOUR_SECURE_JWT_SECRET
```

> **Important:** Never commit database passwords, Gmail passwords/app passwords, JWT secrets, or other credentials to GitHub. Use environment variables or a local configuration file for sensitive values.

### 3. Start the Spring Boot server

From the backend directory:

```bash
cd "Lakesidehotel backend"
```

On macOS/Linux:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

The backend runs by default at:

```text
http://localhost:8080
```

---

# 💻 Frontend Setup

Open another terminal.

```bash
cd "lackside-hotels front"
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs by default at:

```text
http://localhost:5173
```

The frontend API configuration currently uses:

```text
http://localhost:8080
```

If your backend runs on another host or port, update:

```text
src/utils/apiFunction.js
```

---

## 🔗 Main API Areas

### Authentication

```text
POST /auth/register-user
POST /auth/login
POST /auth/verify
POST /auth/resend
POST /auth/sendOtp-to-login
POST /auth/reset-password
```

### Rooms

```text
GET    /rooms/all-rooms
GET    /rooms/room/types
GET    /rooms/available-rooms
GET    /rooms/room/{roomId}

POST   /rooms/add/new-room
PUT    /rooms/update-room/{roomId}
DELETE /rooms/delete/{roomId}
```

### Bookings

```text
GET    /bookings/getallBookings
GET    /bookings/confirmation/{confirmationCode}
GET    /bookings/user/{email}/bookings

POST   /bookings/room/{roomId}/booking
DELETE /bookings/booking/{bookingId}/delete
```

---

## 🔄 Application Flow

```text
User
 │
 ├── Register
 │      ↓
 │   Email Verification
 │      ↓
 ├── Login ──→ JWT Token
 │      ↓
 ├── Search Rooms
 │      ↓
 ├── Check Availability
 │      ↓
 ├── Select Room
 │      ↓
 ├── Make Booking
 │      ↓
 └── Booking Confirmation
```

Admin:

```text
Admin Login
     ↓
JWT Authentication
     ↓
Admin Dashboard
     ├── Add Room
     ├── Update Room
     ├── Delete Room
     └── View Bookings
```

---

## 🔒 Authentication

The application uses **JWT (JSON Web Token)** authentication.

After successful login, the frontend stores the token and uses it for authenticated requests.

Admin-only operations are protected using Spring Security role-based authorization.

---

## 🧪 Build for Production

### Frontend

```bash
cd "lackside-hotels front"
npm run build
```

### Backend

```bash
cd "Lakesidehotel backend"
./mvnw clean package
```

The generated Spring Boot JAR will be available inside:

```text
target/
```

---

## 🛠️ Troubleshooting

### MySQL connection error

Check that:

1. MySQL is running.
2. The database `lakeSide_hotel_db` exists.
3. Username and password in `application.yml` are correct.
4. MySQL is running on port `3306`.

### Frontend cannot connect to backend

Make sure the Spring Boot server is running:

```text
http://localhost:8080
```

Also verify the API base URL in:

```text
src/utils/apiFunction.js
```

### Email / OTP is not working

For Gmail SMTP, use a **Gmail App Password** rather than your normal Gmail password, and make sure SMTP settings are configured correctly.

---

## 📌 Future Improvements

- Online payment integration
- Cloud image storage
- Hotel reviews and ratings
- Advanced room search and filtering
- Booking email notifications
- Responsive UI improvements
- Docker deployment
- Cloud deployment
- Admin analytics dashboard

---

## 👨‍💻 Author

**Vishw Patel**

GitHub: [@vishwpatel278](https://github.com/vishwpatel278)

Repository: [Hotel-Booking-System](https://github.com/vishwpatel278/Hotel-Booking-System)

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
