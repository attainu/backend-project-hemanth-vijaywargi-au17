const mongoose = require('mongoose')
let userName = process.env.DB_USER
let password = process.env.DB_PASS
let dbName = process.env.DB_NAME
let dbUrl = `mongodb+srv://${userName}:${password}@cluster0.l8wld.mongodb.net/${dbName}?retryWrites=true&w=majority`
async function dbConnect(){
    await mongoose.connect(dbUrl)
}

module.exports = {
    dbConnect
}