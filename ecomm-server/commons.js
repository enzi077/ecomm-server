// const express=require('express')
const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = "mongodb+srv://prateek_user:f2I4U55GDwSiWcn3@cluster0.fhmpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client= new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
const db=client.db("vue_express")

module.exports = {client,db}