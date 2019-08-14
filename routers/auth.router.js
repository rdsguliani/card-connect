
const express = require('express');
const router = express.Router();
const { registerUser, signIn, refreshToken } = require('../controllers/auth.controller');
const isAuth = require('./../middlewares/isAuth')

router.put('/register', registerUser);

router.put('/resetPassword', (req, res, next) => {
});

router.get('/signIn', signIn);

router.get('/loguot', (req, res, next) => {
})

router.get('/refreshToken', isAuth, refreshToken)

module.exports = router;