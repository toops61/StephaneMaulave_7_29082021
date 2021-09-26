const { Sequelize, DataTypes } = require('sequelize')
//const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
//const pokemons = require('./mock-pokemon')
//const bcrypt = require('bcrypt')

require('dotenv').config()

/* if (process.env.NODE_ENV === 'production') {
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

/* const initDb = () => {
    //return sequelize.sync({ force: true }).then(_ => {
    return sequelize.sync().then(_ => {
        users.map(user => {
            User.create({
                //name: pokemon.name
                lastname: 'nom',
                firstname: 'prenom',
                pseudo: 'bidule',
                birthdate: '1965-07-16',
                job: 'web_dev',
                email: 'utilisateur1@mail.com',
                password: 'OpenClassrooms69%'
            }).then(user => console.log(user.toJSON()))
        })

        bcrypt.hash('pikachu', 10)
            .then(hash => User.create({ username: 'pikachu', password: hash }))
            .then(user => console.log(user.toJSON()))

        console.log('La base de donnée a bien été initialisée !')
    })
} */

module.exports = {
    User
}