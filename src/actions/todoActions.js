export const createTodo = (data) => {
    return {
        type: 'CREATE_TODO',
        payload: data
    }
}

export const editTodo = (data) => {
    return {
        type: 'EDIT_TODO',
        payload: data
    }
}

export const deleteTodo = (key) => {
    return {
        type: 'DELETE_TODO',
        payload: key
    }
}
