import C from '../../constants';

const initState = {
    events: null,
    status: 0,
};

function eventsReducer(state = initState, action) {
    console.log(action);
    switch (action.type) {

        case C.EVENTS_LOADING: {
            return {
                ...state,
                status: 1,
            };
        }

        case C.EVENTS_ERROR: {
            return {
                ...state,
                status: 2,
            };
        }

        case C.LOAD_EVENTS: {
            return {
                status: 3,
                events: action.events,
            };
        }
        default:
            return state;
    }
}

export default eventsReducer