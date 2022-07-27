const expect = require("chai").expect;
const patientController = require("../controller/patient");
const Patient = require("../models/patient");
const sequelizeTest = require("../util/testdb");

describe("Patient Controller", function () {
  before(() => {
    sequelizeTest.sync({ force: true }).then(() => {
      Patient.create({
        id: 1,
        name: "Paul",
        gender: "male",
        relation: "self",
      });
    });
  });

  it("should return list of patients", () => {
    const res = {
      status: () => {
        return 200;
      },
      json: () => {},
    };
    patientController.getPatients({}, res, () => {});
  });

  it("should return a single patient", () => {
    const req = {
      params: {
        patientId: 1,
      },
    };
    const res = {
      status: () => {
        return 200;
      },
      json: () => {},
    };
    patientController.getPatient(req, res, () => {});
  });

  it("should add new patient", () => {
    const req = {
      body: {
        name: "John",
        gender: "male",
        relation: "father",
      },
    };
    const res = {
      status: () => {
        return 201;
      },
      json: () => {},
    };
    patientController.addPatient(req, res, () => {});
  });

  it("should update a patient", () => {
    const req = {
      params: {
        patientId: 2,
      },
      body: {
        name: "Kerry",
        gender: "male",
        relation: "father",
      },
    };
    const res = {
      status: () => {
        return 201;
      },
      json: () => {},
    };
    patientController.updatePatient(req, res, () => {});
  });

  it("should delete a single patient", () => {
    const req = {
      params: {
        patientId: 2,
      },
    };
    const res = {
      status: () => {
        return 200;
      },
      json: () => {},
    };
    patientController.deletePatient(req, res, () => {});
  });

  after(function (done) {
    Patient.destroy({ where: { id: 1 } })
      .then(() => {
        return sequelizeTest.close();
      })
      .then(() => {
        done();
      });
  });
});
