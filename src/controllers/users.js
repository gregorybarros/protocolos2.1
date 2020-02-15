const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Usuario = require('../models/Usuario')

const router = express.Router()

//router.use(authMiddleware)

router.get('/', async (req, res) => {

    try {
        const users = await Usuario.find ().sort({nome:1})
        res.send(users)
    }
    catch (err) {
        res.status(400).send({error:"Erro ao listar usuarios!"})

    }  
      
})

router.get('/:id', async (req, res) => {

    const { id } = req.params

    try {
        const FindUser = await Usuario.findOne({ _id: req.params.id })

        return res.send(FindUser)
    } catch (err) {

        res.status(400).send('Usuario nao encontrado'+err)

    }

})

router.put('/edit', async (req, res) => {

    try {
        let EditUser = await Usuario.findOne({ _id: req.body._id }).updateOne({

            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            cidade: req.bodycidade,
            cep: req.body.cep,
            endereco: req.body.endereco,
            estado:req.body.estado,
            senha: req.body.senha,
            dataNas: req.body.dataNas,
            dataAdm: req.body.dataAdm,
            sexo: req.body.sexo
        })
        console.log(EditUser)
        return res.send(EditUser)
    } catch (err) {

        res.status(400).send('Erro ao editar usuario!'+err)
        
    }

})

router.delete('/delete/:id', async (req, res) => {

    const { id } = req.params


    try {
        await Usuario.findOneAndDelete({ _id: req.params.id })
    
        return res.send('Usuario deletado com sucesso')
    } catch (err) {

        res.status(400).send('Erro ao deletar usuario!'+err)
        
    }

})

module.exports = app => app.use('/users', router)