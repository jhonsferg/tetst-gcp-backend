import { Sequelize } from "sequelize";

const sequelize = new Sequelize('app-nodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;