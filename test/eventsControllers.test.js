const request = require("supertest");
const express = require("express");

jest.mock("../src/middleware/auth", () => ({
  verifyToken: (req, res, next) => next(),
}));
jest.mock("../src/models/eventsModels");

const eventModel = require("../src/models/eventsModels");
const eventsRouter = require("../src/routes/eventsRoutes"); // Assumed route file
const eventMockData = require("./mock/eventMock");

const app = express();
app.use(express.json());
app.use("/v1/events", eventsRouter);

describe("Event Controllers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /v1/events", () => {
    it("should return all events", async () => {
      const mockFind = jest.fn().mockReturnThis();
      const mockSkip = jest.fn().mockReturnThis();
      const mockLimit = jest.fn().mockReturnThis();
      const mockSort = jest.fn().mockResolvedValue(eventMockData);

      eventModel.find.mockImplementation(() => ({
        skip: mockSkip.mockImplementation(() => ({
          limit: mockLimit.mockImplementation(() => ({
            sort: mockSort,
          })),
        })),
      }));
      eventModel.countDocuments.mockResolvedValue(1);
      const res = await request(app).get("/v1/events");
      expect(res.statusCode).toBe(200);
      expect(res.body.events).toBeDefined();
    });

    it("should handle errors", async () => {
      // Mock the full chain to throw an error at the end
      const mockFind = jest.fn().mockReturnThis();
      const mockSkip = jest.fn().mockReturnThis();
      const mockLimit = jest.fn().mockReturnThis();
      const mockSort = jest.fn().mockRejectedValue(new Error("DB Error"));

      eventModel.find.mockImplementation(() => ({
        skip: mockSkip.mockImplementation(() => ({
          limit: mockLimit.mockImplementation(() => ({
            sort: mockSort,
          })),
        })),
      }));

      const res = await request(app).get("/v1/events");
      expect(res.statusCode).toBe(500);
    });
  });

  describe("POST /v1/events", () => {
    it("should create an event with valid data", async () => {
      const eventData = eventMockData[0];
      eventModel.create.mockResolvedValue(eventData);
      const res = await request(app).post("/v1/events").send(eventData);
      expect(res.statusCode).toBe(201);
      expect(res.body.event.title).toBe("Test Event");
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app).post("/v1/events").send({});
      expect(res.statusCode).toBe(400);
    });
  });

  describe("GET /v1/events/:id", () => {
    it("should return event by id", async () => {
      const event = { _id: "1", title: "Test Event" };
      eventModel.findById.mockResolvedValue(event);
      const res = await request(app).get("/v1/events/1");
      expect(res.statusCode).toBe(200);
      expect(res.body.event.title).toBe("Test Event");
    });

    it("should return 404 if event not found", async () => {
      eventModel.findById.mockResolvedValue(null);
      const res = await request(app).get("/v1/events/1");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("PUT /v1/events/:id", () => {
    it("should update event", async () => {
      const updated = { _id: "1", title: "Updated" };
      eventModel.findByIdAndUpdate.mockResolvedValue(updated);
      const res = await request(app)
        .put("/v1/events/1")
        .send({ title: "Updated" });
      expect(res.statusCode).toBe(200);
      expect(res.body.event.title).toBe("Updated");
    });

    it("should return 404 if event not found", async () => {
      eventModel.findByIdAndUpdate.mockResolvedValue(null);
      const res = await request(app)
        .put("/v1/events/1")
        .send({ title: "Updated" });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /v1/events/:id", () => {
    it("should delete event", async () => {
      eventModel.findByIdAndDelete.mockResolvedValue({ _id: "1" });
      const res = await request(app).delete("/v1/events/1");
      expect(res.statusCode).toBe(200);
    });

    it("should return 404 if event not found", async () => {
      eventModel.findByIdAndDelete.mockResolvedValue(null);
      const res = await request(app).delete("/v1/events/1");
      expect(res.statusCode).toBe(404);
    });
  });
});
