const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { ObjectId } = require('mongodb')
const {client,db}=require('../../commons')

const router=express.Router()

router.post('/', async(req,res)=>{
    const user = await loadUsers()
    let foundUser=await user.findOne({username: req.body.username})
    if(!foundUser){
        res.status(500).json({
            title: 'Not found',
            error: 'User not found'
        })
    }
    // checking password correct or not
    if(!bcrypt.compareSync(req.body.password, foundUser.password)){
        res.status(500).json({
            title: 'Wrong password',
            error: 'wrong password'
        })
    }
    let token=jwt.sign({userId: foundUser._id}, 'secretkey')
    if(token) {
        res.status(200).send({token})
    }
})

router.get('/user', async(req,res)=>{
    const users= await loadUsers()
    let token=req.headers.token
    jwt.verify(token, 'secretkey',async(err, decoded)=>{
        if(err) {
            res.status(401).json({
                title: 'Error'
            })
        }
        res.status(200).send(await users.findOne({_id: ObjectId(decoded.userId)}))
    })
})


async function loadUsers () {
    try {
        await client.connect()
        return db.collection("users")
    } catch {
        console.log('error')
    }
}

module.exports=router
