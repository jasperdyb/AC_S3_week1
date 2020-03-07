const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// 登入頁面
router.get('/login', (req, res) => {

})

// 登入檢查
router.post('/login', (req, res, next) => {

})

// 註冊頁面
router.get('/register', (req, res) => {

})

// 註冊檢查
router.post('/register', (req, res) => {

})

// 登出
router.get('/logout', (req, res) => {

})

module.exports = router