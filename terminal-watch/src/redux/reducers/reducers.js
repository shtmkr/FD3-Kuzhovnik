import { combineReducers } from 'redux';

import devicesReducer from "./devicesReducer";

let combinedReducer = combineReducers({
    devices: devicesReducer,
});

export default combinedReducer;
