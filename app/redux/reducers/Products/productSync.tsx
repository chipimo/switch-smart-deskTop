const ProductSync = (
  state = {
    load: false,
    item: "",
  },
  action
) => {
  switch (action.type) {
    case "SYNC":
      state = {
        ...state,
        load: true,
        item: action.item,
      };
      break;
    case "STOPSYNC":
      state = {
        ...state,
        load: false,
        item: "",
      };
      break;

    default:
      return state;
  }

  return state;
};

export default ProductSync;
