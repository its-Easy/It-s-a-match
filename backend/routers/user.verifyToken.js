const router = require('express').Router()
let user = require('../models/user.auth.model')

router.route('/verify-token/').post((req, res) => {
    const token=req.body.token
    console.log("finding "+token)
    user.findOne({email: token}, {password: 1}).
        then(result => {
            res.json(result)
        }).
        catch(err=>res.json(err))
})

module.exports = router