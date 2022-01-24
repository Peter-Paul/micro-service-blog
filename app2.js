const express = require('express')
const app = express()
const cors = require("cors")
const postsRouter = require('./routes/blog/posts')
const sp = require('./utils/showPort')

// environment varialbles
const port=process.env.PORT || 5001

// middleware
app.use(express.json())
// app.use(cors())

// routes
app.use('/posts', sp, postsRouter);

// serve app
app.listen(port, ()=>console.log(`Node server running on ${port}`))