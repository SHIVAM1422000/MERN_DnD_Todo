const express = require('express')
const app=express()
const port=5001
const taskRoutes = require('./routes/tasks') 
const connectDB=require('./db/connection')
require('dotenv').config()

var cors = require('cors');
app.use(cors());
app.use(express.static('../client/build'))

//middlewares
app.use(express.json())

//routes setup
app.use('/api/v1/tasks',taskRoutes)


const start = async()=> {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log("Server Started Port: " , port))
    } catch (error) {
        console.log(error)    
    }
}


start()




