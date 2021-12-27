const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    email: String,
    name: String,
    age: Number,
    sex: String,
    interestedIn: String,
    city: String,
    preferences: Array,
    possibleMatches: Array,
    matches: Array
})

const profile = mongoose.model('profileDetails', profileSchema)

module.exports = profile 
