const LoggedUsers = (
  state = {
    LoggedUsers: [],
  },
  action
) => {
  switch (action.type) {
    case "UserLoggedIn":
      state = { ...state, LoggedUsers: action.users };
      break;

    default:
      return state;
  }
  return state;
};

export default LoggedUsers;
