import { Sequelize } from "sequelize";

const db = new Sequelize("db_buming", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
