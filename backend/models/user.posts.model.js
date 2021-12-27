const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    email: String,
    post_url: String]
}, {timestamps: true})

postSchema.index({createdAt:1}, {expireAfterSeconds: 86400})
const post = mongoose.model('posts', postSchema)

module.exports = post
