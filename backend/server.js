import cors from 'cors';
import express from 'express';
import initialize from './initializeDB.js';
import bodyParser from 'body-parser';
import db from './database.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

initialize();

db.sync({ force: false }).then(() => {
    console.log('Database created/synced');
});

app.listen(8080, ()=>{
    console.log('Server running on port 8080');
});