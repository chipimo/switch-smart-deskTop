const SocketConn = (
  state = {
    isConn: false,
    socket: {}
  },
  action
) => {
  switch (action.type) {
    case "CONNECTED":
      state = {
        ...state,
        isConn: true,
        socket: action.socket
      };
      break;
    case "CONNCETIONFAILED":
      state = {
        ...state,
        isConn: false,
        socket: {}
      };
      break;

    default:
      return state;
  }

  return state;
};

export default SocketConn;
