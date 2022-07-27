const Patient = require("../models/patient");
const { validationResult } = require("express-validator/check");

const getPatients = (req, res, next) => {
  Patient.findAll()
    .then((patients) => {
      res.status(200).json(patients);
    })
    .catch((err) => {
      const error = Error(err);
      error.statusCode = 500;
      error.message = "Couldn't get patients";
      return next(error);
    });
};

const addPatient = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const gender = req.body.gender;
  const relation = req.body.relation;

  Patient.create({
    name: name,
    gender: gender,
    relation: relation,
    userId: req.userId,
  })
    .then(() => {
      res.status(201).json({
        message: "Patient added successfully!",
        patient: {
          name: name,
          gender: gender,
          relation: relation,
          userId: req.userId,
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        err.message = "Couldn't add patient";
      }
      return next(err);
    });
};

const getPatient = (req, res, next) => {
  Patient.findByPk(req.params.patientId)
    .then((patient) => {
      if (patient === null) {
        const error = new Error(
          `Patient with id-${req.params.patientId} not found. Please try another id`
        );
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(patient);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        err.message = "Couldn't get patient";
      }
      return next(err);
    });
};

const updatePatient = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const gender = req.body.gender;
  const relation = req.body.relation;

  Patient.findByPk(req.params.patientId)
    .then((patient) => {
      if (patient === null) {
        const error = new Error(
          `Patient with id-${req.params.patientId} not found. Please try another id`
        );
        error.statusCode = 404;
        throw error;
      }
      patient.name = name;
      patient.gender = gender;
      patient.relation = relation;
      return patient.save();
    })
    .then(() => {
      res.status(201).json({
        message: "Patient details updated successfully!",
        patient: { name: name, gender: gender, relation: relation },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        err.message = "Couldn't update patient";
      }
      return next(err);
    });
};

const deletePatient = (req, res, next) => {
  Patient.findByPk(req.params.patientId)
    .then((patient) => {
      if (patient === null) {
        const error = new Error(
          `Patient with id-${req.params.patientId} not found. Please try another id`
        );
        error.statusCode = 404;
        throw error;
      }
      return patient.destroy();
    })
    .then(() => {
      res
        .status(200)
        .send(`Patient with id-${req.params.patientId} deleted successfully!`);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        err.message = "Couldn't delete patient";
      }
      return next(err);
    });
};

module.exports = {
  getPatients: getPatients,
  getPatient: getPatient,
  addPatient: addPatient,
  updatePatient: updatePatient,
  deletePatient: deletePatient,
};
