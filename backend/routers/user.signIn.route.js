const router = require('express').Router()
const crypto = require('crypto')

let user = require('../models/user.auth.model')

router.route('/').post((req, res) => {
    const userName = req.body.email
    const md5sum = crypto.createHash('md5')
    const userPassword = md5sum.update(req.body.password).digest('hex')

    user.findOne({email: userName}, {password: 1}).
       then(result => {
           if(userPassword==result.password) res.json(result)
           else res.json("false")
       })
})
router.route('/verify-token/').post((req, res) => {
    const token=req.body.token
    user.findOne({_id: token}).
        then(result => {
            res.json(result)
        }).
        catch(err=>res.json(err))
})

module.exports = router
