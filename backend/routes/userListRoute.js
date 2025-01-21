import express from 'express';
import product, { setClaimedTrue, setClaimedFalse, deleteProduct, createProduct } from '../models/product.js';
import { tokenVerification } from '../useful/middleware.js';


const userListRoute = express.Router();

const checkId = (req, res, next) => {
    if (req.params.id && isNaN(req.params.id)) {
      res.status(400).json({ 
        error: "misinput for id" 
    });
    } else {
      next();
    }
};

//see a list
userListRoute.route('/userlist/:userId').get(checkId, async( req, res) => {
    try{
        const result = await product.findAll({
            where: {
                userId: req.params.userId
            }
        });
        if(result){
            return res.status(200).json(result);
        }
        else{
            return res.status(404).json({
                error: `User ${req.params.userId} has not been found.`
        });
        }
    } catch(error){
        return res.status(500).json(error.message);
    }
});

//this happens when i check the claim checkbox
userListRoute.route('/claimproduct').put(tokenVerification, async(req,res)=>{

    const product = req.body;
    if(product.isClaimed === false){
        await setClaimedTrue(product.productId);
        res.status(200).json(`Product with ID: ${product.productId} has been successfully claimed.`);
    }
})

//yea... :))))))))))))
// r/ProgrammerHumor typa dookie
userListRoute.route('/unclaimproduct').post(tokenVerification, async(req,res)=>{
    const product = req.body;
    if(product.isClaimed === true){
        await setClaimedFalse(product.productId);
        res.status(200).json(`Product with ID: ${product.productId} has been successfully unclaimed.`);
    }
})

userListRoute.route('/removeproduct').delete(tokenVerification, async(req, res)=>{
    try{
        await deleteProduct(req.body.productId);
        return res.status(200).json('product succesfully deleted');
    }catch(err)
    {
       return res.status(500).json(err.message);
    }

});

userListRoute.route('/createproduct').post(tokenVerification, async(req,res)=>{
    
    const {name, userId, category, dateExp, quantity} = req.body;
    if(!userId||!name||!category||!dateExp||!quantity)
        res.status(401).json('Bad request');
    try{
        const product = await createProduct({name,userId,category,dateExp,quantity});
        return res.status(201).json(product);
    }catch(err){
        return res.status(500).json(err.message);
    }
});

export default userListRoute;

