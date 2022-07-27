const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Patient = sequelize.define("patient", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  relation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Patient;
