const mongoose = require("mongoose");

module.exports = [
    {
        _id: "1",
        title: "Test Event",
        description: "Desc",
        date: "2025-07-21T18:30:00.000Z",
        time: "18:30",
        location: "Online",
        organizerId: new mongoose.Types.ObjectId().toString(),
        capacity: 100,
        eventUrl: "https://event.com"
    },
    {
        _id: "2",
        title: "Another Event",
        description: "Another Desc",
        date: "2025-07-22T18:30:00.000Z",
        time: "18:30",
        location: "Online",
        organizerId: new mongoose.Types.ObjectId().toString(),
        capacity: 100,
        eventUrl: "https://event.com"
    }
];