import Sequelize from "sequelize";

const sequelize = new Sequelize("budgetify", "root", "Prathmesh@04", {
  host: "139.59.76.255", // Replace with your server's IP address
  dialect: "mysql",
  logging: false, // Disable logging
});

export default sequelize;
