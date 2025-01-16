import { Sequelize } from 'sequelize';
import db from '../database.js';
import list from './list.js';

const product = db.define('Products', {
    productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    listId: {
        type: Sequelize.INTEGER,
        references: {
            model: list,
            key: list.listId
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

export async function getProductById(model, primaryKey){
    const product = model.findByPk(primaryKey);
    if(!product) throw new Error('Product not found.');
    return product;
}

export async function setCategory(model, id, category){
    if(!['meat', 'fruit/vegetables', 'dairy', 'other'].includes(category))
        throw new Error('Invalid category type');
    const product = model.getProductById(model, id);
    product.category = category;
    return await product.save();
}

export async function setClaimedTrue(model, id){
    const product = model.getProductById(model, id);
    product.isClaimed = true;
    return await product.save();
}

export default product;