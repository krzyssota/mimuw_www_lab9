"use strict";
exports.__esModule = true;
var express = require("express");
var DataHandler_1 = require("../src/DataHandler");
var router = express.Router();
router.get('/', function (req, res) {
    res.render('index', { title: 'Meme market', message: 'Hello there!', memes: DataHandler_1.mList, mainMeme: DataHandler_1.headerMeme });
});
module.exports = router;
