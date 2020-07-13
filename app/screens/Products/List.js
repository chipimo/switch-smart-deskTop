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
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var SvgIcon_1 = require("@material-ui/core/SvgIcon");
var styles_1 = require("@material-ui/core/styles");
var TreeItem_1 = require("@material-ui/lab/TreeItem");
var Collapse_1 = require("@material-ui/core/Collapse");
var web_cjs_1 = require("react-spring/web.cjs"); // web.cjs is required for IE 11 support
var NewProduct_1 = require("./NewProduct");
var ProductList_1 = require("./ProductList");
var dataBase_1 = require("../../redux/dataBase");
var semantic_ui_react_1 = require("semantic-ui-react");
var TextField_1 = require("@material-ui/core/TextField");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var PropTypes = require("prop-types");
function MinusSquare(props) {
    return (React.createElement(SvgIcon_1.default, __assign({ fontSize: "inherit" }, props),
        React.createElement("path", { d: "M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" })));
}
function PlusSquare(props) {
    return (React.createElement(SvgIcon_1.default, __assign({ fontSize: "inherit" }, props),
        React.createElement("path", { d: "M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" })));
}
function CloseSquare(props) {
    return (React.createElement(SvgIcon_1.default, __assign({ className: "close", fontSize: "inherit" }, props),
        React.createElement("path", { d: "M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" })));
}
function TransitionComponent(props) {
    var style = web_cjs_1.useSpring({
        from: { opacity: 0, transform: "translate3d(20px,0,0)" },
        to: {
            opacity: props.in ? 1 : 0,
            transform: "translate3d(" + (props.in ? 0 : 20) + "px,0,0)",
        },
    });
    return (React.createElement(web_cjs_1.animated.div, { style: style },
        React.createElement(Collapse_1.default, __assign({}, props))));
}
TransitionComponent.propTypes = {
    /**
     * Show the component; triggers the enter or exit states
     */
    in: PropTypes.bool,
};
var StyledTreeItem = styles_1.withStyles(function (theme) { return ({
    iconContainer: {
        "& .close": {
            opacity: 0.3,
        },
    },
    group: {
        marginLeft: 12,
        paddingLeft: 12,
        borderLeft: "1px dashed " + styles_1.fade(theme.palette.text.primary, 0.4),
    },
}); })(function (props) { return (React.createElement(TreeItem_1.default, __assign({}, props, { TransitionComponent: TransitionComponent }))); });
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: "97%",
        padding: 10,
        backgroundColor: theme.palette.background.paper,
        overflowX: "auto",
        maxHeight: "60vh",
        paddingBottom: 20,
    },
    listSection: {
        backgroundColor: "inherit",
    },
    ul: {
        backgroundColor: "inherit",
        padding: 0,
    },
    rootSearch: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 200,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    searchBar: {
        outline: "none",
        border: "none",
        width: 400,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    addButton: {
        borderWidth: 1,
        width: "100%",
        borderStyle: "solid",
        borderColor: "transparent",
        borderBottomColor: "#0E2302",
        backgroundColor: "#2A6A08",
        color: "#ccc",
        padding: 5,
        transition: "all 1s",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#0E2302",
            borderBottomColor: "#091701",
            color: "#fff",
        },
    },
    addButton2: {
        borderWidth: 1,
        width: "100%",
        borderStyle: "solid",
        borderColor: "transparent",
        borderBottomColor: "#0E2302",
        backgroundColor: "#00508F",
        color: "#ccc",
        padding: 5,
        transition: "all 1s",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#00233F",
            borderBottomColor: "#00233F",
            color: "#fff",
        },
    },
    paper: {
        position: "absolute",
        width: 900,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
    },
}); });
var NodeId = 0;
var isCalled = false;
var ProductList = function (props) {
    var classes = useStyles();
    var _a = React.useState(false), openNewProduct = _a[0], setopenNewProduct = _a[1];
    var _b = React.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = React.useState([]), MainCategory = _c[0], setMainCategory = _c[1];
    var _d = React.useState(true), LoadOnceOff = _d[0], setLoadOnceOff = _d[1];
    React.useEffect(function () {
        if (props.Model.toClose === "new_product") {
            props.dispatchEvent({ type: "HANDELCLEAR" });
            CloseOpenNewProduct();
        }
        else if (props.LoadTabel.load) {
            dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_P" }, function (receiveCallback) {
                setTimeout(function () {
                    // setState({ ...state, rows: receiveCallback.productsList });
                    props.dispatchEvent({
                        type: "ProductList",
                        list: receiveCallback.productsList,
                    });
                }, 100);
            });
            props.dispatchEvent({ type: "CLEARLOADTABEL" });
        }
        if (LoadOnceOff) {
            setLoadOnceOff(false);
            dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_P" }, function (receiveCallback) {
                setTimeout(function () {
                    // console.log(receiveCallback);
                    setMainCategory(receiveCallback.productsList);
                    // console.log(receiveCallback);
                    // setTabsList(receiveCallback.data);
                    // setCategorylist(receiveCallback.categorylist);
                }, 100);
            });
        }
    }, [props]);
    var handleOpenNewProduct = function () {
        setopenNewProduct(true);
    };
    var search = function (event, item) {
        if (item !== null)
            dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "searchedProduct", id: item }, function (receiveCallback) {
                props.dispatchEvent({
                    type: "ProductList",
                    list: receiveCallback,
                });
            });
        else
            dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_P" }, function (receiveCallback) {
                props.dispatchEvent({
                    type: "ProductList",
                    list: receiveCallback.productsList,
                });
            });
    };
    var CloseOpenNewProduct = function () {
        setopenNewProduct(false);
    };
    var HandelSelectedProduct = function (data) {
        props.dispatchEvent({ type: "SETPRODUCTS", products: data });
    };
    return (React.createElement("div", { style: {
            width: "100%",
            display: "flex",
            padding: 4,
            backgroundColor: props.Theme.theme === "light" ? "#E5E5E5" : "#212121",
        } },
        React.createElement("div", { style: {
                width: "80%",
                height: "84vh",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: props.Theme.theme === "light" ? "#929292" : "#CECECE",
                marginTop: 1,
            } },
            React.createElement(ProductList_1.default, null)),
        React.createElement("div", { style: {
                width: "20%",
                height: "80vh",
                marginTop: 1,
                padding: 6,
            } },
            React.createElement("div", null,
                React.createElement("div", { onClick: function () { return handleOpenNewProduct(); }, style: { marginTop: 10, display: "flex" } },
                    React.createElement(core_1.Typography, { className: classes.addButton },
                        React.createElement(semantic_ui_react_1.Icon, { name: "plus cart" }),
                        " Add Product"))),
            React.createElement("div", null, isLoading ? (React.createElement("div", { style: { marginTop: 10, display: "flex" } },
                React.createElement(core_1.Typography, { className: classes.addButton2 },
                    React.createElement(semantic_ui_react_1.Icon, { name: "sync alternate", loading: true }),
                    " Please wait..."))) : (React.createElement("div", { onClick: function () {
                    setIsLoading(true);
                    props.dispatchEvent({
                        type: "HANDELCLOSE",
                        toClose: "LoadServer_all_products",
                    });
                    setTimeout(function () {
                        setIsLoading(false);
                    }, 10000);
                }, style: { marginTop: 10, display: "flex" } },
                React.createElement(core_1.Typography, { className: classes.addButton2 },
                    React.createElement(semantic_ui_react_1.Icon, { name: "plus cart" }),
                    " Get Server Products")))),
            React.createElement("div", { style: { marginTop: 10 } },
                React.createElement(core_1.Divider, null),
                React.createElement("div", null,
                    React.createElement(core_1.Button, { onClick: function () {
                            return dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_P" }, function (receiveCallback) {
                                setTimeout(function () {
                                    props.dispatchEvent({
                                        type: "ProductList",
                                        list: receiveCallback.productsList,
                                    });
                                }, 100);
                            });
                        } }, "Load all products")),
                React.createElement(core_1.Divider, null),
                React.createElement("div", { style: { marginTop: 10 } },
                    React.createElement(Autocomplete_1.default, { id: "combo-box-demo", options: MainCategory, getOptionLabel: function (option) { return option.ItemName; }, onChange: search, renderInput: function (params) { return (React.createElement(TextField_1.default, __assign({}, params, { label: "Search products", variant: "outlined" }))); } })))),
        React.createElement(core_1.Modal, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: openNewProduct, className: classes.modal },
            React.createElement("div", { className: classes.paper },
                React.createElement(NewProduct_1.default, { type: "add" })))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        Model: state.Model,
        LoadTabel: state.LoadTabel,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ProductList);
//# sourceMappingURL=List.js.map