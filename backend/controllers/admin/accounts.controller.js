const express = require('express');
const asyncHandler = require("express-async-handler");

const Accounts = require('../../models/user_accounts.model');

module.exports.findAll = asyncHandler(async (req, res) =>{
    try {
        const accounts = await Accounts.find({});
        res.status(200).json(accounts)
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports.findbyid = asyncHandler(async (req, res) =>{
    try {
        const account = await Accounts.findById(req.params.id)
        if(!account) {
            res.status(404).json({message: 'Account không tồn tại.'});
        }
        res.status(200).json(account)
    } catch(err) {
        res.status(500).json(err);
    }
})


module.exports.create = asyncHandler(async (req, res) =>{
    try {
        const account = await Accounts.create(req.body);
        res.status(200).json({message: 'Thêm tài khoản thành công', account}); 
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports.delete = asyncHandler(async (req, res) =>{
    try {
        const acc_del = await Accounts.findByIdAndDelete(req.params.id);
        res.status(200).json({message: `Đã xóa account có ID: ${req.params.id}`});
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports.deleteAll = asyncHandler(async (req, res) =>{
    try {
        const clear = await Accounts.deleteMany({});
        res.status(200).json({message: `Đã xóa tất cả ${clear.deletedCount}`});
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports.update = asyncHandler(async (req, res) =>{
    try {
        const newUser = await Accounts.findByIdAndUpdate(req.params.id, req.body)
        if (!newUser) {
            return res.status(404).json({message: "Tài khoản không tồn tại."});
        }
        res.status(200).json({message: `Đã cập nhật lại thông tin ${newUser.username}`});
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports.updateBorrow = asyncHandler(async (req, res) =>{
    try {
        const newUser = await Accounts.findByIdAndUpdate(req.params.id, req.body)
        if (!newUser) {
            return res.status(404).json({message: "Tài khoản không tồn tại."});
        }
        res.status(200).json({message: `Đã cập nhật lại thông tin ${newUser.username}`});
    } catch(err) {
        res.status(500).json(err);
    }
})