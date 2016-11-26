const DOM = {};

DOM.getElement = (element) => {
    return typeof(element) == 'string' ?
        document.querySelector(element) : element;
};

DOM.render = (source) => {
    var parent = document.createElement('div');
    parent.innerHTML = source;

    return parent.firstElementChild;
};

DOM.clone = (subtree) => {
    return DOM.assignVariables(subtree.cloneNode(true));
}

DOM.assignVariables = (parentElement) => {
    parentElement.$ || (parentElement.$ = {});
    parentElement.querySelectorAll('[var]').forEach((element) => {
        parentElement.$[element.attributes['var'].value] = element;
    });

    return parentElement;
};

export default DOM;
