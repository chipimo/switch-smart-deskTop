const Dep = (
  state = {
    isSet: false,
    dep: null,
    departmentInfo:{}, 
  },
  action
) => {
  switch (action.type) {
    case "SETDEP":    
      state = {
        ...state,
        isSet: true,
        dep: action.dep[0].dep_name,
        departmentInfo: action.dep[0],
      };
      break;
    case "RESTDEP":
      state = {
        ...state,
        isSet: false,
        dep: null,
        departmentInfo:{},
      };
      break;

    default:
      return state;
  }

  return state;
};

export default Dep;
