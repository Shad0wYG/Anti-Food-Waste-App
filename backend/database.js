import { Sequelize } from "sequelize";

const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'FOODdatabase.sqlite',
    logging: false,
    define: {
		timestamps: false,
		freezeTableName: true,
	}
});

export default db;