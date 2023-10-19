import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";

const ForgotPasswordRequests = sequelize.define("ForgotPasswordRequests", {
  id: {
    type: DataTypes.STRING,
    unique: true,
    defaultValue: () => uuidv4(),
  },
  isactive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
