
const express = require('express');
const isAuth = require('./../middlewares/isAuth')
const router = express.Router();

const {getTemplates, addUserCard} = require('../controllers/card.controller')

router.get('/getTemplates', isAuth, getTemplates );

router.put('/createCard', isAuth, addUserCard);

router.put('/modifyCard', (req, res, next) => {

});

router.get('/connectCard', (req, res, next) => {

})

module.exports = router;