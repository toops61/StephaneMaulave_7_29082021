const { Sequelize, DataTypes } = require('sequelize')
//const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
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
    'database_development_retro',
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: true
    }
)


//const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

module.exports = {
    User
}