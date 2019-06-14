var express = require('express');
var router = express.Router();
var store = require('../store');

router.post('/signin', function (req, res, next) {
    console.log(req.body);
    if (req.body.login === 'artem' && req.body.password === 'kuzh') {
        res.json({result: 'ok'});
        store.login.name = req.body.login;
        store.login.lastLogged = Date.now();
    } else {
        res.json({result: 'failed'})
    }
});

router.get('/login', function (req, res, next) {
    console.log(Date.now());
    console.log(store.login.lastLogged);
    console.log(Date.now() - store.login.lastLogged);
   if (Date.now() - store.login.lastLogged < 600000){
       res.json({result: 'logged'});
   } else {
       res.json({result: 'failed'})
   }
});

module.exports = router;
