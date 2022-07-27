const isAuth = require("../middleware/isAuth");
const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

describe("Auth Middleware", () => {
  it("should throw an error if authorization header is missing", () => {
    const req = {
      get: (headerName) => {
        return null;
      },
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw("Not authenticated.");
  });

  it("should thow error if authorization header is only one string", () => {
    const req = {
      get: (headerName) => {
        return "abc";
      },
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw();
  });

  it("should thow error if token is incorrect", () => {
    const req = {
      get: (headerName) => {
        return "Bearer abc";
      },
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw();
  });

  it("should have userId property for req after decoding the token", () => {
    const req = {
      get: (headerName) => {
        return "secretkey";
      },
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "1" });

    isAuth(req, {}, () => {});
    expect(req).to.have.property("userId");
    jwt.verify.restore();
  });
});
