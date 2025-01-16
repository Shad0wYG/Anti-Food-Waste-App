import user from './models/user.js';
import list from './models/list.js';
import product from './models/product.js';
import friendship from './models/friendship.js';

async function initialize(){
    
    // USER -< LIST
    user.hasMany(list, {foreignKey: 'userId'});
    list.belongsTo(user, {foreignKey: 'userId'});

    // LIST -< PRODUCT
    list.hasMany(product, {foreignKey: 'listId'});
    product.belongsTo(list, {foreignKey: 'listId'});

    // USER -< FRIENDS
    user.belongsTo(friendship, {as: 'friend1', foreignKey:'userId1'});
    user.belongsTo(friendship, {as: 'friend2', foreignKey: 'userId2'});    //I no no wanna hierarchical tables :[
    
    console.log('is ok! :D');
}

export default initialize;