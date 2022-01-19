var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const {
    getAllPosts, 
    postPost,
    getPost,
    deletePost,
    patchPost
} = require('../../db/blogDB')
const {
    postSchema,
} = require('../../schemas/postType')
const {
    authenticateToken,
    postAvailable
} = require('../../utils/authentication')

// get all users
router.get('/', async (req, res) => {
    try{
        let data = await getAllPosts()
        res.status(200).json({data});  
    }catch(err){
        res.status(500).json({err})
    }
});

// create a new user
router.post('/',  async (req,res)=>{ 
    const request = req.body
    const {error} = await postSchema.validate(request) 
    if (error){
        res.status(400).json({error})
    }else{
        const data = {...request,
            id:uuidv4()}
        try{
            await postPost(data)
            res.status(201).json({message:'Post Successful'});  
        }catch(err){
            res.status(500).json({err})  
        }
    }
})

// get specific post
router.get('/:id', authenticateToken, async (req, res) => {
    // req now has user property added from token authentication
    var id = req.params.id
    const post = await postAvailable(id)
    if (post){
        if (post.user==req.user.id){
            try{
                const data = await getPost(id)
                res.json(data);  
            }catch(err){
                res.status(500).json({err})  
            }
        }else res.status(403).json({message:'Invalid user'})
    }else{
        res.status(404).json({message:'Post Not Found'})
    }
})

// patch/update specific post
router.patch('/:id', authenticateToken, async(req,res)=>{
    // req now has user property added from token authentication
    var id = req.params.id
    const post = await postAvailable(id)
    if (post){
        if (post.user==req.user.id){
            try{
                await patchPost(id,req.body)
                res.status(200).json({message:'Update successful'});  
            }catch(err){
                res.status(500).json({err})  
            }
        }else res.status(403).json({message:'Invalid user'})
    }else{
        res.status(404).json({message:'Post Not Found'})
    }
})

// delete specific user
router.delete('/:id', authenticateToken, async(req,res)=>{
    var id = req.params.id
    const post = await postAvailable(id)
    if (post){
        if (post.user==req.user.id){
            try{
                await deletePost(id)
                res.status(200).json({message:'Delete successful'});  
            }catch(err){
                res.status(500).json({err})  
            }
        }else res.status(403).json({message:'Invalid user'})
    }else{
        res.status(404).json({message:'Post Not Found'})
    }
})


module.exports = router;