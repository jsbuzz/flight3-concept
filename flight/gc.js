
const GC = {
    components: new Map(),
    listeners : new Map()
};

GC.registerComponent = function(component) {
    this.components.set(component.componentId, component);
    this.listeners.set(component.componentId, []);
};

GC.registerListener = function(component, element, event, callback) {
    this.listeners.get(component.componentId).push({
        element   : element,
        eventName : extractEventName(event),
        callback  : callback
    });
};

GC.destroy = function(component) {
    for(let listener of this.listeners.get(component.componentId)) {
        listener.element.removeEventListener(listener.eventName, listener.callback);
    }
    component.view = null;
    this.components.delete(component.componentId);
    this.listeners.delete(component.componentId);
};

GC.isAlive = function(component) {
    let element = component.view;

    while(element) {
        if(element.isSameNode(document.body)) {
            return true;
        }
        element = element.parentElement;
    }
    return false;
};

GC.runCheck = function() {
    for(let component of this.components.values()) {
        if(!this.isAlive(component)) {
            this.destroy(component);
        }
    }
};

export default GC;

// setTimer
GC.timeout = 500;
GC.timeoutStep = function() {
    GC.timer = setTimeout(function () {
        GC.runCheck();
        if(!GC.stopped) {
            GC.timeoutStep();
        }
    }, GC.timeout);
}

GC.start = function() {
    if(!this.timer) {
        this.timeoutStep();
    }
    this.stopped = false;
};
GC.start();

GC.stop = function() {
    if(this.timer) {
        clearTimeout(this.timer);
    }
    this.stopped = true;
};

function extractEventName(event) {
    return (typeof event == 'string')
        ? event
        : event.EventName;
}
