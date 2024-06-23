import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();


const sequelize = new Sequelize( 'rrhh', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize;
