import { Sequelize } from "sequelize";
import db from '../database.js';
import bcrypt from 'bcrypt';

const user = db.define('Users', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            max: 30     //max 30 characters cause DUH
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/      //this is regex that just says "omg make it anything like sdjkhsd@sdjfhsd.com"
        }
    }

});

export async function getUserId(primaryKey){
    const selectUser = user.findByPk(primaryKey);
    if(!selectUser) throw new Error('User not found');
    return selectUser;
}

export async function getUserByEmail(email){
    const selectUser = user.findOne({
        where: {email: email}
    });

    if(!selectUser) throw new Error('Email not found');

    return selectUser;
}

export async function createUser(newuser){
    let duplicate;


    duplicate = await getUserByEmail(newuser.email);
    if(duplicate) 
        throw new Error('User already exists');
    return await user.create(newuser);
}

export async function getUserByEmailAndPassword(email, password) {
	try {
		const selectUser = await getUserByEmail(email);

        const validPassword = await bcrypt.compare(password, selectUser.password);
		if (!validPassword) throw new Error(`Password does not match`);

		return selectUser;
	} catch (e) {
		throw e;
	}
}

export async function deleteUser(id){
    const selectUser = await getUserId(id);
    await selectUser.destroy();
}

export default user;