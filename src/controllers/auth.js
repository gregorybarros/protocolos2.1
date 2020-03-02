const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const generateToken = require('../utils/generateToken')

authConfig = require('../config/auth')


const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { email } = req.body

        if(await User.findOne({ email }))
        return res.status(400).send({error: 'Email ja existe'})

        const user = await User.create(req.body)
        console.log(user)
        user.senha = undefined

        return res.send({user,token: generateToken({ id: user.id })}) 
    } catch (err) {
        return res.status(400).send({error: 'Falha ao registrar'}+err)
    }
})

router.post('/auth', async (req, res) => {
    console.log(req.body)
    try {

        const { email, password} = req.body
    const user = await User.findOne({ email }).select('+password')

    if (!user)
    return res.status(400).send({error: 'User not found'})

    if(!await bcrypt.compare(password, user.password))
    return res.status(400).send({error: 'Invalid password'})

    user.password = undefined


    res.send({user,token: generateToken({ id: user.id })})

    } catch (err){
        console.log(err)
    }
    
})

module.exports = app => app.use('/auth', router)