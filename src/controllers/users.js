const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Usuario = require('../models/Usuario')

const router = express.Router()

router.use(authMiddleware)

router.get('/', async (req, res) => {
    const user = await Usuario.findOne ({_id: req.userId})
    res.send({ok:true, user:req.userId, nome:user.nome})
})

module.exports = app => app.use('/users', router)