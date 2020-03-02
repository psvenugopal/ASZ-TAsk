const storedUsers = JSON.parse(localStorage.getItem('users'))

const initialState = {
    users: storedUsers ? storedUsers : []
}

export default function user(state = initialState, action) {
    const { payload } = action;
    switch (action.type) {
        case 'CREATE_USER':
            return { users: [...state.users, payload] }
        case 'EDIT_USER':
            let list = state.users;
            list.forEach((user) => {
                if (user.key === payload.key) {
                    user.name = payload.name
                    user.email = payload.email
                }
            })
            return { users: list }
        case 'DELETE_USER':
            const newList = state.users.filter((user) => {
                return user.key !== payload
            });
            return { users: newList }
        default:
            return state;
    }
}