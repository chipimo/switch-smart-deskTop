const StackNotify = (
  state = {
    open: false,
    type: "",
    message: "",
    vertical: "",
    horizontal: "",
    variant: "",
    data: [],
  },
  action
) => {
  switch (action.type) {
    case "SHOWNOTIFICATION":
      state = {
        ...state,
        open: true,
        type: action.type,
        message: action.message,
        vertical: action.vertical,
        horizontal: action.horizontal,
        variant: action.variant,
        data: action.data,
      };
      break;
    case "DISMISS":
      state = {
        ...state,
        open: false,
        vertical: "",
        horizontal: "",
        variant: "",
        type: "",
        message: "",
        data: [],
      };
      break;
    default:
      break;
  }
  return state;
};

export default StackNotify;
