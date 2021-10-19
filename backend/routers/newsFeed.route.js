const router = require('express').Router()
let profile = require('../models/user.profile.model')
const posts =  require('../models/user.posts.model')

router.route('/').post((req, res) => {
    const activeUser=req.body.email
    const fetchPosts=[]
    var cnt=0

    profile.findOne({email: activeUser}, {_id: 0, matches:1})
        .then(matches => {

            for(var i=0;i<matches.matches.length;i++) {
                posts.findOne({email: matches.matches[i]})
                    .then(post => {
                        if(post != null)
                        fetchPosts.push(post)
                        if(cnt===i-1) {
                            // console.log(fetchPosts)
                            res.send(fetchPosts)
                        }
                        cnt++
                    })
                    .catch(err => console.log(err))
            }

        })
        .catch(err => res.status(400).json(err))
})

module.exports = router