var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const {
    getAllUserTokens,
    postUserToken,
    deleteUserTokens,
} = require('../../db/userDB')
const {
    authenticate, 
    createSigniture,
} = require('../../utils/authentication')
const {
    jwtSchema
} = require('../../schemas/userType')


router.post('/token_refresh', async (req, res) => {
    const refreshToken = req.body.rtoken
    if (refreshToken == null) return res.status(401).json({message:'No Token Provided'}) // unauthorized
    var rTokens
    try{
        rTokens = await getAllUserTokens()
    }catch(err){
        res.status(500).json({err})
    }
    rTokens=rTokens.map(rt=>{ return rt.token })
    if (!rTokens.includes(refreshToken)) return res.status(403).json({message:'You dont have access to this data'})
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({message:'You dont have access to this data'})
      const {iat,...payload}=user // extract payload / remove iat from user object 
      const at = createSigniture(payload)
      res.status(200).json({ at })
    })
  })

router.post('/login', authenticate, async (req,res)=>{
    var payload = req.body
    const {error} = await jwtSchema.validate(payload)
    if (error) return res.status(400).json({message:'Must send username and password'}) // Bad request
    payload={...payload,id:req.user.id} // In the event we need to do cacheing later on
    const at = createSigniture(payload)
    const rt = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET)
    const toDB = {key:rt,id:payload.id}
    const tokens = {at,rt}
    // save tokens to database if not already stored
    try{
        await postUserToken(toDB)
        res.status(200).json({tokens})
    }catch(err){
        if (err.code==='ER_DUP_ENTRY'){
            // if already found refresh, remove it and post new refresh token
            await deleteUserTokens(payload.id) // delete tokens associated with this user
            await postUserToken(toDB)
            res.status(200).json({tokens})
        }else res.status(500).json({err})
    }
})

module.exports = router;
