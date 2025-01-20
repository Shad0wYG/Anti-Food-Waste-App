import { Sequelize } from 'sequelize';
import db from '../database.js';
import user from '../models/user.js';

const product = db.define('Products', {
    productId: {
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
    },
    category: {
        type: Sequelize.STRING,
        validate: {
            isIn: ['meat', 'fruit/vegetables', 'dairy', 'other']
        },
        allowNull: false,
        defaultValue: 'meat'
    },
    dateExp: {  //best before bla bla
        type: Sequelize.DATE,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,    //insane assumption that users will just say "lol i have 5 eggs and 1 milk carton"
        allowNull: false 
    },
    isClaimed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }   
});

export async function createProduct(newProduct){
    await product.create(newProduct);
}

export async function getProductById(primaryKey){
    const product = product.findByPk(primaryKey);
    if(!product) throw new Error('Product not found.');
    return product;
}

export async function setCategory(id, category){
    if(!['meat', 'fruit/vegetables', 'dairy', 'other'].includes(category))
        throw new Error('Invalid category type');
    const product = model.getProductById(model, id);
    product.category = category;
    return await product.save();
}

export async function setClaimedTrue(id){
    const product = product.getProductById(id);
    product.isClaimed = true;
    return await product.save();
}

export async function setClaimedFalse(id){
    const product = product.getProductById(id);
    product.isClaimed = false;
    return await product.save();
}

export async function deleteProduct(id){
    const product = product.findByPk(id);
    await product.destroy();
}

export default product;