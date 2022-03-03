const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username: {
        unique: true,
        type: String
    },
    email: {
        unique: true,
        type: String
    },
    password: String,
    contact: String,
    address: String,
    shortlist: Array,
    cart: Array
})

const User = mongoose.model('users', userSchema)

module.exports = User
