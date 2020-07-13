const SettingViews = (
  state = {
    view: null,
    title: "",
  },
  action
) => {
  switch (action.type) {
    case "CHANGEVIEW":
      // console.log(action.socket);
      state = {
        ...state,
        view: action.view,
        title: action.title,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default SettingViews;
