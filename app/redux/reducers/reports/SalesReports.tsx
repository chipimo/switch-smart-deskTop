const SalesReports = (state = { products: [] }, action) => {
  switch (action.type) {
    case "LOADEDLIST":
      state = { ...state, products: action.product };
      break;

    default:
      return state;
  }
  return state;
};

export default SalesReports;
