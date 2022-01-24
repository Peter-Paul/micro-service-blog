// Load balancing and caching implemented

const express = require('express')
const app = express()
const cors = require("cors")
const photosRouter = require('./routes/photos/photos')
const sp = require('./utils/showPort')

// environment varialbles
const port=process.env.PORT || 5004

// middleware
// app.use(cors())
app.use(express.json())


// routes
app.use('/photos3', sp, photosRouter);

// listen
app.listen(port, ()=>console.log(`Node server running on ${port}`))