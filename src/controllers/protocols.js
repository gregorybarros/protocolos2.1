const express = require('express')
const Protocol = require('../models/Protocol')
const User = require('../models/User')

const {format} = require('date-fns')
const pt = require('date-fns/locale/pt-BR')

const router = express.Router()


router.get('/', async (req, res) => {
console.log(req.query)
    try {
        const {page, perPage, sort} = req.query
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate:['client','user'],
            sort: {createdAt:sort||"desc"}         
        }
        const{filter, equal} = req.query



        await Protocol.paginate({[filter]:equal}, options, function(err, protocols){res.send(protocols)})
            
        
    }
    catch (err) {
        res.status(400).send({ error: "Erro ao listar protocolos!" }+err)

    }

})

router.get('/:id', async (req, res) => {

    const { id } = req.params

    try {
        const FindProtocol = await Protocol.findOne({ _id: req.params.id }).populate(["client","user"])

        return res.send(FindProtocol)
    } catch (err) {

        res.status(400).send('Protocolo nao encontrado' + err)

    }

})

router.post('/addprotocol', async (req, res) => {

    const { title, content, client, num } = req.body

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

            if (await Protocol.findOne({ num }))
                return res.status(400).send({ message: 'Protocolo ja existe' })
            
            const date = format(new Date, "dd/MM/yy 'às' HH:mm", { timeZone:'America/Sao_Paulo', locale:pt })

            const newProtocol = await Protocol.create({
                title:req.body.title,
                content:req.body.content,
                client:req.body.client,
                user:req.body.user,
                date
            })

            await User.updateOne({ _id:req.body.user}, { $inc:{
                totalProt:1
            }})

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

        const findUser = await Protocol.findOne({ _id: id })
        
        await Protocol.findOneAndDelete({ _id: id })

        await User.updateOne({_id:findUser.user}, {$inc:{
            totalProt:-1
        }})

        return res.send('Protocolo deletado com sucesso')
    } catch (err) {

        res.status(400).send('Erro ao deletar protocolo!'+err)
        
    }

})


module.exports = app => app.use('/protocols', router)