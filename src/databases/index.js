const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/apirest", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,

}).then(() => {
    console.log('MongoDB Conectado...')
}).catch((err) => {
    console.log('Houve um erro ao se conectar ao MongoDB:'+err)
})

module.exports = mongoose