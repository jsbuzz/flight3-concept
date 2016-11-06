import Flight from 'flight';

const EventChannels = {};
EventChannels.Todo = Flight.getOrCreateEventPool('data/todo');

export default EventChannels;
