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
    console.log(req.body)
    const { code, name, category, resp, email, adress, city, zip, state, since, obs, soft } = req.body
    let errors = []

    if(!code || code.length <= 0 || typeof code == undefined || code == null) {
        errors.push({message: "Codigo invalido"})
    }

    if(!name || name.length < 2 || typeof name == undefined || name == null) {
        errors.push({message: "Nome invalido"})
    }   

    if(!category || category.length < 2 || typeof category == undefined || category == null) {
        errors.push({message: "Categoria invalido"})
    }
    
    if(!resp || resp.length < 2 || typeof resp == undefined || resp == null) {
        errors.push({message: "Nome responsavel invalido"})
    }

    if(!adress || adress.length < 2 || typeof adress == undefined || adress == null) {
        errors.push({message: "Endereço invalido"})
    }

    if(!city || city.length < 2 || typeof city == undefined || city == null) {
        errors.push({message: "Cidade invalido"})
    }

    if(!state || state.length < 2 || typeof state == undefined || state == null) {
        errors.push({message: "Estado invalido"})
    }

    if(!since || since.length < 2 || typeof since == undefined || since == null) {
        errors.push({message: "Data invalida"})
    }

    if(!soft || soft.length < 2 || typeof soft == undefined || soft == null) {
        errors.push({message: "Software invalido"})
    }

    if(errors.length > 0) {
        res.send({errors})
    }

        try{
                     
            if(await Client.findOne({ name, code }))
            return res.status(400).send({message: 'Cliente ja existe'})
                
        
            const newClient = await Client.create(req.body)
            console.log(newClient)

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