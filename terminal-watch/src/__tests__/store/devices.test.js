import devicesReducer  from '../../redux/reducers/devicesReducer';
import { devicesLoadingAC, loadDevicesAC, devicesErrorAC, filterDevicesAC, deleteDevicesAC,
    sortDeviceAC, changeDeviceStateAC } from "../../redux/reducers/devicesAC";
let devices = require('./devicesATM');
const state = {
    devices: null,
    loaded: null,
    status: 0,
};
describe(' devices Reducer ', () => {
    it('DEVICES_LOADING success', () => {
        const action = devicesLoadingAC();
        const results = devicesReducer(state, action);
        expect(results).toEqual({
            ...state,
            status: 1,
        })
    });
    it('DEVICES_ERROR success', () => {
        const action = devicesErrorAC();
        const results = devicesReducer(state, action);
        expect(results).toEqual({
            ...state,
            status: 2,
        })
    });
    it('LOAD_DEVICES success', () => {
        const action = loadDevicesAC(devices);
        const results = devicesReducer(state, action);
        expect(results).toEqual({
            devices: action.devices,
            loaded: action.devices,
            status: 3,
        });
    });
    it('FILTER_DEVICES success', () => {
        const action = filterDevicesAC(devices);
        const results = devicesReducer(state, action);
        expect(results).toEqual({
            ...state,
            devices: action.devices,
        });
    });
    it('DELETE_DEVICE success', () => {
        const action = deleteDevicesAC(devices);
        const results = devicesReducer(state, action);
        expect(results).toEqual({
            ...state,
            devices: action.devices,
            loaded: action.devices,
        });
    });
    it('SORT_DEVICES success', () => {
        const action = sortDeviceAC(devices);
        const results = devicesReducer(state, action);
        expect(results).toEqual({
            ...state,
            devices: action.devices,
            loaded: action.devices,
        });
    });
    it('CHANGE_STATE success', () => {
        const action = changeDeviceStateAC(devices);
        const results = devicesReducer(state, action);
        expect(results).toEqual({
            ...state,
            devices: action.devices,
            loaded: action.devices,
        });
    });
});
