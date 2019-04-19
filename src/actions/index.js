export const showLoginForm = () => {
    return {
        type: 'SHOW_LOGIN_FORM',
        payload: true
    }
}
export const hideLoginForm = () => {
    return {
        type: 'SHOW_LOGIN_FORM',
        payload: false
    }
}

export const showSignUpForm = () => {
    return {
        type: 'SHOW_SIGNUP_FORM',
        payload: true
    }
}
export const hideSignUpForm= () => {
    return {
        type: 'SHOW_SIGNUP_FORM',
        payload: false
    }
}