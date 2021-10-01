const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require('../models/user')
const MessageModel = require('../models/comment')
//const bcrypt = require('bcrypt')

require('dotenv').config()

/* 
let sequelize
if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(
        'default_schema',
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            logging: true
        }
    )
} else { */
const sequelize = new Sequelize(
    'Projet7',
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: true
    }
)

const Message = MessageModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

module.exports = {
    User, Message
}