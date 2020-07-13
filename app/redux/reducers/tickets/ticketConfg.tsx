const TicketConfig = (
  state = {
    config: false,
    taxInvoice: false,
    quotation: false,
    discount: {
      apply: false,
      price: 0.0,
      note: ""
    }
  },
  action
) => {
  switch (action.type) {
    case "SETTICKETCONFIG":
      // console.log(action.socket);
      state = {
        ...state,
        config: true,
        taxInvoice: action.payload.taxInvoice,
        quotation: action.payload.quotation,
        discount: {
          apply: action.payload.apply,
          price: action.payload.price,
          note: action.payload.note
        }
      };
      break;
    case "RESETTICKETCONFIG":
      state = {
        ...state,
        config: false,
        taxInvoice: false,
        quotation: false,
        discount: {
          apply: false,
          price: 0.0,
          note: ""
        }
      };
      break;
    default:
      return state;
  }

  return state;
};

export default TicketConfig;
