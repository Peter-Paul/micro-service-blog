const express = require('express')
const app = express()
const cors = require("cors")
const usersRouter = require('./routes/users/users')
const authRouter = require('./routes/users/login')
const sp = require('./utils/showPort')

// environment varialbles
const port=process.env.PORT || 5002

// middleware
app.use(express.json())
// app.use(cors())

// routes
app.use('/', sp, usersRouter);
app.use('/auth', sp, authRouter)

// serve app
app.listen(port, ()=>console.log(`Node server running on ${port}`))