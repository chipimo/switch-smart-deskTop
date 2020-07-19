const Updater = (
  state = {
    isDone: true,
    product: "",
  },
  action
) => {
  switch (action.type) {
    case "UPDATINGSERVER":
      state = {
        ...state,
        isDone: false,
        product: action.product,
      };
      break;
    case "UPDATINGSERVERDONE":
      state = {
        ...state,
        isDone: true,
        product: action.product,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default Updater;
