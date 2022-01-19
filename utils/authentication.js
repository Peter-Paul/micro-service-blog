require('dotenv').config()
const {
    getAllUsers
} = require('../db/userDB')
const{
    getAllPosts
} = require('../db/blogDB')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userAvailable = async (id,username) =>{
    try{
        var users = await getAllUsers()
        return users.find(user=>(user.id===id || user.username===username))
    }catch(err){
        console.log('DB error',err)
        return undefined
    }
}
const postAvailable = async (postid) => {
    try{
        var posts = await getAllPosts()
        return posts.find(post=>post.id===postid)
    }catch(err){
        console.log('DB error',err)
        return undefined
    }
}

const createSigniture = (user) => {
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'180s'}) //3 minute expiry 
}

const authenticate = async ( req,res,next) =>{ // middleware only for users route
    var {username,password} = req.body // payload
    const user = await userAvailable(undefined,username)
    if (user){
        if (await bcrypt.compare(password,user.password)){
             req.user=user
             next()
        }else res.status(400).json({message:'Wrong Password'})
    }else res.status(400).json({message:'Invalid User'})// undefined  
}

const authenticateToken = (req,res,next) => { // middleware for any route group because it doesn't access any database
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({message:'No Token Provided'})
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({message:'Invalid Token'})
        req.user = user // creates new property 'user' on req object
        next()
      })
}



module.exports={userAvailable,postAvailable,authenticate,authenticateToken,createSigniture}