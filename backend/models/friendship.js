import { Sequelize } from "sequelize";
import db from "../database.js";
import user from "./user.js";
import Op from "sequelize";

//hierarchicAAAAAAAAAAAAAAAAAAAAAAAAAAA
const friendship = db.define('Friendships', {
    friendshipId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
    }
});

export async function removeFriend(id1, id2) {
    await friendship.destroy(
        {
            where:
            {
                [Op.or]:        //where (uid1 = id1 AND uid2 = id2) OR (uid1 = id2 AND uid2 = id1)
                    [
                        {
                            userId1: id1,
                            userId2: id2
                        },
                        {
                            userId1: id2,
                            userId2: id1
                        }
                    ]
            }
        }
    );
}

export default friendship;