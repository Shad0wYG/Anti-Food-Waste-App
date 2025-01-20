import cors from 'cors';
import express from 'express';
import initialize from './initializeDB.js';
import bodyParser from 'body-parser';
import friendRoute from './routes/friendRoute.js';
import loginRoute from './routes/loginRoute.js';
import userListRoute from './routes/userListRoute.js';
import product from './models/product.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

initialize();

app.use('/api', loginRoute);
app.use('/api', userListRoute);
app.use('/api', friendRoute);

app.listen(8000, ()=>{
    console.log('Server running on port 8000');
});
