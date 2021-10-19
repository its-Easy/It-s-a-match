const router = require('express').Router()
const crypto = require('crypto')

let user = require('../models/user.auth.model')

router.route('/').post((req, res) => {
    const userName = req.body.email
    const md5sum = crypto.createHash('md5')
    const userPassword = md5sum.update(req.body.password).digest('hex')

    user.findOne({email: userName}, {password: 1}).
       then(storedPassword => {
           if(userPassword==storedPassword.password) res.json("true")
           else res.json("false")
       })
})

module.exports = router