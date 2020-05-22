"use strict";
exports.__esModule = true;
var express = require("express");
var DataHandler_1 = require("../src/DataHandler");
var router = express.Router();
router.get('/:memeId(\\d+)', function (req, res) {
    var clickedMeme = DataHandler_1.get_meme(req.params.memeId);
    if (!clickedMeme) {
        throw 404;
    }
    res.render('meme', { meme: clickedMeme });
});
router.post('/:memeId(\\d+)', function (req, res) {
    var modifiedMeme = DataHandler_1.get_meme(req.params.memeId);
    var priceAny = +req.body.price;
    if (!isNaN(priceAny)) {
        var price = priceAny;
        modifiedMeme.changePrice(price);
        res.render('meme', { meme: modifiedMeme });
    }
});
module.exports = router;
