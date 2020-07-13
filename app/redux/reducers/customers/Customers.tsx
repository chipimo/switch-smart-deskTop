
const Customers = (
  state = {
    data: []
  },
  action
) => {
  switch (action.type) {
    case "SETCUSTOMERS":
      state = {
        ...state,
        data: action.data[0].Group
      };
      break;

    default:
      return state;
  }

  return state;
};

export default Customers;
