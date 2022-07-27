const expect = require("chai").expect;
const AuthController = require("../controller/auth");
const User = require("../models/user");
const sequelizeTest = require("../util/testdb");

describe("Auth Controller", function () {
  before(() => {
    sequelizeTest.sync({ force: true }).then(() => {
      User.create({
        id: 1,
        email: "test@gmail.com",
        password: "test123",
        name: "Test",
      });
    });
  });

  it("signup", function () {
    const req = {
      body: {
        name: "Paul",
        email: "paul@gmail.com",
        password: "paul123",
      },
    };
    const res = {
      statusCode: 201,
      status: () => {},
      json: () => {},
    };
    AuthController.signup(req, res, () => {});
  });

  it("login", function () {
    const req = {
      body: {
        email: "paul@gmail.com",
        password: "paul123",
      },
    };
    const res = {
      token: "abc",
      id: 2,
      name: "Paul",
      email: "paul@gmail.com",
      statusCode: 200,
      status: () => {},
      json: () => {},
    };
    AuthController.login(req, res, () => {});
  });

  after(function (done) {
    User.destroy({ where: { id: 1 } })
      .then(() => {
        return sequelizeTest.close();
      })
      .then(() => {
        done();
      });
  });
});
