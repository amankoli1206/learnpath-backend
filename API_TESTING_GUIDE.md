# API Testing Guide

This document contains every single API endpoint available in the Personal Learning Path & Skill Tracker. 

**Base URL:** `http://localhost:5001`

**Authentication Note:** 
Almost all endpoints (except Register and Login) require a Bearer Token. 
To test them in Postman or Thunder Client:
1. Login or Register to get a `token`.
2. Go to the **Auth** tab.
3. Select **Bearer Token** and paste the `token` there.

---

## 1. Authentication Endpoints

### Register User
*   **Method:** `POST`
*   **URL:** `/api/auth/register`
*   **Auth Required:** No
*   **Body (JSON):**
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "password": "password123"
    }
    ```

### Login User
*   **Method:** `POST`
*   **URL:** `/api/auth/login`
*   **Auth Required:** No
*   **Body (JSON):**
    ```json
    {
      "email": "jane@example.com",
      "password": "password123"
    }
    ```

---

## 2. Skills Endpoints

### Get All Skills
*   **Method:** `GET`
*   **URL:** `/api/skills`
*   **Auth Required:** Yes

### Get Single Skill
*   **Method:** `GET`
*   **URL:** `/api/skills/:id` (Replace `:id` with actual Skill ID)
*   **Auth Required:** Yes

### Create Skill
*   **Method:** `POST`
*   **URL:** `/api/skills`
*   **Auth Required:** Yes
*   **Body (JSON):**
    ```json
    {
      "name": "JavaScript",
      "category": "Programming",
      "description": "Web language"
    }
    ```

### Update Skill
*   **Method:** `PUT`
*   **URL:** `/api/skills/:id`
*   **Auth Required:** Yes
*   **Body (JSON):**
    ```json
    {
      "description": "Updated description here"
    }
    ```

### Delete Skill
*   **Method:** `DELETE`
*   **URL:** `/api/skills/:id`
*   **Auth Required:** Yes

---

## 3. Skill Profiles Endpoints

### Update User's Skill Profile
*   **Method:** `PUT`
*   **URL:** `/api/skill-profiles`
*   **Auth Required:** Yes
*   **Body (JSON):**
    ```json
    {
      "skillProfile": [
        {
          "skill": "<skill_id_here>",
          "currentLevel": "Beginner",
          "desiredLevel": "Expert"
        }
      ]
    }
    ```

---

## 4. Resources Endpoints

### Get All Resources
*   **Method:** `GET`
*   **URL:** `/api/resources`
*   **Auth Required:** Yes

### Get Single Resource
*   **Method:** `GET`
*   **URL:** `/api/resources/:id`
*   **Auth Required:** Yes

### Create Resource
*   **Method:** `POST`
*   **URL:** `/api/resources`
*   **Auth Required:** Yes
*   **Body (JSON):**
    ```json
    {
      "title": "React for Beginners",
      "type": "course",
      "url": "https://example.com/react"
    }
    ```

---

## 5. Enrollments Endpoints

### Get User's Enrollments
*   **Method:** `GET`
*   **URL:** `/api/enrollments`
*   **Auth Required:** Yes

### Enroll in a Resource
*   **Method:** `POST`
*   **URL:** `/api/enrollments`
*   **Auth Required:** Yes
*   **Body (JSON):**
    ```json
    {
      "resource": "<resource_id_here>"
    }
    ```

---

## 6. Learning Logs Endpoints

### Get User's Learning Logs
*   **Method:** `GET`
*   **URL:** `/api/learning-logs`
*   **Auth Required:** Yes

### Create a Learning Log
*   **Method:** `POST`
*   **URL:** `/api/learning-logs`
*   **Auth Required:** Yes
*   **Body (JSON):**
    ```json
    {
      "resource": "<resource_id_here>",
      "skill": "<skill_id_here>",
      "hoursSpent": 3,
      "notes": "Finished the intro module"
    }
    ```

---

## 7. Milestones Endpoints

### Get User's Milestones
*   **Method:** `GET`
*   **URL:** `/api/milestones`
*   **Auth Required:** Yes

### Create a Milestone
*   **Method:** `POST`
*   **URL:** `/api/milestones`
*   **Auth Required:** Yes
*   **Body (JSON):**
    ```json
    {
      "title": "Finish Backend Course",
      "targetDate": "2026-11-01"
    }
    ```

---

## 8. Progress & Share Endpoints

### Get Progress Data for a Specific User
*   **Method:** `GET`
*   **URL:** `/api/progress/user/:id` (Replace `:id` with User ID)
*   **Auth Required:** Yes

### Share Progress
*   **Method:** `POST`
*   **URL:** `/api/share`
*   **Auth Required:** Yes
*   **Body (JSON):**
    ```json
    {
      "mentorEmail": "mentor@example.com",
      "message": "Check out my latest progress!"
    }
    ```

---

## 9. Admin & Notifications Endpoints

### Admin View All Resources
*   **Method:** `GET`
*   **URL:** `/api/admin/resources`
*   **Auth Required:** Yes

### Send Milestone Notification
*   **Method:** `POST`
*   **URL:** `/api/notifications/send`
*   **Auth Required:** Yes
*   **Body (JSON):**
    ```json
    {
      "milestoneId": "<milestone_id_here>",
      "message": "Congratulations on hitting your goal!"
    }
    ```

### AI Skill Gap Analysis (Bonus Feature)
*   **Method:** `GET`
*   **URL:** `/api/analysis/skill-gap`
*   **Auth Required:** Yes


### AI Skill Gap Analysis (Bonus Feature)
*   **Method:** `GET`
*   **URL:** `/api/analysis/skill-gap`
*   **Auth Required:** Yes

