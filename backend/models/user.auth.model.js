const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    password: String
})

const user = mongoose.model('userDetails', userSchema)

module.exports = user 