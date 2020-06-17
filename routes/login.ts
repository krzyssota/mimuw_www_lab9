import express = require('express');
import csurf = require('csurf')
import { make_db } from '../src/DatabaseHandler'
import * as bcrypt from 'bcryptjs';

const router = express.Router();
const csrfProtection = csurf({cookie: true});

router.get('/', csrfProtection, async (req, res) => {
       res.render('login', {login: req.session.user, csrfToken: req.csrfToken()});
});

router.post('/', csrfProtection, async (req, res) => {
   const enteredLogin: string = req.body.login
   const enteredPassword: string = req.body.password

   const db = make_db();
    try {
        await new Promise((resolve, reject) => {
            const sqlQ = `SELECT password FROM users WHERE login = (?);`
            db.all(sqlQ, enteredLogin, (err, rows) => {
                if(err) {
                    console.error('rejectuje select login password')
                    reject('DB error while select login password');
                }
                let correct = false;
                for(const row of rows) {
                    if(bcrypt.compareSync(enteredPassword, row.password)) {
                        resolve();
                        correct = true;
                    }
                }
                if(!correct) reject(new Error("Login or password is not correct"));
            })
        })
        req.session.user = enteredLogin;
        res.render('login', {login: req.session.user, csrfToken: req.csrfToken()});
    } catch(err) {
        res.render('login', {csrfToken: req.csrfToken(), error: err});
    } finally {
        db.close();
    }
});

module.exports = router;