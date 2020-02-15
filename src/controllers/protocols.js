const express = require('express')
const Protocol = require('../models/Protocol')


const router = express.Router()


router.get('/', async (req,res) => {

    try {
        const protocols = await Protocol.find ().populate("client").sort({createdAt:"desc"})
        console.log(protocols)
        res.send(protocols)
    }
    catch (err) {
        res.status(400).send({error:"Erro ao listar protocolos!"})

    }  
      
})


router.post('/addprotocol', async (req, res) => {   


        const { title, content, client } = req.body

        let errors = []
    
        if(!req.body.client || req.body.client.length < 2 || typeof req.body.client == undefined || req.body.client == null) {
            errors.push({message: "Cliente invalido"})
        }

        if(!req.body.title || req.body.title.length < 2 || typeof req.body.title == undefined || req.body.title == null) {
            errors.push({message: "Titulo invalido"})
        }

        if(!req.body.content || req.body.content.length < 2 || typeof req.body.content == undefined || req.body.content == null) {
            errors.push({message: "Conteudo invalido"})
        }
    
        if(errors.length > 0) {

            res.status(400).send({errors})
        } else
    
            try{
                         
                if(await Protocol.findOne({ title }))
                return res.status(400).send({message: 'Protocolo ja existe'})
                    
                
                const newProtocol = await Protocol.create(req.body)

    
                return res.send({message:"Protocolo criado com sucesso!", newProtocol})
            }
            catch (err) {
    
                return res.send({message:"Houve um erro ao salvar protocolo!"+err})
    
            }
        
    
    })


module.exports = app => app.use('/protocols', router)