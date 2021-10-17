const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const MessageModel = require('../models/comment');
const DIALECTS = ['mysql'];
require('dotenv').config();

if (!process.env.DB_DIALECT) throw new Error('DB_DIALECT environment variable must be set');
if (!DIALECTS.includes(process.env.DB_DIALECT)) throw new Error(`DB_DIALECT must be: MySQL`);
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
        logging: true,
        timezone: '+02:00'
    }
);

const Message = MessageModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

/* User.hasMany(Message, {
    onDelete: "cascade",
    hooks: true,
    foreignKey: {
        name: "USERS_id",
        allowNull: false,
    }
}); */
//Message.belongsTo(User);

module.exports = {
    User, Message
}