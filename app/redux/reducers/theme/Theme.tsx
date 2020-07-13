import appDb from "../../dataBase";

const Theme = (
  state = {
    theme: "light",
  },
  action
) => {
  switch (action.type) {
    case "setTheme":
      appDb.HandleTheme(
        { _type: "setTheme", theme: action.setTheme },
        (callback) => {}
      );
      state = {
        ...state,
        theme: action.setTheme,
      };
      break;
    case "Theme":
      state = {
        ...state,
        theme: action.setTheme,
      };
      break;
    case "resetTheme":
      state = {
        ...state,
        theme: "light",
      };
      break;

    default:
      return state;
  }

  return state;
};

export default Theme;
