import { EventPool, getOrCreateEventPool } from './event-pool';
import { getElement } from './DOM';

class Component {
    get view() {
        return this._view;
    }

    set view(element) {
        this._view = element;
        this.getOrCreateEventPool().element = element;
    }

    listen() {}

    render() {
        this.listen();

        return this.view;
    }

    getOrCreateEventPool() {
        return this.eventPool || (this.eventPool = EventPool.forComponent(this));
    }

    on(path) {
        if(path instanceof EventPool) {
            return path;
        }

        if(!path || path == 'ui') {
            return this.getOrCreateEventPool();
        } else if(path.substring(0,3) === "ui:") {
            let element = this.view.querySelector(path.substring(3));
            return EventPool.forElement(element, this);
        }
        return getOrCreateEventPool(path);
    }

    static attachTo(element) {
        element = getElement(element);

        const instance = new this(element);
        instance.view = element;
        instance.listen();

        window.components ||  (window.components = []);
        window.components.push(instance);
    }
}

export default Component;
