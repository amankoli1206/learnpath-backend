<h1 align="center">Personal Learning Path & Skill Tracker</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="ExpressJS" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
</p>

<br />

## About The Project

The **Personal Learning Path & Skill Tracker** is a robust backend API designed to help lifelong learners track their skill development in a structured way. Users can build profiles detailing their current and desired proficiency levels, enroll in educational resources, log their learning hours, and set milestones to achieve their goals.

This system provides the architectural foundation for a comprehensive educational platform, featuring modular routing, secure authentication, and a scalable database design.

## Key Features

<ul>
  <li><b>User Authentication:</b> Secure registration and login utilizing JSON Web Tokens (JWT).</li>
  <li><b>Skill Profiles:</b> Users can define their current skill levels and set targets for advancement.</li>
  <li><b>Resource Management:</b> Browse, add, and enroll in various learning materials such as courses and tutorials.</li>
  <li><b>Progress Tracking:</b> Log hours spent studying and monitor overall progress.</li>
  <li><b>Goal Setting:</b> Establish milestones with target dates to maintain motivation and structure.</li>
  <li><b>Mentorship Sharing:</b> Capabilities to share learning progress with peers and mentors.</li>
</ul>

## Tech Stack

<ul>
  <li><b>Runtime:</b> <code>Node.js</code></li>
  <li><b>Framework:</b> <code>Express.js</code></li>
  <li><b>Database:</b> <code>MongoDB</code> with <code>Mongoose</code> ODM</li>
  <li><b>Security:</b> <code>bcryptjs</code> for password hashing, <code>jsonwebtoken</code> for secure API access</li>
</ul>

## Setup & Installation

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a <code>.env</code> file in the root directory. You will need a MongoDB connection string and a secret key for JWT.

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/learnpath?retryWrites=true&w=majority
PORT=5001
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Server
For development mode (auto-restarts on save):
```bash
npm run dev
```
