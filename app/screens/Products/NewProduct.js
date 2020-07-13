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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var TextField_1 = require("@material-ui/core/TextField");
var Button_1 = require("@material-ui/core/Button");
var core_1 = require("@material-ui/core");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var dataBase_1 = require("../../redux/dataBase");
var semantic_ui_react_1 = require("semantic-ui-react");
var react_toastify_1 = require("react-toastify");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    paper: {
        padding: theme.spacing(3, 4, 3),
    },
    table: {
        width: "100%",
        borderColor: "#aaaaaa",
        borderStyle: "solid",
        borderWidth: 1,
        borderCollapse: "collapse",
    },
    tableCol: {
        width: 200,
        borderColor: "#aaaaaa",
        borderStyle: "solid",
        borderWidth: 1,
    },
    tableRow: {
        width: 200,
        borderColor: "#aaaaaa",
        borderStyle: "solid",
        borderWidth: 1,
    },
    link: {
        color: "#0078D7",
        textDecoration: "underline",
        marginTop: 20,
        cursor: "pointer",
        "&:hover, &$focusVisible": {
            color: "#002847",
        },
    },
}); });
var NewProduct = function (props) {
    var classes = useStyles();
    var _a = React.useState({
        data: [],
    }), portionInputs = _a[0], setPortionInputs = _a[1];
    var _b = React.useState({
        ProductName: "",
        BarCode1: "",
        BarCode2: "",
        BarCode3: "",
        BarCode4: "",
        BarCode5: "",
        alertOut: "",
        amount: "",
        Groupname: "",
    }), values = _b[0], setValues = _b[1];
    var _c = React.useState({
        nameError: "",
        barCodeError: "",
        alertOutError: "",
        groupError: "",
        amount: "",
    }), errors = _c[0], setErrors = _c[1];
    var _d = React.useState([]), mainGroups = _d[0], setMainGroups = _d[1];
    var _e = React.useState([]), Recipes = _e[0], setRecipes = _e[1];
    var _f = React.useState(""), selectedRecipe = _f[0], setSelectedRecipe = _f[1];
    var _g = React.useState(false), Loading = _g[0], setLoading = _g[1];
    var _h = React.useState({
        group: "",
        colors: {},
    }), SelectedMainGroups = _h[0], setSelectedMainGroups = _h[1];
    React.useEffect(function () {
        if (props.type === "edit") {
            setLoading(true);
            // console.log(props.data);
            setValues(__assign({}, values, { ProductName: props.data.selected.ItemName }));
            if (props.data.selected.isMulity) {
                dataBase_1.default.HandelProducts({
                    _type: "getPOSList",
                    layoutType: "mulitList",
                    name: props.data.selected.ItemName,
                }, function (receiveCallback) { return __awaiter(_this, void 0, void 0, function () {
                    var loopEnd, dataOutput, reslut;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                loopEnd = 0;
                                dataOutput = receiveCallback.data.map(function (datalist, index) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        // console.log(datalist);
                                        loopEnd++;
                                        handelPortion(datalist.id);
                                        handelOnTextPartonChage(datalist.barcode1, "barcode1", index);
                                        handelOnTextPartonChage(datalist.barcode2, "barcode2", index);
                                        handelOnTextPartonChage(datalist.barcode3, "barcode3", index);
                                        handelOnTextPartonChage(datalist.barcode4, "barcode4", index);
                                        handelOnTextPartonChage(datalist.barcode5, "barcode5", index);
                                        handelOnTextPartonChage(datalist.qnt, "multiplier", index);
                                        handelOnTextPartonChage(datalist.alertOut, "alertOut", index);
                                        handelOnTextPartonChage(datalist.sallingprice, "price", index);
                                        if (loopEnd === receiveCallback.data.length) {
                                            return [2 /*return*/, true];
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                                return [4 /*yield*/, Promise.all(dataOutput)];
                            case 1:
                                reslut = _a.sent();
                                if (reslut)
                                    setLoading(false);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            else {
                handelPortion(false);
                setTimeout(function () {
                    handelOnTextPartonChage(props.data.selected.barcode1, "barcode1", 0);
                    handelOnTextPartonChage(props.data.selected.barcode2, "barcode2", 0);
                    handelOnTextPartonChage(props.data.selected.barcode3, "barcode3", 0);
                    handelOnTextPartonChage(props.data.selected.barcode4, "barcode4", 0);
                    handelOnTextPartonChage(props.data.selected.barcode5, "barcode5", 0);
                    handelOnTextPartonChage(props.data.selected.multiplier, "multiplier", 0);
                    handelOnTextPartonChage(parseInt(props.data.selected.alertOut), "alertOut", 0);
                    handelOnTextPartonChage(props.data.selected.sallingprice, "price", 0);
                }, 300);
            }
        }
        dataBase_1.default.HandelGroup({ _type: "get" }, function (reciveCallback) {
            var arr = [];
            reciveCallback.data.map(function (data) {
                arr.push({
                    title: data.group,
                    recipes: data.recipes,
                    colors: data.colors,
                });
            });
            setMainGroups(arr);
        });
    }, []);
    var handleTextChange = function (prop) { return function (event) {
        var _a;
        setValues(__assign({}, values, (_a = {}, _a[prop] = event.target.value, _a)));
        if (prop === "ProductName")
            setErrors(__assign({}, errors, { nameError: "" }));
        if (prop === "alertOut")
            setErrors(__assign({}, errors, { alertOutError: "" }));
        if (prop === "Groupname")
            setErrors(__assign({}, errors, { groupError: "" }));
    }; };
    var handelOnTextPartonChage = function (value, id, index) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (id) {
                case "barcode1":
                    portionInputs.data[index].barcode1 = value;
                    break;
                case "barcode2":
                    portionInputs.data[index].barcode2 = value;
                    break;
                case "barcode3":
                    portionInputs.data[index].barcode3 = value;
                    break;
                case "barcode4":
                    portionInputs.data[index].barcode4 = value;
                    break;
                case "barcode5":
                    portionInputs.data[index].barcode5 = value;
                    break;
                case "multiplier":
                    portionInputs.data[index].multiplier = value;
                    break;
                case "alertOut":
                    portionInputs.data[index].alertOut = value;
                    break;
                case "price":
                    portionInputs.data[index].price = value;
                    break;
                default:
                    break;
            }
            setPortionInputs(__assign({}, portionInputs, { data: portionInputs.data }));
            return [2 /*return*/];
        });
    }); };
    var handelDelete = function () {
        var arr = portionInputs.data;
        var filter = arr.findIndex(function (x) { return x.id === 1; });
        arr.splice(filter, 1);
        setPortionInputs(__assign({}, portionInputs, { data: arr }));
    };
    var handelSubmit = function () {
        if (values.ProductName === "")
            return setErrors(__assign({}, errors, { nameError: "Name Should not be empty" }));
        else if (portionInputs.data.length === 0)
            return;
        var data = {
            name: values.ProductName,
            group: SelectedMainGroups,
            recipe: selectedRecipe,
            portion: portionInputs.data,
            _type: props.type === "edit" ? "edit" : "set",
            data: props.type === "edit" ? props.data.selected : null,
        };
        dataBase_1.default.HandelProducts(data, function (reciveCallback) {
            react_toastify_1.toast("Successfully Updeted", {
                position: "top-right",
                autoClose: 5000,
                type: "success",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            if (props.type === "edit")
                props.dispatchEvent({
                    type: "HANDELCLOSE",
                    toClose: "edit_product",
                });
            else {
                props.dispatchEvent({
                    type: "HANDELCLOSE",
                    toClose: "new_product",
                });
            }
            props.dispatchEvent({
                type: "LOADTABEL",
            });
        });
    };
    var handelPortion = function (propId) {
        var newArr = [];
        newArr = portionInputs.data;
        var input = propId ? propId : "input_" + newArr.length;
        var id = 0;
        if (newArr.length === 0) {
            newArr.push({
                id: input,
                barcode1: "",
                barcode2: "",
                barcode3: "",
                barcode4: "",
                barcode5: "",
                multiplier: "",
                alertOut: 1,
                price: "",
            });
        }
        else {
            id = newArr.length;
            newArr.push({
                id: input,
                barcode1: "",
                barcode2: "",
                barcode3: "",
                barcode4: "",
                barcode5: "",
                multiplier: "",
                alertOut: 1,
                price: "",
            });
        }
        setPortionInputs(__assign({}, portionInputs, { data: newArr }));
    };
    return (React.createElement("div", { className: classes.paper, style: {
            backgroundColor: props.Theme.theme === "light" ? "#F8F8F8" : "#212121",
            color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
            height: props.type === "edit" ? 550 : 500,
        } },
        React.createElement("div", { style: { height: 400 } },
            React.createElement(core_1.Grid, { container: true, spacing: 2 },
                React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                    props.type === "edit" ? (React.createElement("label", null,
                        "Defailt Product Name:",
                        " ",
                        React.createElement("span", { style: { color: "red", textDecoration: "underline" } }, props.data.selected.name),
                        " ")) : null,
                    React.createElement(TextField_1.default, { style: { marginTop: props.type === "edit" ? 20 : 0 }, autoComplete: "ProductName", name: "ProductName", variant: "outlined", required: true, fullWidth: true, onChange: handleTextChange("ProductName"), value: values.ProductName, id: "ProductName", label: "Product Name", error: errors.nameError === "" ? false : true, helperText: errors.nameError })),
                React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                    props.type === "edit" ? (React.createElement("label", null,
                        "Defailt Product Group:",
                        " ",
                        React.createElement("span", { style: { color: "red", textDecoration: "underline" } }, props.data.selected.group))) : null,
                    React.createElement(Autocomplete_1.default, { disabled: props.type === "edit" ? true : false, id: "combo-box-demo", options: mainGroups, onChange: function (event, newValue) {
                            var arr = [];
                            // if (newValue.recipes.length !== 0) {
                            //   newValue.recipes.map((data) => {
                            //     arr.push({ title: data.recipe });
                            //   });
                            // }
                            setRecipes(arr);
                            setSelectedMainGroups(__assign({}, SelectedMainGroups, { group: newValue.title, colors: newValue.colors }));
                        }, getOptionLabel: function (option) { return option.title; }, style: { width: 300, marginTop: props.type === "edit" ? 20 : 0 }, renderInput: function (params) { return (React.createElement(TextField_1.default, __assign({}, params, { label: "Group Code", variant: "outlined", fullWidth: true }))); } }))),
            React.createElement("div", { style: { marginTop: 10 } }),
            React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 }, props.type === "edit" ? (React.createElement("label", null,
                "Defailt Product Group:",
                " ",
                React.createElement("span", { style: { color: "red", textDecoration: "underline" } }, props.data.selected.recipes))) : null),
            React.createElement("div", { style: { marginTop: 30 } },
                React.createElement("div", { style: {
                        width: "100%",
                    } },
                    React.createElement("div", { style: {
                            width: "100%",
                            borderColor: "#aaaaaa",
                            borderStyle: "solid",
                            height: 230,
                            borderWidth: 1,
                            borderRadius: 3,
                            marginTop: 20,
                        } },
                        React.createElement("div", { style: {
                                marginTop: -10,
                                backgroundColor: props.Theme.theme === "light" ? "#F8F8F8" : "#212121",
                                marginLeft: 10,
                                width: 97,
                                paddingLeft: 5,
                            } },
                            React.createElement(core_1.Typography, { variant: "body2" }, "Portion Prices")),
                        React.createElement("div", { style: {
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                            } },
                            React.createElement("div", { style: {
                                    padding: 10,
                                    width: "82%",
                                    maxHeight: 210,
                                    overflow: "hidden",
                                    overflowY: "auto",
                                } },
                                React.createElement("table", { className: classes.table },
                                    React.createElement("thead", null,
                                        React.createElement("tr", null,
                                            React.createElement("th", { className: classes.tableCol }, "BarCode"),
                                            React.createElement("th", { className: classes.tableCol }, "Alert Out"),
                                            React.createElement("th", { className: classes.tableCol }, "Price"))),
                                    React.createElement("tbody", null, portionInputs.data.map(function (tablelist, index) { return (React.createElement("tr", { key: index },
                                        React.createElement("td", { className: classes.tableRow },
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    outline: "none",
                                                    width: 200,
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "barcode1", index);
                                                }, type: "text", defaultValue: tablelist.barcode1, name: tablelist.barcode, placeholder: "barcode 1" }),
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    outline: "none",
                                                    width: 200,
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "barcode2", index);
                                                }, type: "text", defaultValue: tablelist.barcode2, name: tablelist.barcode, placeholder: "barcode 2" }),
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    outline: "none",
                                                    width: 200,
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "barcode3", index);
                                                }, type: "text", defaultValue: tablelist.barcode, name: tablelist.barcode3, placeholder: "barcode 3" }),
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    outline: "none",
                                                    width: 200,
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "barcode4", index);
                                                }, type: "text", defaultValue: tablelist.barcode, name: tablelist.barcode4, placeholder: "barcode 4" }),
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    outline: "none",
                                                    width: 200,
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "barcode5", index);
                                                }, type: "text", defaultValue: tablelist.barcode, name: tablelist.barcode5, placeholder: "barcode 5" })),
                                        React.createElement("td", { className: classes.tableRow },
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    width: 230,
                                                    outline: "none",
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "alertOut", index);
                                                }, type: "number", defaultValue: tablelist.alertOut, name: tablelist.alertOut, placeholder: "alert out" })),
                                        React.createElement("td", { className: classes.tableRow },
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    width: 230,
                                                    outline: "none",
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "price", index);
                                                }, type: "number", defaultValue: tablelist.price, name: tablelist.price, placeholder: "price" })))); }))),
                                props.type !== "edit" ? (React.createElement("div", null, portionInputs.data.length === 0 ? (React.createElement("div", { style: { marginTop: 10 } },
                                    React.createElement(semantic_ui_react_1.Message, { warning: true },
                                        React.createElement(semantic_ui_react_1.Message.Header, null, "Atlest add one row in the Portion Table"),
                                        React.createElement(core_1.Typography, null, "We have to get the Price of the Product this must not be empty. If the Multiplier or Alert Out is left blank it will be set to defult which is 1. Barcode is optional")))) : null)) : null,
                                Loading ? (React.createElement("div", { style: { marginTop: 10 } },
                                    React.createElement(semantic_ui_react_1.Message, { warning: true },
                                        React.createElement(semantic_ui_react_1.Message.Header, null, "Loading product"),
                                        React.createElement(core_1.Typography, null, "Please Wait...")))) : null),
                            React.createElement("div", { style: {
                                    width: "15%",
                                } },
                                React.createElement("div", null,
                                    React.createElement(Button_1.default, { variant: "contained", color: "primary", size: "small", onClick: function () { return handelPortion(false); } }, "Add Portion")),
                                React.createElement("div", { style: { marginTop: 10 } },
                                    React.createElement(Button_1.default, { variant: "contained", color: "secondary", size: "small", onClick: function () { return handelDelete(); } }, "Delete")))))))),
        React.createElement("div", { style: {
                display: "flex",
                marginTop: props.type === "edit" ? 70 : 20,
            } },
            React.createElement("div", null,
                React.createElement(Button_1.default, { style: { marginLeft: 10 }, variant: "contained", color: "primary", onClick: function () { return handelSubmit(); } }, "Save")),
            React.createElement("div", null,
                React.createElement(Button_1.default, { onClick: function () {
                        if (props.type === "edit")
                            props.dispatchEvent({
                                type: "HANDELCLOSE",
                                toClose: "edit_product",
                            });
                        else {
                            props.dispatchEvent({
                                type: "HANDELCLOSE",
                                toClose: "new_product",
                            });
                        }
                    }, style: { marginLeft: 10 }, variant: "contained", color: "secondary" }, "Cancel")))));
};
function mapStateToProps(state) {
    return {
        Cart: state.Cart,
        Theme: state.Theme,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NewProduct);
//# sourceMappingURL=NewProduct.js.map