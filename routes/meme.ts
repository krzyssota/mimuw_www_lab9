import express = require('express');
import { get_meme } from '../src/DataHandler'
import { Meme } from '../src/Meme'

const router = express.Router();

router.get('/:memeId(\\d+)', function (req, res): void {
    const clickedMeme: Meme = get_meme(req.params.memeId)
    if(!clickedMeme) {
      throw 404;
    }
    res.render('meme', { meme: clickedMeme })
})

router.post('/:memeId(\\d+)', function (req, res): void {
    const modifiedMeme: Meme = get_meme(req.params.memeId)
    const priceAny: any = +req.body.price
    if(!isNaN(priceAny)) {
      const price: number = priceAny;
      modifiedMeme.changePrice(price)
      res.render('meme', { meme: modifiedMeme })
    }
})

module.exports = router;