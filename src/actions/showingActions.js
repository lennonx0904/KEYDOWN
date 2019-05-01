export const showLoginForm = boolean => {
  return {
    type: "SHOW_LOGIN_FORM",
    payload: boolean
  };
};

export const showSignUpForm = boolean => {
  return {
    type: "SHOW_SIGNUP_FORM",
    payload: boolean
  };
};

export const showMobileButtons = boolean => {
  return {
    type: "SHOW_MOBILE_BUTTONS",
    payload: boolean
  };
};
