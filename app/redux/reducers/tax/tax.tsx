
const Tax = (
  state = {
    tax_rate: "16",
    total_tax: 0
  },
  action
) => {
  switch (action.type) {
    case "SETTAXRATE":
      // console.log(action.socket);
      state = {
        ...state,
        tax_rate: action.setTaxRate,
        total_tax: 0
      };
      break;
    case "RESETTAXRATE":
      state = {
        ...state,
        tax_rate: "16",
        total_tax: 0
      };
      break;
    case "CALCULATETOTALTAX":
        state = {
          ...state,
          tax_rate: "16",
          total_tax: 0
        };
      break;
    default:
      return state;
  }

  return state;
};

export default Tax;
