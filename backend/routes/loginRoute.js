import express from 'express';
import { getUserByEmailAndPassword, createUser } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import REACT_APP_ACCESS_TOKEN from '../useful/apikey.js';

const loginRoute = express.Router();


loginRoute.route('/login').post(async (req, res) => {

    let {email, password} = req.body;

    if (!email || !password) return res.status(400).json('Bad Request');

    try {
      const user = await getUserByEmailAndPassword(email, password);

      return res.status(200).json({ user: user, token: generateToken(user) });
    } catch (err) {
      console.warn(err.stack);
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
    
    if(username.length > 30)
      return res.status(400).json('Username must have a maximum number of 30 characters');

    if (password != repeatPassword) {
        return res.status(400).json('Passwords do not match');
    }

	  password = await bcrypt.hash(password, 10);

    try {
        const user = await createUser({ username, email, password });
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

function generateToken(user) {
	return jwt.sign(
		{
			userId: user.userId,
      username: user.username,
			email: user.email
		},
	  REACT_APP_ACCESS_TOKEN,
		{
			expiresIn: '24h',
		}
	);
}

loginRoute.route('/validate-token').post(async (req, res) => {
	try {
		const token = req.body.token;
		if (!token) {
			return res.status(401).json('No token provided');
		}
		jwt.verify(token, REACT_APP_ACCESS_TOKEN, (err, decodedToken) => {
			if (err) {
				return res.status(401).json('Invalid token');
			}
			return res.status(200).json({ message: 'Valid token', token, userId: decodedToken.userId });
		});
	} catch (e) {
		console.warn(e.stack);
		return res.status(500).json(e.message);
	}
});

export default loginRoute;