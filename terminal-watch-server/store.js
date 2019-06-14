var devices_atm = require('./json/devicesATM');
var devices_kiosk = require('./json/devicesKIOSK');
var devices_events = require('./json/deviceEvents');

var store = {
    tmpATM: devices_atm,
    tmpKIOSK: devices_kiosk,
    tmpEVENTS: devices_events,
    login: {
        name: '',
        lastLogged: null,
        path: '',
    }
};

module.exports = store;
