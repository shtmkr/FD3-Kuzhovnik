import C from '../../constants';

const initState = {
    devices: null,
    status: 0,
};

function devicesReducer( state = initState, action ) {

    switch (action.type) {

        case C.LOAD_DEVICES: {
            console.log(action);
            return {
                status: 3,
                devices: action.devices,
            }
        }
        default:
            return state;
    }
}

export default devicesReducer;
