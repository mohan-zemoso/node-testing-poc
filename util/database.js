const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-poc", "node", "Node@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
