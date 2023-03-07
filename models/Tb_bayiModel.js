import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import IbuHamil from "./Tb_ibuhamilModel.js";
import User from "./Tb_userModel.js";
const { DataTypes } = Sequelize;

const Tb_bayi = db.define(
  "tb_bayi",
  {
    nama_bayi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jenis_klamin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tnggl_lahir: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    anak_ke: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tbIbuhamilId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tbUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

IbuHamil.hasMany(Tb_bayi);
Tb_bayi.belongsTo(IbuHamil, { foreignKey: "tbIbuhamilId" });

User.hasMany(Tb_bayi);
Tb_bayi.belongsTo(User, { foreignKey: "tbUserId" });

export default Tb_bayi;
