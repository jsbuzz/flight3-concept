import Flight from 'flight';
import Todo from 'domain/todo';

const TodoPatch = (view) => {
    return {
        title : [ view.$.label, view.$.editor ],
        state : (state) => {
            view.className = state;
            view.$.toggle.checked = (state == Todo.Completed);
        }
    };
};
export default TodoPatch;
