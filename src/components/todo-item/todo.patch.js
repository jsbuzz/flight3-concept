import Todo from 'domain/todo';

const todoPatch = (view) => {
    return {
        title : [ view.$.label, view.$.editor ],
        state : (state) => {
            view.className = state;
            view.$.toggle.checked = (state == Todo.Completed);
        }
    };
};
export default todoPatch;
