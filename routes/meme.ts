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
    console.log('user ' + req.session.user)
    if(req.session.user) res.render('meme', { meme: clickedMeme, login: req.session.user, csrfToken: req.csrfToken() })
    else  res.render('meme', { meme: clickedMeme, csrfToken: req.csrfToken() })
  } catch(err) {
    throw err;
  } finally {
    db.close()
  }
})

router.post('/:memeId(\\d+)', csrfProtection, async function (req, res) {
  const priceAny: any = +req.body.price
  if(!req.session.user || isNaN(priceAny)) {
    res.redirect('/meme' + req.path);
    return;
  }
  const db = make_db();
  try {
    const modifiedMeme: Meme = await get_meme(db, req.params.memeId)
    const price: number = priceAny;
    await modifiedMeme.changePrice(db, price, req.session.user)
    res.render('meme', { meme: modifiedMeme, login: req.session.user, csrfToken: req.csrfToken() })
  } catch (err) {
    throw err;
  } finally {
    db.close();

  }
})

module.exports = router;