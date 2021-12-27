const router = require('express').Router()
const post = require('../models/user.posts.model')

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

//IMAGE UPLOAD CONFIGURATION
const multer = require("multer");
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });

router.route('/').post(upload.single("image"), (req, res) => {
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
        if (err) {
          req.json(err.message);
        }
        req.body.image = result.secure_url;
        // add image's public_id to image object
        req.body.imageId = result.public_id;
        console.log(req.body);
        var data=new post({
          email: req.body.email, 
          post_url: req.body.image
        })
        data.save()
      });
})

module.exports=router