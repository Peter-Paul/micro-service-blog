const express = require('express')
const app = express()
const cors = require("cors")
const usersRouter = require('./routes/users/users')
const authRouter = require('./routes/users/login')

// environment varialbles
const port=process.env.PORT || 5002

// middleware
app.use(express.json())
// app.use(cors())

// routes
app.get('/', (req,res)=>{
    res.status(200).send({message:`Welcome to the admin working at ${port}...`})
})
app.use('/users', usersRouter);
app.use('/auth', authRouter)

// serve app
app.listen(port, ()=>console.log(`Node server running on ${port}`))