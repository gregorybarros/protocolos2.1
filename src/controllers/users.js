const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Usuario = require('../models/Usuario')

const router = express.Router()

router.use(authMiddleware)

router.get('/', async (req, res) => {

    try {
        const users = await Usuario.find ().sort({nome:1})
        res.send(users)
    }
    catch (err) {
        res.status(400).send({error:"Erro ao listar usuarios!"})

    }  
      
})

module.exports = app => app.use('/users', router)