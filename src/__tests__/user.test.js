const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

describe("User API", () => {
  const testUser = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  };

  describe("POST /api/users/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/users/register")
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body.user.name).toBe(testUser.name);
      expect(response.body.user.email).toBe(testUser.email);
      expect(response.body.token).toBeDefined();
    });

    it("should not register a user with existing email", async () => {
      await User.create(testUser);

      const response = await request(app)
        .post("/api/users/register")
        .send(testUser);

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("POST /api/users/login", () => {
    beforeEach(async () => {
      await User.create(testUser);
    });

    it("should login with correct credentials", async () => {
      const response = await request(app).post("/api/users/login").send({
        email: testUser.email,
        password: testUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.body.user.email).toBe(testUser.email);
      expect(response.body.token).toBeDefined();
    });

    it("should not login with incorrect password", async () => {
      const response = await request(app).post("/api/users/login").send({
        email: testUser.email,
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("GET /api/users/profile", () => {
    let token;

    beforeEach(async () => {
      const user = await User.create(testUser);
      token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    });

    it("should get user profile with valid token", async () => {
      const response = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe(testUser.email);
    });

    it("should not get profile without token", async () => {
      const response = await request(app).get("/api/users/profile");

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
    });
  });
});
