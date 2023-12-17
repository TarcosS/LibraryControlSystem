import { Sequelize } from "sequelize";
import { DB_URI } from "../constants";

export const sequelize = new Sequelize(DB_URI, {logging: console.log})