// Clustering implemented

const express = require('express')
const app = express()
const cors = require("cors")
const photosRouter = require('./routes/photos/photos')
const cluster = require("cluster")
const os = require("os")
const sp = require('./utils/showPort')

// environment varialbles
const port=process.env.PORT || 5003

// middleware
// app.use(cors())
app.use(express.json())
const killWorker =  (res,req,next) => { 
    // middleware to kill cluster worker on request completion
    cluster.worker.kill()
    console.log(cpid)
    next()
}

// routes
app.use('/photos2', sp, photosRouter,killWorker);

// create clusters
const noc = os.cpus().length // number of cpus/processors
const cpid = process.pid

if (cluster.isMaster){
    for (let i=0; i<noc; i++){
        cluster.fork()
    }
    cluster.on("exit", (worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} died`)
        cluster.fork()
    })
}else{
     app.listen(port, ()=>console.log(`CPU @ ${cpid} Node server running on ${port}`))
}
