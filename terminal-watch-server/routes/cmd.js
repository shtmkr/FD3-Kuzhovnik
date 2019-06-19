var express = require('express');
var router = express.Router();
var store = require('../store');

router.post('/change_state', function (req, res, next) {
    if (req.body[0].Info.Id.charAt(0) === 'M'){
        store.tmpATM = req.body;
    }
    if (req.body[0].Info.Id.charAt(0) === 'S'){
        store.tmpKIOSK = req.body;
    }
});

router.post('/isDeviceExist', function (req, res, next) {
    var id = req.body.deviceId;
    var type = req.body.type;
    var isExist = false;
    if (type === 'ATM'){
        if (store.tmpATM.find( atm => atm.Info.Id === id)){
            isExist = true;
        }
    }
    if (type === 'KIOSK'){
        if (store.tmpKIOSK.find( kiosk => kiosk.Info.Id === id)){
            isExist = true;
        }
    }
    res.json({isExist: isExist})
});

router.post('/delete_device', function (req, res, next) {
    console.log('POST delete_device');
    console.log(req.body);
    if (req.body[0].Info.Id.charAt(0) === 'M'){
        store.tmpATM = req.body;
    }
    if (req.body[0].Info.Id.charAt(0) === 'S'){
        store.tmpKIOSK = req.body;
    }
});

router.get('/download_log', function (req, res, next) {
    console.log('GET download_log');
    res.download(`${__dirname}/test.txt`)
});

module.exports = router;
