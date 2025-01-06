const express = require('express')
const app = express()
const UserRoute=require('./Routes/user.route')
const dotenv=require('dotenv')
const connectDB = require('./db');
app.use(express.json());


//connect to database
connectDB();

dotenv.config()


app.use('/api',UserRoute)
const port=process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})