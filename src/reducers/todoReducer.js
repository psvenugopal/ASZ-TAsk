const storedTodos = JSON.parse(localStorage.getItem('todos'))

const initialState = {
    todos: storedTodos ? storedTodos : []
}

export default function todo(state = initialState, action) {
    const { payload } = action;
    switch (action.type) {
        case 'CREATE_TODO':
            return { todos: [...state.todos, payload] }
        case 'EDIT_TODO':
            let list = state.todos;
            list.forEach((todo) => {
                if (todo.key === payload.key) {
                    todo.action = payload.action
                    todo.date = payload.date
                }
            })
            return { todos: list }
        case 'DELETE_TODO':
            const newList = state.todos.filter((todo) => {
                return todo.key !== payload
            });
            return { todos: newList }
        default:
            return state;
    }
}