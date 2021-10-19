const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    email: String,
    name: String,
    city: String,
    possibleMatches: Array,
    matches: Array
})

const profile = mongoose.model('profileDetails', profileSchema)

module.exports = profile 