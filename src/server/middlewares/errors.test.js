const { error404, generalError } = require("./errors");

describe("Given the error404 function", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it's invoked with a request", () => {
    test("Then it should call the response method status with 404", () => {
      const expectedResult = 404;

      error404(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedResult);
    });
  });
  describe("When it's invoked with a request", () => {
    test("Then it should call the response method json with error,not found", () => {
      const expextedResult = { msg: "error, not found" };

      error404(null, res);

      expect(res.json).toHaveBeenCalledWith(expextedResult);
    });
  });
});

describe("Given the generalError function", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When its invoked with a request", () => {
    test("Then it should call the response methot status with 400", () => {
      const error = new Error();
      error.statusCode = 400;
      error.customMessage = "hola";

      const expectedcode = 400;

      generalError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedcode);
    });
  });
  test("Then it should call the response method json with msg: hola", () => {
    const error = new Error();
    error.statusCode = 400;
    error.customMessage = "hola";

    const expectedMessage = { msg: error.customMessage };

    generalError(error, null, res);

    expect(res.json).toHaveBeenCalledWith(expectedMessage);
  });
  describe("When its invoked with a request", () => {
    test("Then it should call the response methot status with 500", () => {
      const error = new Error();

      const expectedcode = 500;

      generalError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedcode);
    });
  });
  test("Then it should call the response method json with msg: hola", () => {
    const error = new Error();

    const expectedMessage = { msg: "server error" };

    generalError(error, null, res);

    expect(res.json).toHaveBeenCalledWith(expectedMessage);
  });
});
