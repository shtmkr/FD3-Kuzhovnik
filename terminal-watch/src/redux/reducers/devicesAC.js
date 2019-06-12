import C from '../../constants';

const loadDevicesAC = devices => (
    {
        type: C.LOAD_DEVICES,
        devices,
    }
);

export  { loadDevicesAC };
