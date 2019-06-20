import eventsReducer from '../../redux/reducers/eventsReducer';
import { eventsLoadingAC, eventsErrorAC, loadEventsAC} from "../../redux/reducers/eventsAC";

let events = require('./deviceEvents');
const state = {
    events: null,
    status: 0,
};
describe(' event Reducer ', () => {
    it('EVENTS_LOADING success', () => {
        const action = eventsLoadingAC();
        const results = eventsReducer(state, action);
        expect(results).toEqual({
            ...state,
            status: 1,
        })
    });
    it('EVENTS_ERROR success', () => {
        const action = eventsErrorAC();
        const results = eventsReducer(state, action);
        expect(results).toEqual({
            ...state,
            status: 2,
        })
    });
    it('LOAD_EVENTS success', () => {
        const action = loadEventsAC();
        const results = eventsReducer(state, action);
        expect(results).toEqual({
            ...state,
            status: 3,
            events: action.events,
        })
    });
});
