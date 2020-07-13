const LoadTabel = (
    state = {
      load: false
    },
    action
  ) => {
    switch (action.type) {
      case "LOADTABEL":
        state = {
          ...state,
          load: true
        };
        break;
      case "CLEARLOADTABEL":
        state = {
          ...state,
          load: false
        };
        break;
  
      default:
        return state;
    }
  
    return state;
  };
  
  export default LoadTabel;
  