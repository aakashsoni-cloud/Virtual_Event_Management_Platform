const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventsControllers");

// GET /events
router.get("/", verifyToken, getAllEvents);

// POST /events
router.post("/", verifyToken, createEvent);

// GET /events/:id
router.get("/:id", verifyToken, getEventById);

// PUT /events/:id
router.put("/:id", verifyToken, updateEvent);

// DELETE /events/:id
router.delete("/:id", verifyToken, deleteEvent);

module.exports = router;
