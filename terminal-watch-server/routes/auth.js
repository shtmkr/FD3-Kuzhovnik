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

router.post('/setPath', function (req, res, next) {
    console.log(req.body);
    store.login.path = req.body.path;
});

router.get('/getPath', function (req, res, next) {
    res.json({path: store.login.path});
});

router.get('/login', function (req, res, next) {
   if (Date.now() - store.login.lastLogged < 600000){
       res.json({result: 'logged'});
   } else {
       res.json({result: 'failed'})
   }
});

router.get('/logout', function (req, res, next) {
    res.json({result: 'logout'});
    store.login.lastLogged = undefined;
});

module.exports = router;
