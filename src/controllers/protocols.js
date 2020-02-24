const express = require('express')
const Protocol = require('../models/Protocol')



const router = express.Router()


router.get('/', async (req, res) => {
console.log('ALguem entrou')
    try {
        const {page, perPage} = req.query
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate:'client'
        }
        await Protocol.paginate({}, options, function(err, protocols){res.send(protocols)})
            
        
    }
    catch (err) {
        res.status(400).send({ error: "Erro ao listar protocolos!" }+err)

    }

})

router.get('/:id', async (req, res) => {

    const { id } = req.params

    try {
        const FindProtocol = await Protocol.findOne({ _id: req.params.id }).populate("client")

        return res.send(FindProtocol)
    } catch (err) {

        res.status(400).send('Protocolo nao encontrado' + err)

    }

})

router.post('/addprotocol', async (req, res) => {
console.log(req.body)

    const { title, content, client } = req.body

    let errors = []

    if (!req.body.client || req.body.client.length < 2 || typeof req.body.client == undefined || req.body.client == null) {
        errors.push({ message: "Cliente invalido" })
    }

    if (!req.body.title || req.body.title.length < 2 || typeof req.body.title == undefined || req.body.title == null) {
        errors.push({ message: "Titulo invalido" })
    }

    if (!req.body.content || req.body.content.length < 2 || typeof req.body.content == undefined || req.body.content == null) {
        errors.push({ message: "Conteudo invalido" })
    }

    if (errors.length > 0) {

        res.status(400).send({ errors })
    } else

        try {

            if (await Protocol.findOne({ title }))
                return res.status(400).send({ message: 'Protocolo ja existe' })


            const newProtocol = await Protocol.create(req.body)


            return res.send({ message: "Protocolo criado com sucesso!", newProtocol })
        }
        catch (err) {

            return res.send({ message: "Houve um erro ao salvar protocolo!" + err })

        }


})

router.put('/edit', async (req, res) => {

    try {
        let EditProtocol = await Protocol.findOne({ _id: req.body._id }).updateOne({

            title: req.body.title,
            content: req.body.content,
            client: req.body.client
        })
    
        return res.send(EditProtocol)
    } catch (err) {

        res.status(400).send('Erro ao editar protocolo!'+err)
        
    }

})

router.delete('/delete/:id', async (req, res) => {

    const { id } = req.params


    try {
        await Protocol.findOneAndDelete({ _id: id })
    
        return res.send('Protocolo deletado com sucesso')
    } catch (err) {

        res.status(400).send('Erro ao deletar protocolo!'+err)
        
    }

})


module.exports = app => app.use('/protocols', router)