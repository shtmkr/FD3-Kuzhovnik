var express = require('express');
var router = express.Router();
var devices_atm = require('../json/devicesATM');
var devices_kiosk = require('../json/devicesKIOSK');
var devices_events = require('../json/deviceEvents');

router.get('/devices_atm', function (req, res, next) {
    console.log('GET devices_atm');
    res.json(devices_atm);
});

router.get('/devices_kiosk', function (req, res, next) {
    console.log('GET devices_kiosk');
    res.json(devices_kiosk);
});

router.get('/devices_events', function (req, res, next) {
    console.log('GET devices_events');
    res.json(devices_events);
});

module.exports = router;
