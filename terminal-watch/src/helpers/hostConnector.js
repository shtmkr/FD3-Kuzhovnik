import isoFetch from "isomorphic-fetch";
import {msg} from "../events/events";
import C from '../constants';

const hostConnector = (path, cb, options ) => {
    isoFetch(`${C.HOST_URL}${path}`, options)
        .then( (response) => { // response - HTTP-ответ
            if (!response.ok) {
                let Err = new Error("fetch error " + response.status);
                Err.userMessage = "Ошибка связи";
                msg.emit('log', `Сбой связи`);
                throw Err;
            }
            else
                return response.json();
        })
        .then( (data) => {
            cb(data);
            msg.emit('log', `Загружено ${data.length} устройств успешно`);
        })
        .catch( (error) => {
            msg.emit('log', `Технический сбой ${error}`);
        });
};

export { hostConnector }
