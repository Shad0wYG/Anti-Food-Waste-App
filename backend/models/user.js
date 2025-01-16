import { Sequelize } from "sequelize";
import db from '../database.js';

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

export async function getUserId(model, primaryKey){
    const user = model.findByPk(primaryKey);
    if(!user) throw new Error('User not found');
    return user;
}

export async function getUserByEmail(model, email){
    const user = model.findOne({
        where: {email}
    });

    if(!user) throw new Error('Email not found');

    return user;
}

export async function createUser(model, user){
    let duplicate;

    try{
        duplicate = await getUserByEmail(model, user.email);

    }catch(e){
        await model.create(user);
    }

    if(duplicate) 
        throw new Error('User already exists');
}

export async function getUserByEmailAndCheckPassword(model, email, password) {
	try {
		const user = await getUserByEmail(model, email);
		if (user.password !== password) throw new Error('Email or Password does not match.');
		return user;
	} catch (e) {
		throw e;
	}
}

export async function deleteUser(model, id){
    const user = await getUserId(model, id);
    await user.destroy();
}

export default user;