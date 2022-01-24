
module.exports = (req,res,next) =>{
        console.log(`running on port ${process.env.PORT}`)
        next()
}