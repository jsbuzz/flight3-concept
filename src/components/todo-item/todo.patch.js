
const todoPatch = (view) => {
    return {
        title : [ view.$.label, view.$.editor ],
        state : (state, todo) => {
            view.className = state;
            view.$.toggle.checked = todo.completed;
        }
    };
};
export default todoPatch;
