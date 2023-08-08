
require('dotenv').config()
const express = require('express')
const workoutRoutes =require('./routes/workout')
const userRoutes =require('./routes/user')
const mongoose = require('mongoose')
//express app
const app = express()

//middleware
app.use(express.json())
app.use((req,res,next)=> {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workout',workoutRoutes)
app.use('/api/user',userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to dattabase')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
//listen for request 

// app.listen(process.env.PORT, ()=>{
//     console.log('listening on port', process.env.PORT)
// })
// process.env
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
