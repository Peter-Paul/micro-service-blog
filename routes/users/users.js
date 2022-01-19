var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const {
    getAllUsers,
    postUser,
    deleteUser,
    patchUser,
    getUser
} = require('../../db/userDB')
const {
    userAvailable,
    authenticateToken
} = require('../../utils/authentication')
const {
    userSchema,
} = require('../../schemas/userType')

// get all users
router.get('/', async (req, res) => {
    try{
        let data = await getAllUsers()
        res.status(200).json({data});  
    }catch(err){
        res.status(500).json({err})
    }
});

// create a new user
router.post('/',  async (req,res)=>{ 
    const request = req.body
    const {error} = await userSchema.validate(req.body)
    if (error){
        res.status(400).json({error})
    }else{
        const salt = await bcrypt.genSalt(10)
        const data = {...request,
                        id:uuidv4(),
                        password:await bcrypt.hash(request.password,salt)}
        try{
            await postUser(data)
            res.status(201).json({message:'Post Successful'});  
        }catch(err){
            res.status(500).json({err})  
        }
    }
})

// get specific user
router.get('/:id', authenticateToken, async (req, res) => {
    // req now has user property added from token authentication
    var id = req.params.id
    const user = await userAvailable(id,undefined)
    if (user){
        try{
            const data = await getUser(id)
            res.json(data);  
        }catch(err){
            res.status(500).json({err})  
        }
    }else{
        res.status(404).json({message:'User Not Found'})
    }
})

// patch/update specific user
router.patch('/:id', authenticateToken, async(req,res)=>{
    // req now has user property added from token authentication
    var id = req.params.id
    if (req.user.id==id){
        const user = await userAvailable(id,undefined)
        if (user){
            try{
                await patchUser(id,req.body)
                res.status(200).json({message:'Patch Successful'});  
            }catch(err){
                res.status(500).json({err})  
            }
        }else{
            res.status(404).json({message:'User Not Found'})
        }
    }else res.status(403).json({message:'Invalid user'})
})

// delete specific user
router.delete('/:id', authenticateToken, async(req,res)=>{
    var id = req.params.id
    const user = userAvailable(id,undefined)
    if (user){
        try{
            await deleteUser(id)
            res.send('Delete Successful');  
        }catch(err){
            res.status(500).json({err})  
        }
    }else{
        res.status(404).json({message:'User Not Found'})
    }
})

module.exports = router;