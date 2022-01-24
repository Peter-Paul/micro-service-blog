var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const {
    getAllPhotos, 
    postPhoto,
    getPhoto,
} = require('../../db/photoDB')
const {
    photoSchema,
} = require('../../schemas/photoType')
const {
    authenticateToken,
    photoAvailable
} = require('../../utils/authentication')

// get all users
router.get('/', async (req, res,next) => {
    try{
        let data = await getAllPhotos()
        res.status(200).json({data});  
    }catch(err){
        res.status(500).json({err})
    }
    next()
});

// create a new user
router.post('/',  async (req,res,next)=>{ 
    const request = req.body
    const {error} = await photoSchema.validate(request) 
    if (error){
        res.status(400).json({error})
    }else{
        const data = {...request,
            id:uuidv4()}
        try{
            await postPhoto(data)
            res.status(201).json({message:'Post Successful'});  
        }catch(err){
            res.status(500).json({err})  
        }
    }
    next()
})

module.exports = router;