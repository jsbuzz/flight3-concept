
const GC = {
    components: new Map(),
    listeners : new Map(),
    timeout: 0
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

GC.afterTrigger = function(flightEvent) {
    if(GC.timer) {
        clearTimeout(GC.timer);
    }
    GC.timer = setTimeout(function () {
        GC.runCheck();
    }, GC.timeout);
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

function extractEventName(event) {
    return (typeof event == 'string')
        ? event
        : event.EventName;
}
