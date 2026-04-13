#  Carbon Credit Management System

A full-stack web application I built to manage carbon credit projects, verification, trading, and ledger tracking — using **Spring Boot** for the backend and **React** for the frontend.

---

##  What I Built

I developed a platform where organizations can register carbon offset projects, get them verified by an admin, receive carbon credits (1 credit = 1 ton of CO₂ reduced), list them for sale, and allow buyers to purchase them — with every action tracked in a ledger.

---

##  What I Implemented

- **Role-based access** — I set up three roles: Admin, Project Owner, and Buyer, each with their own protected dashboard
- **Project submission** — Owners can submit carbon offset projects with estimated CO₂ reduction details
- **Admin verification** — I built a verification flow where admins approve or reject projects and credits are automatically issued on approval
- **Credit marketplace** — Owners can list their approved credits for sale at a custom price per credit
- **Transaction engine** — I wrote the purchase logic so that when a buyer buys credits, balances update atomically and the listing closes when fully sold
- **Ledger tracking** — Every credit issuance and purchase gets logged with a balance snapshot
- **Protected routes** — I used React context and protected route components to enforce role-based navigation on the frontend

---

##  Tech Stack I Used

| Layer      | Technology                                        |
|------------|---------------------------------------------------|
| Backend    | Java 17, Spring Boot 4.x, Spring Data JPA, Lombok |
| Database   | MySQL 8                                           |
| Frontend   | React 19, React Router 7, Axios                   |
| Build      | Maven (backend), Create React App (frontend)      |

---

##  Project Structure

```
CarbonCredit-main/
├── backend/                        # Spring Boot application I built
│   ├── src/main/java/com/carbon/
│   │   ├── config/                 # CORS & web configuration
│   │   ├── controller/             # REST controllers I wrote
│   │   │   ├── ProjectController
│   │   │   ├── ListingController
│   │   │   ├── TransactionController
│   │   │   ├── VerificationController
│   │   │   ├── LedgerController
│   │   │   └── UserController
│   │   ├── entity/                 # JPA entities I defined
│   │   │   ├── CarbonProject
│   │   │   ├── CarbonCredit
│   │   │   ├── CreditListing
│   │   │   ├── CreditTransaction
│   │   │   ├── CreditVerification
│   │   │   ├── CreditLedger
│   │   │   └── User
│   │   ├── enums/                  # Status enums
│   │   ├── repository/             # Spring Data repositories
│   │   ├── service/                # Business logic I implemented
│   │   └── exception/              # Global exception handler I added
│   └── src/main/resources/
│       └── application.properties
│
└── carbon-frontend/                # React app I built
    └── src/
        ├── pages/
        │   ├── Login.js
        │   ├── Register.js
        │   ├── AdminDashboard.js
        │   ├── OwnerDashboard.js
        │   └── BuyerDashboard.js
        ├── components/
        │   └── ProtectedRoute.js
        ├── context/
        │   └── AuthContext.js
        └── api.js
```

---

##  How to Run This Project

### Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+ and npm
- MySQL 8+

---

### Backend


1. **Create the MySQL database**
   ```sql
   CREATE DATABASE carbon_db;
   ```

2. **Set up your database credentials** in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/carbon_db
   spring.datasource.username=YOUR_DB_USERNAME
   spring.datasource.password=YOUR_DB_PASSWORD

   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
   ```

   

3. **Run the backend**
   ```bash
   ./mvnw spring-boot:run
   ```
   Runs on `http://localhost:8080`

---

### Frontend

1. **Go to the frontend folder**
   ```bash
   cd ../carbon-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npm start
   ```
   Opens at `http://localhost:3000`

---

##  API Endpoints I Built

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` | Register a new user |
| GET | `/users` | Get all users |
| POST | `/projects/{userId}` | Submit a new carbon project |
| GET | `/projects` | List all projects |
| POST | `/verifications/approve/{projectId}` | Admin approves a project & issues credits |
| POST | `/listings/{creditId}` | List credits for sale |
| GET | `/listings` | Get all active listings |
| POST | `/transactions/{buyerId}/{listingId}` | Buyer purchases credits |
| GET | `/ledger` | View the full credit ledger |

---

##  Roles I Defined

| Role | What They Can Do |
|------|-----------------|
| `ADMIN` | View and approve/reject carbon projects |
| `PROJECT_OWNER` | Submit projects and list approved credits for sale |
| `BUYER` | Browse listings and purchase carbon credits |

---

##  Database Entities I Designed

- **User** — stores registered users with their roles
- **CarbonProject** — a CO₂ reduction initiative submitted by a project owner
- **CreditVerification** — the admin's approval record with verified CO₂ reduction amount
- **CarbonCredit** — credits issued after project approval (1 credit = 1 ton CO₂)
- **CreditListing** — a listing the owner creates to sell credits at a set price
- **CreditTransaction** — a completed purchase made by a buyer
- **CreditLedger** — an append-only log of every credit issuance and purchase

I configured Hibernate to auto-create and update the schema on startup using `ddl-auto=update`.

---
