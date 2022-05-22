const bcrypt = require("bcrypt");
const { compare } = require("bcrypt");
const { loginUser } = require("./usersControllers");
const User = require("../../database/models/User");

const expectedToken = "userToken";
const user = {
  id: "1",
  username: "maria jose",
  password: "123456",
};

jest.mock("jsonwebtoken", () => ({
  sign: () => expectedToken,
}));

describe("Given the loginUser function", () => {
  describe("When its called with an username and password corrects", () => {
    test("Then it should call the response method status with 201", async () => {
      jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
      User.findOne = jest.fn().mockResolvedValue(user);

      const req = {
        body: {
          id: "1",
          name: "maria jose",
          username: "maria jose",
          password: "123456",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();
      const expectedResultvalue = 201;

      await loginUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedResultvalue);
      expect(res.json).toHaveBeenCalledWith({ token: expectedToken });
    });
  });
  describe("when its invked with an incorrect username", () => {
    test("then it should call next", async () => {
      User.findOne = jest.fn().mockResolvedValue(!user);

      const req = {
        body: {
          id: "1",
          name: "maria jose",
          username: "maria josee",
          password: "123456",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("when its invked with an incorrect password", () => {
    test("then it should call next", async () => {
      jest.spyOn(bcrypt, "compare").mockResolvedValue(false);
      User.findOne = jest.fn().mockResolvedValue(user);

      const req = {
        body: {
          id: "1",
          name: "maria jose",
          username: "maria jose",
          password: "1111",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
