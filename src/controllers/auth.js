const express = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')

const generateToken = require('../utils/generateToken')

authConfig = require('../config/auth')


const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { email } = req.body
        if(await Usuario.findOne({ email }))
        return res.status(400).send({error: 'Email ja existe'})

        const user = await Usuario.create(req.body)

        user.senha = undefined

        return res.send({user,token: generateToken({ id: user.id })}) 
    } catch (err) {
        return res.status(400).send({error: 'Falha ao registrar'}+err)
    }
})

router.post('/auth', async (req, res) => {
    const { email, senha} = req.body
    const user = await Usuario.findOne({ email }).select('+senha')

    if (!user)
    return res.status(400).send({error: 'User not found'})

    if(!await bcrypt.compare(senha, user.senha))
    return res.status(400).send({error: 'Invalid password'})

    user.senha = undefined


    res.send({user,token: generateToken({ id: user.id })})
})

module.exports = app => app.use('/auth', router)