const express = require('express')
const authMiddleware = require('../middlewares/auth')
const User = require('../models/User')

const router = express.Router()

//router.use(authMiddleware)

router.get('/', async (req, res) => {

    try {
        const users = await User.find().sort({createdAt:'desc'})
        res.send(users)
    }
    catch (err) {
        res.status(400).send({error:"Erro ao listar usuarios!"})

    }  
      
})

router.get('/:id', async (req, res) => {

    const { id } = req.params

    try {
        const FindUser = await User.findOne({ _id: req.params.id })

        return res.send(FindUser)
    } catch (err) {

        res.status(400).send('Usuario nao encontrado'+err)

    }

})

router.put('/edit', async (req, res) => {
console.log(req.body)
    try {
        let EditUser = await User.findOneAndUpdate({ _id: req.body._id }, req.body)

        return res.send(EditUser)
    } catch (err) {

        res.status(400).send('Erro ao editar usuario!'+err)
        
    }

})

router.delete('/delete/:id', async (req, res) => {

    const { id } = req.params


    try {
        await User.findOneAndDelete({ _id: req.params.id })
    
        return res.send('Usuario deletado com sucesso')
    } catch (err) {

        res.status(400).send('Erro ao deletar usuario!'+err)
        
    }

})

module.exports = app => app.use('/users', router)