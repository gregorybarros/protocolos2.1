const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect("mongodb+srv://greg:greg@cluster0-sruem.mongodb.net/beta?retryWrites=true&w=majority", {
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