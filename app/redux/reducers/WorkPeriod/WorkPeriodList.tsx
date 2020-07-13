const WorkPeriodList = (
  state = {
    data: []
  },
  action
) => {
  switch (action.type) {
    case "SETWORKPERIOD":
      
      state = {
        ...state,
        data: action.data
      };
      break;

    default:
      return state;
  }

  return state;
};

export default WorkPeriodList;
