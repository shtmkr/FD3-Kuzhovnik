import {EventEmitter} from 'events';

let listUnitsEvents = new EventEmitter();
/*
showContext     - context menu show request
hideContext     - context menu hide request
highlightItem   - highlight list item request
performFn       - perform function for selected item
*/

export {listUnitsEvents};
