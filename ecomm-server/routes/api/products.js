const express=require('express')
const { ObjectId } = require('mongodb')
const {client,db} = require('../../commons')

const router=express.Router()

//get all products from server
router.get('/', async(req,res)=>{
    const products = await loadProducts()
    res.status(200).send(await products.find({}).toArray())
})

//update count of products
router.put('/', async(req,res)=>{
    const products = await loadProducts()
    for(let item in req.body) {
        await products.updateOne(
            {id: req.body[item].id},
            {$set: {rating: req.body[item].mongoUpd}}
        )
    }
    res.status(200).send(await products.find({}).toArray())
})

//get all categories from server
router.get('/categories', async(req,res)=>{
    const categories = await loadCategories()
    res.send(await categories.find({}).toArray())
})

//get a particular product
router.get('/:id', async(req,res)=>{
    const products = await loadProducts()
    res.send(await products.findOne({_id: ObjectId(req.params.id)}))
})

//get products of a particular category
router.get('/category/:categoryName', async(req,res)=>{
    const catProd = await loadProducts()
    res.send(await catProd.find({category: req.params.categoryName}).toArray())
})


async function loadProducts () {
    try {
        await client.connect()
        return db.collection("products")
    } catch {
        console.log('error')
    }
}

async function loadCategories () {
    try {
        await client.connect()
        return db.collection("categories")
    } catch {
        console.log('error')
    }
}

module.exports=router
