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
    const user = user.findByPk(primaryKey);
    if(!user) throw new Error('User not found');
    return user;
}

export async function getUserByEmail(email){
    const user = user.findOne({
        where: {email: email}
    });

    if(!user) throw new Error('Email not found');

    return user;
}

export async function createUser(user){
    let duplicate;

    try{
        duplicate = await getUserByEmail(user.email);
    }catch(e){
        await user.create(user);
    }

    if(duplicate) 
        throw new Error('User already exists');
}

export async function getUserByEmailAndPassword(email, password) {
	try {
		const user = await getUserByEmail(email);

        const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) throw new Error(`Password does not match`);

		return user;
	} catch (e) {
		throw e;
	}
}

export async function deleteUser(id){
    const user = await getUserId(id);
    await user.destroy();
}

export default user;