const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://saral:saral@cluster0.uxu98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const signInRouter = require('./routers/user.signIn.route')
const signUpRouter = require('./routers/user.signUp.route')
// const buildProfileRouter = require('./routers/user,profileBuild.route')
const newsFeedRouter = require('./routers/newsFeed.route')

app.use('/sign-in', signInRouter)
app.use('/sign-up', signUpRouter)
// app.use('/build-profile', buildProfileRouter) 
app.use('/news', newsFeedRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
