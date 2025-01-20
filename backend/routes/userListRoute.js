import express from 'express';
import { setClaimedTrue, setClaimedFalse, deleteProduct } from '../models/product.js';
import { tokenVerification } from '../middleware.js';

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
            res.status(200).json(result.product);
        }
        else{
            res.status(404).json({
                error: `User ${req.params.userId} has not been found.`
        });
        }
    } catch(error){
        res.status(500).json(error);
    }
});

//this happens when i check the claim checkbox
userListRoute.route('/claimproduct/:productId').post(tokenVerification, async(req,res)=>{
    try{
        if(req.params.status === false){
            await setClaimedTrue(req.params.productId);
            res.status(200).json(`Product with ID: ${req.params.productId} has been successfully claimed.`);
        }

    }catch(error){
        res.status(500).json(error);
    }
})

//yea... :))))))))))))
// r/ProgrammerHumor typa dookie
userListRoute.route('/unclaimproduct/:productId').post(tokenVerification, async(req,res)=>{
    try{
        if(req.params.status === true){
            await setClaimedFalse(req.params.productId);
            res.status(200).json(`Product with ID: ${req.params.productId} has been successfully unclaimed.`);
        }

    }catch(error){
        res.status(500).json(error);
    }
})

userListRoute.route('/removeproduct/:productId').delete(tokenVerification, async(req, res)=>{
    try{
        await deleteProduct(req.params.productId);
        res.status(200).json('product succesfully deleted');
    }catch(err)
    {
        res.status(500).json(err);
    }

});

export default userListRoute;

