const mongoose = require('mongoose')
const generate = require('../helpers/generateString');

const usersSchema = new mongoose.Schema(
{
    token: {
        type: String,
        default: generate.generateRandomString(30)
    },
    fullname: String,
    username: String,
    email: String,
    password: String,
    address: String,
    phone: Number,
    gender: Boolean,
    position: {
        type: Boolean,
        default: false,
    },
    borrow: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'books',
        },

        quantily: {
            type: Number,
            default: 1,
        },

        status: {
            type: String,
            default: 'not yet',
        }
    }],

    favorite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',
    }],
},
{ timestamps: true })

const Users = mongoose.model("Users", usersSchema, 'users');

module.exports = Users;