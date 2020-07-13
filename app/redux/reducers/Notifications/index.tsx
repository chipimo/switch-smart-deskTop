require("./NativeNotification");

const Notify = (
  state = {
    show: false,
    type: "",
    title: "",
    message: "",
    state: "",
    detail: "",
    data: {},
  },
  action
) => {
  switch (action.type) {
    case "SHOW_NETIVE_NOTIFICATION":
      state = {
        ...state,
        show: true,
        type: action.payload.type,
        title: action.payload.title,
        message: action.payload.message,
        state: action.payload.state,
        detail: action.payload.detail,
        data: action.payload.data,
      };
      break;
    case "DISMISS_NETIVE_NOTIFY":
      state = {
        ...state,
        show: false,
        type: "",
        title: "",
        message: "",
        state: "",
        detail: "",
        data: {},
      };
      break;
    default:
      break;
  }
  return state;
};

export default Notify;
