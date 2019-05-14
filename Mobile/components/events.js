import {EventEmitter} from 'events';

let cardEvents = new EventEmitter();
// saveData
// cancel

let clientEvents = new EventEmitter();
// delete client
// edit client

export {cardEvents, clientEvents};
