const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const MessageModel = require('../models/comment');
//const DIALECTS = ['mysql', 'sqlite'];
require('dotenv').config();

if (!process.env.DB_DIALECT) throw new Error('DB_DIALECT environment variable must be set');
//if (!DIALECTS.includes(DB_DIALECT)) throw new Error(`DB_DIALECT must be one of: ${DIALECTS}`);
if (!process.env.DB_PASS) throw new Error('DB_PASS environment variable must be set');
if (!process.env.DB_HOST) throw new Error('DB_HOST environment variable must be set');
if (!process.env.DB_NAME) throw new Error('DB_NAME environment variable must be set');
if (!process.env.DB_USER) throw new Error('DB_USER environment variable must be set');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: true
    }
);

const Message = MessageModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

module.exports = {
    User, Message
}