import Component from './component';
import Repository from './repository';
import {EventPool} from './event-pool';

let actor = null;

// this.on()
Component.prototype.$$on = Component.prototype.on;
Component.prototype.on = function(path) {
    actor = this;
    return this.$$on(path);
};
Repository.prototype.$$on = Repository.prototype.on;
Repository.prototype.on = function(path) {
    actor = this;
    return this.$$on(path);
};

// EventPool
EventPool.prototype.$$trigger = EventPool.prototype.trigger;
EventPool.prototype.trigger = function(flightEvent) {
    console.log(`${actor.constructor.name} triggering ${flightEvent.name}`);
    return this.$$trigger(flightEvent);
};

EventPool.prototype.$$addEventListener = EventPool.prototype.addEventListener;
EventPool.prototype.addEventListener = function(flightEvent, handler) {
    let eventName = (typeof flightEvent == 'string')
        ? flightEvent : flightEvent.EventName;
    let boundActor = actor.constructor.name;

    const debugHandler = function(event) {
        console.log(`${boundActor} listening for ${eventName}`);
        console.log(` > calling ${boundActor}.${handlerToString(handler)}`);
        return handler(event);
    }
    return this.$$addEventListener(flightEvent, debugHandler);
};

function handlerToString(handler) {
    if(handler.name) {
        return handler.name;
    }
    return handler.toString().match(/_this[0-9][.]([^(]*)[(]/).pop();
}

const Debugger = {};
export default Debugger;
