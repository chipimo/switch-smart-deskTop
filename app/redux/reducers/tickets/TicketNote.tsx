const TicketNote = (
  state = {
    note: "",
  },
  action
) => {
  switch (action.type) {
    case "SetNote":
      state = {
        ...state,
        note: action.note,
      };
      break;
    case "ReSetNote":
      state = {
        ...state,
        note: "",
      };
      break;

    default:
      return state;
  }
  return state;
};

export default TicketNote;
