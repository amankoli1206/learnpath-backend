# Ultimate API Testing Guide (Thunder Client / Postman)

This guide contains every single API endpoint in the Personal Learning Path project. 
**Base URL:** `http://localhost:5001` (Change 5001 to 5000 if your server runs on port 5000)

## 1. Authentication (No Token Required)

### Register a New User
*   **Method:** `POST`
*   **URL:** `http://localhost:5001/api/auth/register`
*   **Body (JSON):**
    ```json
    {
      "name": "Test User",
      "email": "test@example.com",
      "password": "password123"
    }
    ```

### Login
*   **Method:** `POST`
*   **URL:** `http://localhost:5001/api/auth/login`
*   **Body (JSON):**
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```
*(Copy the `token` from the response and paste it into the **Auth -> Bearer Token** tab in Thunder Client for all requests below!)*

---

## 2. Skills & Profiles (Token Required)

### Add a Global Skill to Database
*   **Method:** `POST`
*   **URL:** `http://localhost:5001/api/skills`
*   **Body (JSON):**
    ```json
    {
      "name": "React",
      "category": "Frontend"
    }
    ```

### Get All Global Skills
*   **Method:** `GET`
*   **URL:** `http://localhost:5001/api/skills`

### Update Personal Skill Profile
*   **Method:** `PUT`
*   **URL:** `http://localhost:5001/api/skill-profiles`
*   **Body (JSON):**
    ```json
    {
      "skillProfile": [
        {
          "skill": "<paste_skill_id_here>",
          "currentLevel": "Beginner",
          "targetLevel": "Advanced"
        }
      ]
    }
    ```

---

## 3. Resources & Enrollments (Token Required)

### Create a Learning Resource (Course/Article)
*   **Method:** `POST`
*   **URL:** `http://localhost:5001/api/resources`
*   **Body (JSON):**
    ```json
    {
      "title": "Mastering React",
      "type": "course",
      "url": "https://react.dev"
    }
    ```

### Get All Resources
*   **Method:** `GET`
*   **URL:** `http://localhost:5001/api/resources`

### Enroll in a Resource
*   **Method:** `POST`
*   **URL:** `http://localhost:5001/api/enrollments`
*   **Body (JSON):**
    ```json
    {
      "resource": "<paste_resource_id_here>"
    }
    ```

### View My Enrollments
*   **Method:** `GET`
*   **URL:** `http://localhost:5001/api/enrollments`

---

## 4. Learning Logs (Token Required)

### Log Study Time
*   **Method:** `POST`
*   **URL:** `http://localhost:5001/api/learning-logs`
*   **Body (JSON):**
    ```json
    {
      "enrollment": "<paste_enrollment_id_here>",
      "hoursSpent": 2,
      "notes": "Learned about React Hooks."
    }
    ```

### View My Learning Logs
*   **Method:** `GET`
*   **URL:** `http://localhost:5001/api/learning-logs`

---

## 5. Milestones (Goals) (Token Required)

### Create a Milestone
*   **Method:** `POST`
*   **URL:** `http://localhost:5001/api/milestones`
*   **Body (JSON):**
    ```json
    {
      "title": "Finish React Course",
      "description": "Complete all modules by weekend",
      "targetDate": "2026-12-31"
    }
    ```

### View My Milestones
*   **Method:** `GET`
*   **URL:** `http://localhost:5001/api/milestones`

### Update Milestone Status
*   **Method:** `PUT`
*   **URL:** `http://localhost:5001/api/milestones/<paste_milestone_id_here>`
*   **Body (JSON):**
    ```json
    {
      "isCompleted": true
    }
    ```

---

## 6. Progress & Sharing (Token Required)

### Get Total Study Progress (Math Calculation)
*   **Method:** `GET`
*   **URL:** `http://localhost:5001/api/progress`

### Share Progress Report with Mentor
*   **Method:** `POST`
*   **URL:** `http://localhost:5001/api/share`
*   **Body (JSON):**
    ```json
    {
      "mentorEmail": "mentor@example.com",
      "message": "Hey! Check out my study hours this week."
    }
    ```

---

## 7. Advanced & Admin Routes (Token Required)

### AI Skill Gap Analysis
*   **Method:** `GET`
*   **URL:** `http://localhost:5001/api/analysis/skill-gap`
*   **Description:** Analyzes your skill profile and suggests what to learn next.

### Admin: Get All Platform Resources
*   **Method:** `GET`
*   **URL:** `http://localhost:5001/api/admin/resources`

### Admin: Send Push Notification (Firebase)
*   **Method:** `POST`
*   **URL:** `http://localhost:5001/api/notifications/send`
*   **Body (JSON):**
    ```json
    {
      "token": "<firebase_device_token_here>",
      "title": "New Course Available!",
      "body": "Check out the new Advanced React course."
    }
    ```
