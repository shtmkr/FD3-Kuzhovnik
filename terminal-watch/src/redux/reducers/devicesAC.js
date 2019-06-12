import C from '../../constants';

const loadDevicesAC = (devices, loaded) => (
    {
        type: C.LOAD_DEVICES,
        devices,
        loaded,
    }
);

const filterDevicesAC = (devices) => (
    {
        type: C.FILTER_DEVICES,
        devices,
    }
);

const deleteDevicesAC = (devices) => (
    {
        type: C.DELETE_DEVICE,
        devices,
        loaded: devices,
    }
);

export  { loadDevicesAC, filterDevicesAC, deleteDevicesAC };
