
const Flight = {};
export default Flight;

// eventPools
import { EventPool, DataEventPool, getOrCreateEventPool, detachEventPool } from './event-pool';
Flight.EventPool = EventPool;
Flight.DataEventPool = DataEventPool;
Flight.getOrCreateEventPool = getOrCreateEventPool;
Flight.detachEventPool = detachEventPool;

// events
import { Event, eventType, eventOfType, basicEventOf } from './event';
Flight.Event = Event;
Flight.eventType = eventType;
Flight.eventOfType = eventOfType;
Flight.basicEventOf = basicEventOf;

// Component
import Component from './component';
Flight.Component = Component;
