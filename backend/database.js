import { Sequelize } from "sequelize";

const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'FOODdatabase.sqlite',
    logging: false
});

export default db;