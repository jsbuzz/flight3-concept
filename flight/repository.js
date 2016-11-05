import Flight from 'flight';

class Repository {
    constructor() {
        this.events = Flight.getOrCreateEventPool;
    }

    static attachTo(eventPoolPath) {
        const instance = new this();

        instance.eventPool = Flight.getOrCreateEventPool(eventPoolPath);
        instance.listen();

        return instance;
    }
}

export default Repository;
