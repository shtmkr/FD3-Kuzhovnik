var express = require('express');
var router = express.Router();
var store = require('../store');

router.get('/devices_atm', function (req, res, next) {
    console.log('GET devices_atm');
    res.json(store.tmpATM);
});

router.get('/devices_kiosk', function (req, res, next) {
    console.log('GET devices_kiosk');
    res.json(store.tmpKIOSK);
});

router.get('/devices_events', function (req, res, next) {
    console.log('GET devices_events');
    res.json(store.tmpEVENTS);
});

module.exports = router;
