const User = (
  state = {
    isLoggedIn: false,
    userLogged: {},
  },
  action
) => {
  switch (action.type) {
    case "LOGIN":
      state = {
        ...state,
        isLoggedIn: true,
        userLogged: action.userLogged,
      };
      break; 
    case "LOGOUT":
      state = {
        ...state,
        isLoggedIn: false,
        userLogged: {},
      };
      break;

    default:
      return state;
  }

  return state;
};

export default User;
