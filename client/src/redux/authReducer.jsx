
const initialLoginState = {
    isLoggedIn: false,
}
  
const authReducer = (state = initialLoginState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { ...state, isLoggedIn: true };
        case "LOGOUT_SUCCESS":
            return { ...state, isLoggedIn: false };
        default:
            return state;
            
    }
}

export default authReducer;