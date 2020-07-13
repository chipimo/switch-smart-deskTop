const uuidv4 = require("uuid/v4");

function CreateId() {
  return uuidv4();
}

const ProductsMainList = (
  state = {
    data: [],
  },
  action
) => {
  switch (action.type) {
    case "SETPRODUCTS":
      
      var temp = [];
      action.products.subNode.subcart.map((data) => {
        temp.push({
          name: data.ItemName,
          group: action.products.mainNode.tabname,
          recipes: action.products.subNode.cartname,
          price: parseInt(data.sallingprice),
          isMulity: data.isMulity,
          multi: data.multi,
          barcode: data.barcode,
          multiplier: data.qnt,
          alertOut: data.alertOut,
          id: CreateId(),
          productKey: data.productKey,
          amountInstore: data.amountInstore,
          data: { data: action.products },
        });
      });

      state = {
        ...state,
        data: temp,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default ProductsMainList;
