import jwt from 'jsonwebtoken';

export const tokenVerification = (req,res,next)=>{

    const authHeader = req.headers.authorization;
    if (!authHeader) {
		return res.status(401).json('Authorization header not provided');
	}

	const token = authHeader.split(' ')[1];
	if (!token) {
		return res.status(401).json('No token provided');
	}

	jwt.verify(token, process.env.ACCESS_TOKEN , (err, decodedToken) => {
		if (err) {
			return res.status(401).json('Invalid');
		}
		req.decodedToken = decodedToken;
		next();
	});
}