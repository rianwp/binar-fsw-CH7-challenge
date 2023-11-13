const request = require("supertest");
const app = require("../app");
const dotenv = require("dotenv");
dotenv.config();

describe("API Login", () => {
  it("success login", async () => {
    const user = {
      email: "fikri@binar.co.id",
      password: "123456",
    };
    const response = await request(app).post("/v1/auth/login").send(user);
    expect(response.statusCode).toBe(201);
  });

  it("failed login : wrong password", async () => {
    const failedUser = {
      email: "fikri@binar.co.id",
      password: "1234656",
    };
    const response = await request(app).post("/v1/auth/login").send(failedUser);
    expect(response.statusCode).toBe(401);
  });

  it("failed login : email not registered", async () => {
    const failedUser = {
      email: "fikria@binar.co.id",
      password: "1234656",
    };
    const response = await request(app).post("/v1/auth/login").send(failedUser);
    expect(response.statusCode).toBe(404);
  });
});

describe("API Register", () => {
  it("success register", async () => {
    const user = {
      name: "jordi",
      email: "jordi@binar.co.id",
      password: "123456",
    };
    const response = await request(app).post("/v1/auth/register").send(user);
    expect(response.statusCode).toBe(201);
  });

  it("failed register : email has already been taken", async () => {
    const failedUser = {
      name: "test",
      email: "jordi@binar.co.id",
      password: "1234656",
    };
    const response = await request(app)
      .post("/v1/auth/register")
      .send(failedUser);
    expect(response.statusCode).toBe(422);
  });
});
