import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import IbuHamil from "./Tb_ibuhamilModel.js";
const { DataTypes } = Sequelize;

const Tb_kaladua = db.define(
  "tb_kaladua",
  {
    episiotomi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pndmping_pdsaatprslinan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gawat_janin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    mslh_lainsbutkn: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    penatalaksaan_mslhtsb: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    hasilnya: {
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
  },
  {
    freezeTableName: true,
  }
);

IbuHamil.hasMany(Tb_kaladua);
Tb_kaladua.belongsTo(IbuHamil, { foreignKey: "tbIbuhamilId" });

export default Tb_kaladua;
