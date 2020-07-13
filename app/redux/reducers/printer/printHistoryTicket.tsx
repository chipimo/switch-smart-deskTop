const TicketToPrint = (
  state = {
    active: false,
    invo: 1,
    user: "",
    PaymentType: "",
    Date: "",
    time: "",
  },
  action
) => {
  switch (action.type) {
    case "PRINTHISTORY":
      state = {
        ...state,
        invo: action.invoiceNumber,
        user: action.user,
        PaymentType: action.PaymentType,
        Date: action.Date,
        time: action.time,
        active: true,
      };
      break;
    case "CLEARPRINT":
      state = {
        ...state,
        invo: 0,
        user: "",
        PaymentType: "",
        Date: "",
        time: "",
        active: false,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default TicketToPrint;
