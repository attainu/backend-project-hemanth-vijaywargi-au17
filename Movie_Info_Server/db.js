const mongoose = require('mongoose')
let userName = 'MovieDBAdmin'
let password = 'JLwZt9$ZLWgg4md'
let dbName = 'movie_info_database'
let dbUrl = `mongodb+srv://${userName}:${password}@cluster0.l8wld.mongodb.net/${dbName}?retryWrites=true&w=majority`

async function dbInit(){
    await mongoose.connect(dbUrl)
}

module.exports = {
    dbInit
}