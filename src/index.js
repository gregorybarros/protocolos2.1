const express = require('express')
const cors = require('cors')
require('./databases/index')

const app = express()


app.use(express.json())
app.use(cors())
require('./controllers/auth')(app)
require('./controllers/users')(app)

// Porta servidor
app.listen(3000, () => {
    console.log('Servidor rodando!')
})