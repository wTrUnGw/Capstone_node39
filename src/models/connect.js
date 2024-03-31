import { Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(config.database,config.user,config.pass ,{
    host: config.host,
    port: config.port,
    dialect: config.dialect
});
try {
    await sequelize.authenticate();
    console.log("Kết nối thành công");
  } catch (err) {
    console.log(err);
  }
  

export default sequelize;