import C from '../../constants';

const eventsLoadingAC = () => (
    {
        type: C.EVENTS_LOADING,
    }
);

const eventsErrorAC = () => (
    {
        type: C.EVENTS_ERROR,
    }
);

const loadEventsAC = (events) => (
    {
        type: C.LOAD_EVENTS,
        events,
    }
);

export { eventsLoadingAC, eventsErrorAC, loadEventsAC }