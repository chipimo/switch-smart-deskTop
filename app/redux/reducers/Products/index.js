"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require("uuid/v4");
function CreateId() {
    return uuidv4();
}
var ProductsMainList = function (state, action) {
    if (state === void 0) { state = {
        data: [],
    }; }
    switch (action.type) {
        case "SETPRODUCTS":
            var temp = [];
            action.products.subNode.subcart.map(function (data) {
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
            state = __assign({}, state, { data: temp });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = ProductsMainList;
//# sourceMappingURL=index.js.map