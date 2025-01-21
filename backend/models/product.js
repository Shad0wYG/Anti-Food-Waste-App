import { Sequelize } from 'sequelize';
import db from '../database.js';
import user from '../models/user.js';

const product = db.define('Products', {
    productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false
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
            isIn: [['meat', 'fruit/vegetables', 'dairy', 'other']]
        },
        allowNull: false,
        defaultValue: 'meat'
    },
    dateExp: {  //best before bla bla
        type: Sequelize.DATEONLY,
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
    const nproduct = product.findByPk(primaryKey);
    if(!nproduct) throw new Error('Product not found.');
    return nproduct;
}

export async function setCategory(id, category){
    if(!['meat', 'fruit/vegetables', 'dairy', 'other'].includes(category))
        throw new Error('Invalid category type');
    const product = model.getProductById(model, id);
    product.category = category;
    return await product.save();
}

export async function setClaimedFalse(idProduct){
    try{
        const uproduct = await getProductById(idProduct);
    
        uproduct.isClaimed = false;
        return await uproduct.save();
    }catch(err){
        throw err;
    }
}

export async function setClaimedTrue(idProduct){
    try{
        const uproduct = await getProductById(idProduct);
    
        uproduct.isClaimed = true;
        return await uproduct.save();
    }catch(err){
        throw err;
    }
}

export async function deleteProduct(id){
    const dproduct = await getProductById(id);
    await dproduct.destroy();
}

export default product;