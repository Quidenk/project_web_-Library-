const express = require('express')
const asyncHandler = require("express-async-handler")
const Books = require('../../models/books.model')
const fs = require('fs');


module.exports.create = asyncHandler(async (req, res) =>{
    // res.status(200).json({message: "connect successfull! POST."})
    try {
        const book = await Books.create({
            ...req.body,
            thumbnail: req.file ? req.file.filename : null
        });
        res.status(200).json({message: `Thêm sách thành công!`, book});
    } catch(err) {
        res.status(500).json({message: `Error! ${err}`});
    }
})

module.exports.findAll = asyncHandler(async (req, res) =>{
    // res.status(200).json({message: "connect successfull! GET-ALL."})
    try {
        const books = await Books.find({});
        res.status(200).json(books);
    } catch(err) {
        res.status(500).json({error: err })
    }
})

module.exports.find = asyncHandler(async (req, res) =>{
    // res.status(200).json({message: "connect successfull! GET-ALL."})
    try {
        const book = await Books.findById(req.params.id)
        if (!book) {
            res.status(404).json({message: `Can not find book with ID: ${req.params.id}` });
        }
        res.status(200).json(book);
    } catch(err) {
        res.status(500).json({error: err });
    }
})

module.exports.update = asyncHandler(async (req, res) => {
    // res.status(200).json({message: "connect successfull! GET-ALL."})
    try {
        const book = await Books.findById(req.params.id);
        if (!book){
            res.status(404).json({message: `ID: ${req.params.id} không tồn tại sách.`});
        }

        if (req.file) {
            if(book.thumbnail) {
                const imgPath = path.join(__dirname, '..', 'uploads', book.thumbnail);
                fs.unlink(imgPath, (err) => {
                    if (err) {
                        console.error(`Xóa tệp ânhr không thành công: ${err}`);
                    } else {
                        console.log(`Xóa ảnh thành công: ${book.thumbnail}`);
                    }
                })
            }
        }

        const data = {
            ...req.body,
            thumbnail: req.file ? req.file.filename : book.thumbnail
        }
        const newBook = await Books.findByIdAndUpdate(req.params.id, data)
        res.status(200).json({message: `Cập nhật thành công.`, newBook})
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports.deleteAll = asyncHandler(async (req, res) => {
    try{
        const clear = await Books.deleteMany({})
        res.status(200).json({message: `Đã xóa ${clear.deletedCount} quyển sách.`})    
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports.delete = asyncHandler(async (req, res) => {
    try{
        const clearBook = await Books.findByIdAndDelete(req.params.id)
        res.status(200).json({message: `Đã xóa sách có ID: ${req.params.id}`})
    } catch(err) {
        res.status(500).json(err);
    }
})