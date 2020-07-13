
const Config = (
    state = {
      isSet: false,
      config: {}
    },
    action
  ) => {
    switch (action.type) {
      case "SETCONFIG":
        state = {
          ...state,
          isSet: action.isSet,
          config: action.config
        };
        break;
      case "RESTCONFIG":
        state = {
          ...state,
          isSet: false,
          config: {}
        };
        break;
  
      default:
        return state;
    }
  
    return state;
  };
  
  export default Config;
  