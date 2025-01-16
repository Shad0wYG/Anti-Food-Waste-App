import { Sequelize } from "sequelize";
import db from "../database.js";
import user from "./user.js";

//hierarchicAAAAAAAAAAAAAAAAAAAAAAAAAAA
const friendship = db.define('Friendships', {
    userId1: {
        type: Sequelize.INTEGER, //so basically: user1 & user 2 are besties :3
        allowNull: false,
        references: {
            model: user,
            key: user.userId
        }
    },
    userId2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: user.userId
        }
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

export default friendship;