import C from '../../constants';

const devicesLoadingAC = () => (
    {
        type: C.DEVICES_LOADING,
    }
);

const devicesErrorAC = () => (
    {
        type: C.DEVICES_ERROR,
    }
);

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

const changeDeviceStateAC = (devices) => (
    {
        type: C.CHANGE_STATE,
        devices,
        loaded: devices,
    }
);

const sortDeviceAC = (devices) => (
    {
        type: C.SORT_DEVICES,
        devices,
        loaded: devices,
    }
);

export  { loadDevicesAC, filterDevicesAC, deleteDevicesAC,
    changeDeviceStateAC, sortDeviceAC, devicesLoadingAC, devicesErrorAC };
