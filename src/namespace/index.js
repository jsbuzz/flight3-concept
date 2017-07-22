import Flight from 'flight';

const NameSpace = {
    System : Flight.getOrCreateEventPool('data/system'),
    Todo   : Flight.getOrCreateEventPool('data/todo'),
};

export default NameSpace;
