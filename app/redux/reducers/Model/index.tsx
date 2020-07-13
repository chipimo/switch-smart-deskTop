const Model = (
  state = {
    toClose: "",
  },
  action
) => {
  switch (action.type) {
    case "HANDELCLOSE":
      state = {
        ...state,
        toClose: action.toClose,
      };
      break;
    case "HANDELCLEAR":
      state = {
        ...state,
        toClose: "",
      };
      break;

    default:
      return state;
  }

  return state;
};

export default Model;
