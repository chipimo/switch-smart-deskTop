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
var styles_1 = require("@material-ui/core/styles");
var TextField_1 = require("@material-ui/core/TextField");
var Button_1 = require("@material-ui/core/Button");
var core_1 = require("@material-ui/core");
var react_toastify_1 = require("react-toastify");
var dataBase_1 = require("../../redux/dataBase");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    paper: {
        position: "absolute",
        width: "68%",
        padding: 15,
        height: "83vh",
        overflow: "auto",
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
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}); });
var Product_Groups = function (props) {
    var classes = useStyles();
    var _a = React.useState({
        data: [],
    }), portionInputs = _a[0], setPortionInputs = _a[1];
    var _b = React.useState({
        backgroundColor: "#3b3b3b",
        textColor: "#fff",
    }), colors = _b[0], setColor = _b[1];
    var _c = React.useState({
        GroupName: "",
    }), values = _c[0], setValues = _c[1];
    var _d = React.useState({
        groupError: "",
    }), errors = _d[0], setErrors = _d[1];
    var _e = React.useState([]), mainGroups = _e[0], setMainGroups = _e[1];
    var _f = React.useState([]), mainRecipes = _f[0], setMainRecipes = _f[1];
    var _g = React.useState(false), OpenProductList = _g[0], setOpenProductList = _g[1];
    React.useEffect(function () {
        dataBase_1.default.HandelGroup({ _type: "get" }, function (reciveCallback) {
            setMainGroups(reciveCallback.data);
        });
    }, [props]);
    var CloseProductList = function () {
        setOpenProductList(false);
    };
    var OpenRecipesList = function (data) {
        setMainRecipes(data.data);
        setOpenProductList(true);
    };
    var handleTextChange = function (prop) { return function (event) {
        var _a;
        setValues(__assign({}, values, (_a = {}, _a[prop] = event.target.value, _a)));
        if (prop === "GroupName")
            setErrors(__assign({}, errors, { groupError: "" }));
    }; };
    var handelColorChange = function (type, InputColor) {
        var _a;
        setColor(__assign({}, colors, (_a = {}, _a[type] = InputColor, _a)));
    };
    var handelOnTextPartonChage = function (value, id, index) {
        portionInputs.data[index].recipe = value;
        setPortionInputs(__assign({}, portionInputs, { data: portionInputs.data }));
    };
    var handelDelete = function () {
        var arr = portionInputs.data;
        var filter = arr.findIndex(function (x) { return x.id === 1; });
        arr.splice(filter, 1);
        setPortionInputs(__assign({}, portionInputs, { data: arr }));
    };
    var handelSubmit = function () {
        if (values.GroupName === "")
            return setErrors(__assign({}, errors, { groupError: "Name Should not be empty" }));
        var Data = {
            _type: "set",
            group: values.GroupName,
            recipes: portionInputs.data,
            colors: colors,
        };
        dataBase_1.default.HandelGroup(Data, function (callback) {
            if (callback.isSet) {
                setValues(__assign({}, values, { GroupName: "" }));
                setPortionInputs(__assign({}, portionInputs, { data: [] }));
                dataBase_1.default.HandelGroup({ _type: "get" }, function (reciveCallback) {
                    setMainGroups(reciveCallback.data);
                });
                react_toastify_1.toast("Successfully Added " + values.GroupName + " ", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "success",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                react_toastify_1.toast("\"" + values.GroupName + "\" group already exit", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "error",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    };
    var handelPortion = function () {
        var newArr = [];
        newArr = portionInputs.data;
        var input = "input_" + newArr.length;
        var id = 0;
        if (newArr.length === 0) {
            newArr.push({
                recipe: "",
            });
        }
        else {
            id = newArr.length;
            newArr.push({
                recipe: "",
            });
        }
        setPortionInputs(__assign({}, portionInputs, { data: newArr }));
    };
    return (React.createElement("div", { className: classes.paper, style: {
            backgroundColor: props.Theme.theme === "light" ? "#F8F8F8" : "#212121",
            color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
        } },
        React.createElement("div", { style: { paddingBottom: 20 } },
            React.createElement(core_1.Grid, { container: true, spacing: 2 },
                React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                    React.createElement(TextField_1.default, { autoComplete: "GroupName", name: "GroupName", variant: "outlined", required: true, fullWidth: true, value: values.GroupName, onChange: handleTextChange("GroupName"), id: "GroupName", label: "Group Name", color: "secondary", error: errors.groupError === "" ? false : true, helperText: errors.groupError })),
                React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                    React.createElement("div", { style: { display: "flex" } },
                        React.createElement("div", null,
                            React.createElement(core_1.Typography, null, "Button Color"),
                            React.createElement("input", { onChange: function (e) {
                                    handelColorChange("backgroundColor", e.target.value);
                                }, type: "color" })),
                        React.createElement("div", { style: { marginLeft: 15 } },
                            React.createElement(core_1.Typography, null, "Button Text Color"),
                            React.createElement("input", { onChange: function (e) {
                                    handelColorChange("textColor", e.target.value);
                                }, type: "color" })),
                        React.createElement("div", { style: {
                                marginLeft: 15,
                                borderColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                padding: 15,
                            } },
                            "Button Preview",
                            React.createElement("div", null,
                                React.createElement(Button_1.default, { style: {
                                        // width: 150,
                                        backgroundColor: colors.backgroundColor,
                                        color: colors.textColor,
                                    } },
                                    React.createElement(core_1.Typography, { style: { width: "100%" } }, values.GroupName)))))))),
        React.createElement("div", { style: {
                display: "flex",
                marginTop: 10,
            } },
            React.createElement("div", null,
                React.createElement(Button_1.default, { style: { marginLeft: 10 }, variant: "contained", color: "primary", onClick: function () { return handelSubmit(); } }, "Save"))),
        React.createElement("div", { style: { marginTop: 10 } },
            React.createElement("table", { style: {
                    width: "70%",
                    borderColor: "#ccc",
                    borderWidth: 1,
                    borderStyle: "solid",
                } },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", { className: classes.tableCol }, "Action"),
                        React.createElement("th", { className: classes.tableCol }, "Group"))),
                React.createElement("tbody", null, mainGroups.map(function (list, index) { return (React.createElement("tr", { key: index },
                    React.createElement("td", { className: classes.tableRow },
                        React.createElement("button", { onClick: function () {
                                dataBase_1.default.HandelGroup({ _type: "deleteGroup", group: list }, function (callback) {
                                    react_toastify_1.toast("Successfully deleted !", {
                                        position: "top-right",
                                        autoClose: 5000,
                                        type: "success",
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                    dataBase_1.default.HandelGroup({ _type: "get" }, function (reciveCallback) {
                                        setMainGroups(reciveCallback.data);
                                    });
                                });
                            } }, "delete")),
                    React.createElement("td", { className: classes.tableRow }, list.group))); }))),
            React.createElement(core_1.Modal, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: OpenProductList, className: classes.modal, onClose: CloseProductList },
                React.createElement(core_1.Paper, { elevation: 12, style: { padding: 15 } }, mainRecipes.map(function (list, index) { return (React.createElement("tr", { key: index },
                    React.createElement("td", { className: classes.tableRow },
                        React.createElement("button", null, "delete")),
                    React.createElement("td", { className: classes.tableRow }, list.recipe))); }))))));
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Product_Groups);
//# sourceMappingURL=Product_Groups.js.map