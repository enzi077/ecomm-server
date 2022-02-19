const express=require('express')
const bcrypt=require('bcrypt')
const User=require('../../../models/User')
const {db,client} = require('../../commons')

const router=express.Router()

router.post('/', async(req,res)=>{
    const newUser=new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    const users=await loadUsers()
    res.status(200).send(await users.insertOne(newUser))
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
