const express = require('express')
const app = express()
const postsRouter = require('./routes/blog/posts')

// middleware
app.use(express.json())

// routes
app.use('/posts', postsRouter);

const PORT=process.env.PORT || 5001

app.listen(PORT, ()=>console.log(`Node server running on ${PORT}`))