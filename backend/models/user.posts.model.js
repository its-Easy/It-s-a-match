const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    email: String,
    post_date: Array,
    post_url: Array
})

const post = mongoose.model('posts', postSchema)

module.exports = post