const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const MessageModel = require('../models/comment');

require('dotenv').config();

const sequelize = new Sequelize(
    'Projet7',
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