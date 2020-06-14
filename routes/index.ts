import express = require('express');
import { mList, headerMeme } from '../src/DataHandler'
const router = express.Router();
import { make_db } from '../src/DatabaseHandler'


router.get('/', async function(req, res) {
    const db = make_db();
    try {
        res.render('index', { title: 'Meme market', message: 'Hello there!', memes: await mList.getMostExpensive(db), mainMeme: headerMeme })
        db.close();
    } catch(err) {
        db.close();
        throw err;
    }
});

module.exports = router;