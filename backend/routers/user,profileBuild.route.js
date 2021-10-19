const router = require('express').Router()

let profile = require('../models/user.profile.model')

router.route('/').post((req, res) => {
    const name=req.body.name;
    const dob=req.body.dob
    const city=req.body.city
    
    const newProfile= new profile({username: req.body.username, name:name,dob: dob, city: city})
})

module.exports = router