const ProductList = (
    state = {
      list: []
    },
    action
  ) => {
    switch (action.type) {
      case "ProductList":
        state = {
          ...state,
          list: action.list
        };
        break;
      case "CLEARPRODUCTTABEL":
        state = {
          ...state,
          list: []
        };
        break;
  
      default:
        return state;
    }
  
    return state;
  };
  
  export default ProductList;
  