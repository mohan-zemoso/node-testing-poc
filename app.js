const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const patientRoutes = require("./routes/patient");
const authRoutes = require("./routes/auth");
const sequelize = require("./util/database");
const Patient = require("./models/patient");
const User = require("./models/user");

app.use(bodyParser.json()); // application/json
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/booking", patientRoutes.router);
app.use("/auth", authRoutes.router);
app.use((error, req, res, next) => {
  res.status(error.statusCode).send(error.message);
});

Patient.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Patient);
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
