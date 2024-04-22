const mongoose = require('mongoose')
const bookId = require('../helpers/createBookId')

const booksSchema = new mongoose.Schema(
{   
    book_id: {
      type: String,
      default: bookId.bookIdString(30),
    },
    bookname: String,
    quantily: Number,
    stock: Number,
    thumbnail: String,
    author: String,
    publisher: String,
    description: String,
},
  { timestamps: true }
)

const Books = mongoose.model("Books", booksSchema, "books");

module.exports = Books;