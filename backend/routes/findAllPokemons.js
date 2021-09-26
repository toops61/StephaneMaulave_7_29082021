const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {
        const name = req.query.name
        if (name) {
            const limitList = req.query.limit ? JSON.parse(req.query.limit) : 5

            if (name.length < 2) {
                return res.status(400).json('La recherche doit contenir au moins deux caractères')
            }

            return Pokemon.findAndCountAll({
                where: {
                    name: { // 'name' est la propriété du modèle pokémon
                        [Op.like]: '%' + name + '%' // 'name' est le critère de la recherche : Op.eq, eq siginifie "exact query"
                    }
                },
                order: [
                    ['name', 'DESC']
                ],
                limit: limitList
            })
                .then(({ count, rows }) => {
                    if (count === 0) {
                        const message = 'Il n\'y a pas de pokemon qui corresponde au terme de recherche.'
                        res.json({ message })
                    } else if (count === 1) {
                        const message = 'Il n\'y a qu\'un pokemon qui corresponde au terme de recherche : ' + name + '.'
                        res.json({ message, data: rows })
                    } else if (count > limitList) {
                        const message = 'Il y a ' + count + ' pokemons qui correspondent au terme de recherche ' + name + ', en voici ' + limitList + '.'
                        res.json({ message, data: rows })
                    } else {
                        const message = 'Il y a ' + count + ' pokemons qui correspondent au terme de recherche.'
                        res.json({ message, data: rows })
                    }
                })
        } else {
            const limitList = req.query.limit ? JSON.parse(req.query.limit) : null
            Pokemon.findAndCountAll({ order: [['name', 'DESC']], limit: limitList })
                .then(pokemons => {
                    const message = limitList != null ? 'La liste des pokémons a bien été récupérée, en voici ' + limitList + '.' : 'La liste des pokémons a bien été récupérée.'
                    res.json({ message, data: pokemons })
                })
                .catch(error => {
                    const message = 'La liste n\'a pas pu être récupérée. Réessayez dans quelques instants.'
                    res.status(500).json({ message, data: error })
                })
        }
    })
}