import { combineReducers } from 'redux';

import devicesReducer from "./devicesReducer";
import eventsReducer from "./eventsReducer";

let combinedReducer = combineReducers({
    devices: devicesReducer,
    events: eventsReducer,
});

export default combinedReducer;
