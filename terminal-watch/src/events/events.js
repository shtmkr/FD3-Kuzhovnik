import {EventEmitter} from 'events';

let listUnitsEvents = new EventEmitter();
/*
showContext     - context menu show request
hideContext     - context menu hide request
highlightItem   - highlight list item request
performFn       - perform function for selected item
hideCard        - card hide request
itemDeleted     - item deleted from list
changeState     - device change state (IS, OOS) request
addDevice       - add new device request
*/

let msg = new EventEmitter();
/*
* log                - log message to MessageHistory
* newDeviceResult    - log result add new device cmd
* */

export {listUnitsEvents, msg};
