import isoFetch from "isomorphic-fetch";
import C from "../constants";
import {msg} from "../events/events";

const fetchLog = (path, cb, options ) => {
    isoFetch(`${C.HOST_URL}${path}`, options)
        .then( (response) => { // response - HTTP-ответ
            if (!response.ok) {
                let Err = new Error("fetch error " + response.status);
                Err.userMessage = "Ошибка связи";
                msg.emit('log', `Сбой связи`);
                throw Err;
            }
            else
                return response.text();
        })
        .then( (data) => {
            cb(data);
            if (data) {
                msg.emit('log', `Загрузка логов...`);
            }
        })
        .catch( (error) => {
            msg.emit('log', `${error}`);
        });
};

export { fetchLog }