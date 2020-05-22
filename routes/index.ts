import express = require('express');
import { mList, headerMeme } from '../src/DataHandler'
const router = express.Router();

router.get('/', function(req, res): void {
    res.render('index', { title: 'Meme market', message: 'Hello there!', memes: mList, mainMeme: headerMeme })
});

module.exports = router;