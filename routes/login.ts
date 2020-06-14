import express = require('express');
import csurf = require('csurf')
import { make_db } from '../src/DatabaseHandler'

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
                const bcrypt = require('bcryptjs');
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
        db.close();
        res.render('login', {login: req.session.user, csrfToken: req.csrfToken()});
    } catch(err) {
        db.close();
        res.render('login', {csrfToken: req.csrfToken(), error: err});
    }
});

module.exports = router;