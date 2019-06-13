var express = require('express');
var router = express.Router();

router.post('/signin', function (req, res, next) {
    console.log(req.body);
    if (req.body.login === 'artem' && req.body.password === 'kuzh') {
        res.json({result: 'ok'})
    } else {
        res.json({result: 'failed'})
    }
});

module.exports = router;
