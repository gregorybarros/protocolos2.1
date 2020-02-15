const express = require('express')
const Client = require('../models/Client')


const router = express.Router()


router.get('/', async (req,res) => {

    try {
        const clients = await Client.find ().sort({name:1})
        res.send(clients)
    }
    catch (err) {
        res.status(400).send({error:"Erro ao listar clientes!"})

    }  
      
})

router.get('/:id', async (req, res) => {

    const { id } = req.params

    try {
        const FindClient = await Client.findOne({ _id: req.params.id })

        return res.send(FindClient)
    } catch (err) {

        res.status(400).send('Cliente nao encontrado'+err)

    }

})

router.post('/addclient', async (req, res) => {
   
    const { name, slug } = req.body
    let errors = []

    if(!req.body.name || req.body.name.length < 2 || typeof req.body.name == undefined || req.body.name == null) {
        errors.push({message: "Nome invalido"})
    }
    
    if(!req.body.slug || req.body.slug.length < 2 || typeof req.body.slug == undefined || req.body.slug == null) {
        errors.push({message: "Slug invalido"})
    }

    if(errors.length > 0) {
        res.send({errors})
    }

        try{
                     
            if(await Client.findOne({ name }))
            return res.status(400).send({message: 'Cliente ja existe'})
                
        
            const newClient = await Client.create(req.body)
            

            return res.send({message:"Cliente criado com sucesso!", newClient})
        }
        catch (err) {

            return res.send({message:"Houve um erro ao salvar cliente!"+err})

        }
    

})

router.put('/edit', async (req, res) => {

    const { name, slug, _id } = req.body


    try {
        let EditClient = await Client.findOne({ _id: req.body._id }).updateOne({

            name: req.body.name,
            slug: req.body.slug
        })
    
        return res.send(EditClient)
    } catch (err) {

        res.status(400).send('Erro ao editar cliente!'+err)
        
    }

})

router.delete('/delete/:id', async (req, res) => {

    const { id } = req.params


    try {
        await Client.findOneAndDelete({ _id: req.params.id })
    
        return res.send('Cliente deletado com sucesso')
    } catch (err) {

        res.status(400).send('Erro ao deletar cliente!'+err)
        
    }

})



module.exports = app => app.use('/clients', router)