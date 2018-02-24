import { EventEmitter } from "events";


var eventEmitter = eventEmitter || new EventEmitter();

var EventManager = {
    addListener: function(name, callback) {
        eventEmitter.addListener(name, callback);
    },

    emit: function(name, ...params) {
        eventEmitter.emit(name, params);
    },

    removeListener: function(listener) {
        eventEmitter.removeListener(listener);
    }
    
}

export default eventEmitter;