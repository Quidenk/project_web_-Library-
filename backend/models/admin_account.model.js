const mongoose = require('mongoose')
const generate = require('../helpers/generateString');

const adminsSchema = new mongoose.Schema(
{
    username: String,
    password: String,
    adminID: {
        type: String,
        default: generate.generateRandomString(30)
    },
    fullname: String,
    gender: Boolean,
    position: String,
    phone: Number,
    email: String,
    address: String,
},
{ timestamps: true })

const Admins = mongoose.model("Admins", adminsSchema, 'admins');

module.exports = Admins;