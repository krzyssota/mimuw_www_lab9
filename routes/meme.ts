import express = require('express');
import { get_meme } from '../src/DataHandler'
import { Meme } from '../src/Meme'
import csurf = require('csurf')
import { make_db } from '../src/DatabaseHandler'


const router = express.Router();
const csrfProtection = csurf({cookie: true});

router.get('/:memeId(\\d+)', csrfProtection, async function (req, res) {
  const db = make_db();
  try {
    const clickedMeme: Meme = await get_meme(db, req.params.memeId)
    db.close();
    res.render('meme', { meme: clickedMeme, csrfToken: req.csrfToken() })
  } catch(err) {
    db.close();
    throw err;
  }
})

router.post('/:memeId(\\d+)', csrfProtection, async function (req, res) {
  if(!req.session.user) {
    res.redirect('/meme' + req.path);
    return;
  }
  const db = make_db();
  try {
    const modifiedMeme: Meme = await get_meme(db, req.params.memeId)
    const priceAny: any = +req.body.price
    if(!isNaN(priceAny)) {
      const price: number = priceAny;
      await modifiedMeme.changePrice(db, price, req.session.user)
    }
    db.close();
    res.render('meme', { meme: modifiedMeme, csrfToken: req.csrfToken() })
  } catch (err) {
    db.close();
    throw err;
  }
})

module.exports = router;