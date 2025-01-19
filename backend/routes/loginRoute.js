import express from 'express';
import { getUserByEmailAndCheckPassword } from '../models/user.js';

const loginRoute = express.Router();


loginRoute.route('/login').post(async (req, res) => {

    let {email, password} = req.body;

    if (!email || !password) return res.status(400).json('Bad Request');

    try {
      let user = await getUserByEmailAndCheckPassword(email, password);

      res.status(200).json({user, message:'Logged in successfully.'});
    } catch (err) {
      console.warn(e.stack);
      res.status(500).json("Error while trying to login");
    }
  });

loginRoute.route('/register').post(async(req,res) => {
    let { username, email, password, repeatPassword } = req.body;
    
    if (!username || !email || !password || !repeatPassword) return res.status(400).json('Bad Request');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
       return res.status(400).json('Invalid email');
    }
    
    if(user.length > 30)
      return res.status(400).json('Username must have a maximum number of 30 characters');

    if (password != repeatPassword) {
        return res.status(400).json('Passwords do not match');
    }

    try {
        const user = await createUser({ username, email, password });
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

export default loginRoute;