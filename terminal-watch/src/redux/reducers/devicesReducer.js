import C from '../../constants';

const initState = {
    devices: null,
    loaded: null,
    status: 0,
};

function devicesReducer( state = initState, action ) {
    console.log(action);

    switch (action.type) {

        case C.LOAD_DEVICES: {
            return {
                status: 3,
                devices: action.devices,
                loaded: action.devices,
            };
        }
        case C.FILTER_DEVICES: {
            return {
                ...state,
                devices: action.devices,
            }
        }
        case C.DELETE_DEVICE: {
            return {
                ...state,
                devices: action.devices,
                loaded: action.devices,
            }
        }
        case C.CHANGE_STATE: {
            return {
                ...state,
                devices: action.devices,
                loaded: action.devices,
            }
        }
        default:
            return state;
    }
}

export default devicesReducer;
