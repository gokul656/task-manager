import { Sequelize } from "sequelize";
import Config, { env } from "../../config";

export const sequelize = new Sequelize(env[Config.MYSQL_URI]);
