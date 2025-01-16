import { Sequelize } from "sequelize";
import db from "../database.js";
import user from "./user.js";

const list = db.define('Lists', {
    listId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: user,
            key: user.userId
        }
    }
});

export default list;
