const express = require('express');
const Account = require('../../models/admin_account.model');
const asyncHandler = require("express-async-handler");



module.exports.checkLogin = async (req, res, next) => {
    if (!req.cookies.token) {
        return res.redirect(path.join(__dirname,'auth.controller.js'))
    }
    next();
}