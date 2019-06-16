const constants = {
    DEVICES_LOADING: 'DEVICES_LOADING',
    DEVICES_ERROR: 'DEVICES_ERROR',
    LOAD_DEVICES: 'LOAD_DEVICES',
    FILTER_DEVICES: 'FILTER_DEVICES',
    DELETE_DEVICE: 'DELETE_DEVICE',
    ADD_DEVICE: 'ADD_DEVICE',
    EDIT_DEVICE: 'EDIT_DEVICE',
    CHANGE_STATE: 'CHANGE_STATE',
    SORT_DEVICES: 'SORT_DEVICES',
    LOAD_EVENTS: 'LOAD_EVENTS',
    EVENTS_LOADING: 'EVENTS_LOADING',
    EVENTS_ERROR: 'EVENTS_ERROR',
    HOST_URL: 'http://localhost:3003',
    OPTIONS_POST: {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: ''
    }
};

export default constants
