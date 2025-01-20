import user from './models/user.js';
import product from './models/product.js';
import friendship from './models/friendship.js';

async function initialize(){
    
    // USER -< PRODUCT
    user.hasMany(product, {foreignKey: 'userId'});
    product.belongsTo(user, {foreignKey: 'userId'});

    // USER -< FRIENDS
    user.hasMany(friendship, {as: 'friend1', foreignKey:'userId1'});
    user.hasMany(friendship, {as: 'friend2', foreignKey: 'userId2'});    //I no no wanna hierarchical tables :[
    
    console.log('is ok! :D');
}

export default initialize;