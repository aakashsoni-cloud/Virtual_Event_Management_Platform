const eventModel = require("../models/eventsModels");

const getAllEvents = async (req, res) => {
  const { page = 1, limit = 10, status, organizerId } = req.query;
  const skip = (page - 1) * limit;

  let query = {};
  if (status) query.status = status;
  if (organizerId) query.organizerId = organizerId;

  try {
    const events = await eventModel
      .find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ date: 1 });

    const total = await eventModel.countDocuments(query);

    res.status(200).json({
      message: "List of all events",
      events,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error retrieving events:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const createEvent = async (req, res) => {
  // Logic to create a new event in the database
  const eventData = req.body;
  if (
    !eventData.title ||
    !eventData.date ||
    !eventData.location ||
    !eventData.organizerId ||
    !eventData.description ||
    !eventData.time ||
    !eventData.capacity ||
    !eventData.eventUrl
  ) {
    return res.status(400).json({ message: "Missing required event fields." });
  }
  // Logic to save the eventData to the database

  try {
    // Logic to save the eventData to the database
    const createdEvent = await eventModel.create(eventData);
    res
      .status(201)
      .json({ message: "Event created successfully", event: createdEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getEventById = async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    res
      .status(200)
      .json({ message: `Event details for ID: ${eventId}`, event });
  } catch (error) {
    console.error("Error retrieving event:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const updatedData = req.body;
  try {
    const event = await eventModel.findByIdAndUpdate(eventId, updatedData, {
      new: true,
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    res
      .status(200)
      .json({ message: `Event updated for ID: ${eventId}`, event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await eventModel.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json({ message: `Event deleted for ID: ${eventId}` });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};
