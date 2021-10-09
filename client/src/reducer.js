export const userReducer = (state={ userLoggedIn: null }, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state, 
                userLoggedIn: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                userLoggedIn: null
            };
        default: 
            return state;
    }
}