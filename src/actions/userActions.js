

export const createUser = (data) => {
    return {
        type: 'CREATE_USER',
        payload: data
    }
}

export const editUser = (data) => {
    return {
        type: 'EDIT_USER',
        payload: data
    }
}

export const deleteUser = (key) => {
    return {
        type: 'DELETE_USER',
        payload: key
    }
}
