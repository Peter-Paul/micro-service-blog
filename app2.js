const express = require('express')
const app = express()
const cors = require("cors")
const postsRouter = require('./routes/blog/posts')

// environment varialbles
const port=process.env.PORT || 5001

// middleware
app.use(express.json())
// app.use(cors())

// routes
app.use('/posts', postsRouter);

// serve app
app.listen(port, ()=>console.log(`Node server running on ${port}`))