
export function getElement(element) {
    return typeof(element) == 'string' ?
        document.querySelector(element) : element;
};
