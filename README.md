# Virtual Event Management Platform

A Node.js and MongoDB-based backend for managing virtual events, organizers, and participants. This platform allows users to create, update, view, and delete events, as well as manage event participation.

---

## Features

- **Event CRUD:** Create, read, update, and delete events.
- **User Management:** (Assumed) Organizers and participants are managed via user IDs.
- **Event Participation:** Track participants for each event.
- **Status Tracking:** Events can be upcoming, ongoing, completed, or cancelled.
- **Capacity Management:** Limit the number of participants per event.
- **Timestamps:** Automatic creation and update timestamps for events.
- **Error Handling:** Robust error responses for invalid operations.
- **Email Notification (Pluggable):** Async/await ready for future email notification integration.

---

## Project Structure

```
src/
  controllers/
    eventsControllers.js   # Event-related API logic
  models/
    eventsModels.js        # Mongoose schema for events
  routes/
    eventsRoutes.js        # (Assumed) Express routes for events
  ...
README.md
package.json
```

---

## Event Model (`src/models/eventsModels.js`)

- **organizerId**: ObjectId (User reference, required)
- **title**: String (required, max 100 chars)
- **description**: String (max 1000 chars)
- **date**: Date (required)
- **time**: String (required, e.g., "14:00")
- **location**: String (max 200 chars)
- **status**: Enum ["upcoming", "ongoing", "completed", "cancelled"] (default: "upcoming")
- **capacity**: Number (default: 100, min: 1)
- **participants**: [ObjectId] (User references)
- **timestamps**: createdAt, updatedAt

---

## API Endpoints

### 1. Get All Events

- **GET** `/api/v1/events`
- **Description:** Retrieve a list of all events.
- **Response:**
  ```json
  {
    "message": "List of all events",
    "events": [ ... ]
  }
  ```

---

### 2. Create Event

- **POST** `/api/v1/events`
- **Body:**
  ```json
  {
    "title": "Event Title",
    "description": "Event Description",
    "date": "2025-07-21T18:30:00.000Z",
    "time": "18:30",
    "location": "Online",
    "organizerId": "USER_OBJECT_ID",
    "capacity": 100
  }
  ```
- **Response:**
  ```json
  {
    "message": "Event created successfully",
    "event": { ... }
  }
  ```

---

### 3. Get Event by ID

- **GET** `/api/v1/events/:id`
- **Response:**
  ```json
  {
    "message": "Event details for ID: ...",
    "event": { ... }
  }
  ```

---

### 4. Update Event

- **PUT** `/api/v1/events/:id`
- **Body:** (Any updatable fields)
- **Response:**
  ```json
  {
    "message": "Event updated for ID: ...",
    "event": { ... }
  }
  ```

---

### 5. Delete Event

- **DELETE** `/api/v1/events/:id`
- **Response:**
  ```json
  {
    "message": "Event deleted for ID: ..."
  }
  ```

---

## Error Handling

- **400 Bad Request:** Missing or invalid fields.
- **404 Not Found:** Event not found.
- **500 Internal Server Error:** Unexpected server error.

---

## Future Enhancements

- **Email Notifications:** Send emails on event creation, updates, or reminders (async/await ready).
- **User Authentication & Authorization:** Restrict actions to event organizers.
- **Event Search & Filtering:** By date, status, location, etc.
- **Pagination:** For large event lists.
- **Participant Management:** Register/unregister endpoints.

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure MongoDB connection** in your main app file.
3. **Run the server:**
   ```bash
   npm start
   ```
4. **Use the API** via Postman or any HTTP client.
