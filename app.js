const express = require('express')
const app = express()
const usersRouter = require('./routes/users/users')
const authRouter = require('./routes/users/login')

// middleware
app.use(express.json())

// routes
app.use('/users', usersRouter);
app.use('/auth', authRouter)

const PORT=process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`Node server running on ${PORT}`))