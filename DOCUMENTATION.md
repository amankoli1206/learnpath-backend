# 1. Introduction
The **Personal Learning Path and Skill Tracker** is a Node.js-based web application designed to help users manage their learning journey, track skills, enroll in educational resources, and monitor study progress in an organized manner.
The project demonstrates important backend development concepts including RESTful APIs, the MVC (Model-View-Controller) architecture, NoSQL databases, JSON Web Token (JWT) authentication, Middleware validation, and asynchronous JavaScript.
The system allows users to create a secure account, update their skill profiles, discover and enroll in courses, log their daily study hours, and even receive simulated AI-driven recommendations based on their skill gaps.

# 2. Problem Statement and Objectives

**Problem Statement**
Managing individual learning goals, keeping track of enrolled courses, and monitoring study hours manually becomes difficult for professionals and students aiming to upskill. The system provides an automated, organized way to build a personalized skill profile, track active course enrollments, calculate total learning progress, and receive actionable insights.

**Objectives**
*   Develop a robust backend system using Node.js and Express.js.
*   Apply the MVC (Model-View-Controller) design pattern for clean architecture.
*   Use MongoDB and Mongoose for flexible NoSQL data management.
*   Implement secure user authentication and authorization using JWT and Bcrypt.
*   Calculate total study hours and progress dynamically.
*   Provide a responsive, glassmorphism-styled Frontend interface using vanilla HTML/CSS/JS to interact with the API.

# 3. System Overview
The system consists of the following major components:

*   **Identity & Security (Auth):** Manages user registration, secure password hashing, and login using JWT.
*   **Skill Profile Management:** Allows users to add global skills and update their personal proficiency levels (e.g., Beginner to Expert).
*   **Resource & Enrollment System:** Manages the creation of educational resources and allows users to enroll and track their completion status.
*   **Learning Logs & Milestones:** Captures daily study hours, notes, and long-term learning goals.
*   **AI Insight Module:** Analyzes the user's current vs. desired skill levels to provide intelligent next-step recommendations.
*   **Graphical User Interface (Frontend):** A Single Page Application (SPA) dashboard that provides a dynamic, user-friendly interface.

# 4. Technologies and Key Concepts Used

**Node.js & Express.js:** 
*   Provides the runtime environment and routing framework to handle HTTP requests (GET, POST, PUT, DELETE).

**MVC Architecture:** 
*   **Models:** Define strict data schemas using Mongoose (e.g., `User.js`, `Enrollment.js`).
*   **Controllers:** House the core business logic and database interactions.
*   **Routes:** Direct incoming API traffic to the correct controllers.

**Database & ODM (MongoDB & Mongoose):** 
*   The project uses MongoDB to store JSON-like documents.
*   Mongoose provides schema validation, `enum` for strict choice enforcement, and `ref` (reference) to build relational bridges between collections using `.populate()`.

**Security & Middleware:** 
*   **JWT (JSON Web Tokens):** Used for stateless authentication.
*   **Bcrypt.js:** Hashes passwords before saving them to the database.
*   **Custom Middleware:** The `authMiddleware.js` acts as a security guard, verifying tokens before allowing access to protected routes.

# 5. System Features
The major features of the system are:
*   Secure User Registration and Login
*   Global Skill creation and Personal Skill tracking
*   Resource discovery and Enrollment tracking
*   Daily Learning Logs (time tracking)
*   Milestone setting and management
*   Automated Progress calculation
*   Simulated AI Skill Gap Analysis
*   Progress Sharing functionality
*   Real-time capable infrastructure (Socket.io & Firebase Admin SDK)

# 6. System Workflow
The system follows the workflow below:

1. The user registers/logs in and receives a secure JWT token.
2. The user updates their "Skill Profile", selecting skills and setting desired proficiency levels.
3. The user discovers "Resources" (courses) and creates an "Enrollment".
4. After studying, the user submits a "Learning Log" tied to their enrollment.
5. The system dynamically calculates their total progress and displays it on the interactive dashboard.
6. The user can request an "AI Analysis" to see what they should learn next.

# 7. Main Modules

*   **Auth Module:** Manages account creation, password encryption, and token generation.
*   **Profile/Skill Module:** Manages the master list of skills and individual user proficiency tracking.
*   **Enrollment Module:** Handles the linkage between a User and a Resource.
*   **Progress Module:** Aggregates data from Learning Logs to calculate total hours spent studying.
*   **Config Module:** Handles external infrastructure connections (`db.js` for MongoDB, `firebase.js` for future push notifications).
*   **Frontend Module:** Provides the graphical interface to interact with the backend modules.

# 8. GUI and Event Handling
The frontend application uses modern web technologies (Vanilla HTML, CSS, JavaScript) to create a Single Page Application (SPA). 

Event handling allows the system to respond to user actions. For example, clicking "Enroll Now" triggers an asynchronous JavaScript `fetch` call to the backend API (`/api/enrollments`), passing the secure JWT token in the headers, and dynamically updating the UI upon a successful response.

### Application Screenshots

> *(Replace the placeholders below with actual screenshots of your running application)*

**Figure 1: Main Dashboard / Portfolio Interface**
![Main Dashboard Interface](./placeholder-dashboard.jpg)

**Figure 2: Learning Logs & Enrollment Tracking**
![Learning Logs Interface](./placeholder-logs.jpg)

**Figure 3: API Testing (Thunder Client/Postman Output)**
![API Output](./placeholder-api.jpg)

# 9. Advantages
*   **Clean Architecture:** Strict adherence to MVC makes the code easy to read and scale.
*   **Highly Secure:** Implements industry-standard JWT and password hashing.
*   **Relational NoSQL:** Uses Mongoose references efficiently to link related data.
*   **Modular Design:** Easy to extend with additional features.
*   **Modern Aesthetics:** The frontend utilizes premium pastel glassmorphism UI design.

# 10. Future Scope
The system can be further improved by adding:
*   Real-time chat with Mentors (utilizing the pre-configured Socket.io server).
*   Live Push Notifications (utilizing the pre-configured Firebase Admin SDK).
*   Integration with a real LLM (like OpenAI) for the Skill Gap Analysis.
*   Database hosting via MongoDB Atlas for cloud deployment.
*   Admin dashboard for platform-wide analytics.
*   Gamification (badges and streaks based on Learning Logs).

# 11. Conclusion
The Personal Learning Path and Skill Tracker API demonstrates the practical use of modern backend development concepts in building a functional, scalable application.

The project successfully combines Node.js, Express, MongoDB, JWT Authentication, and MVC architecture to provide a comprehensive system for managing enrollments, tracking study hours, and evaluating skill gaps.

Ultimately, the project provides practical experience in designing RESTful APIs, securing data, and seamlessly connecting a complex backend to a responsive frontend interface.
