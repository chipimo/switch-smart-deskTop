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
var react_router_dom_1 = require("react-router-dom");
var core_1 = require("@material-ui/core");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var LinearProgress_1 = require("@material-ui/core/LinearProgress");
var Modal_1 = require("@material-ui/core/Modal");
var styles_1 = require("@material-ui/core/styles");
var dataBase_1 = require("../../redux/dataBase");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}); });
var customStyles = {
    menu: function (provided, state) { return (__assign({}, provided, { borderBottom: "1px dotted pink", fontSize: 22 })); },
};
var index = function (props) {
    var history = react_router_dom_1.useHistory();
    var classes = useStyles();
    var _a = React.useState(true), isLoading = _a[0], setisLoading = _a[1];
    var _b = React.useState(true), SelectDep = _b[0], setSelectDep = _b[1];
    var _c = React.useState(false), IsSettingDb = _c[0], setIsSettingDb = _c[1];
    var _d = React.useState(false), IsnewSetup = _d[0], setIsnewSetup = _d[1];
    var _e = React.useState([]), TempData = _e[0], setTempData = _e[1];
    var _f = React.useState(null), DepSelected = _f[0], setDepSelected = _f[1];
    var _g = React.useState(null), DepName = _g[0], setDepName = _g[1];
    var _h = React.useState(false), open = _h[0], setOpen = _h[1];
    var _j = React.useState({
        depName: "",
    }), values = _j[0], setValues = _j[1];
    var _k = React.useState({
        nameError: "",
    }), errors = _k[0], setErrors = _k[1];
    var handleOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    React.useEffect(function () {
        setTimeout(function () {
            getData();
        }, 1000);
    }, []);
    var getData = function () {
        dataBase_1.default.HandleDepartments({ type: "check" }, function (reciveCallback) {
            if (reciveCallback.exist) {
                setisLoading(false);
                setSelectDep(true);
                var data_1 = [];
                reciveCallback.deps.map(function (items) {
                    data_1.push({
                        value: items.dep_name,
                        label: items.dep_name,
                        color: "#3b3b3",
                        data: items,
                    });
                });
                setTempData(data_1);
            }
            else {
                setSelectDep(false);
                setisLoading(false);
            }
        });
    };
    var handleTextChange = function (event, prop) {
        var _a;
        setValues(__assign({}, values, (_a = {}, _a[prop] = event.target.value, _a)));
        setErrors(__assign({}, errors, { nameError: "" }));
    };
    var OnSubmitForm = function () {
        setIsSettingDb(true);
        if (values.depName === "") {
            setErrors(__assign({}, errors, { nameError: "Department name is required" }));
        }
        else {
            dataBase_1.default.HandleDepartments({
                type: "set",
                data: {
                    department: values.depName,
                    id: "auto",
                    phone: "",
                    shopNo: "",
                    road: "",
                    state: "",
                    country: "",
                    tpin: "",
                    taxType: "",
                    taxRat: "",
                },
            }, function (reciveCallback) {
                if (reciveCallback.isSet) {
                    props.dispatchEvent({
                        type: "SETDEP",
                        dep: reciveCallback.department,
                    });
                    props.dispatchEvent({
                        type: "SETCONFIG",
                        isSet: true,
                        config: reciveCallback.department,
                    });
                }
            });
        }
    };
    var handleDepSelected = function () {
        setisLoading(true);
        setSelectDep(false);
        dataBase_1.default.HandleDepartments({
            type: "setSelected",
            DepSelected: DepSelected,
        }, function (reciveCallback) {
            setTimeout(function () {
                props.dispatchEvent({
                    type: "SETCONFIG",
                    isSet: true,
                    config: reciveCallback,
                });
            }, 1000);
        });
    };
    return (React.createElement("div", { style: {
            width: "100%",
            textAlign: "center",
            justifyContent: "center",
        } },
        React.createElement("div", { style: { paddingTop: 100 } },
            React.createElement(core_1.Typography, { variant: "h4" }, "Welcome To Switch Smart"),
            React.createElement(core_1.Typography, null, "Switch to a Smart world"),
            React.createElement("div", { style: { width: "50%", margin: "auto", marginTop: 30 } },
                React.createElement(core_1.Divider, null),
                isLoading ? (React.createElement("div", { style: { width: "30%", paddingTop: 40, margin: "auto" } },
                    React.createElement(LinearProgress_1.default, { color: "secondary" }),
                    React.createElement("div", null,
                        React.createElement(core_1.Typography, { variant: "overline" }, "Please wait...")))) : (React.createElement("div", null, SelectDep === false ? (React.createElement("div", null,
                    React.createElement("div", null,
                        React.createElement(core_1.Typography, null, "No Department found"),
                        React.createElement("div", { style: { marginTop: 20 } },
                            React.createElement(core_1.Button, { onClick: handleOpen, variant: "contained", color: "primary" }, "Creat new Department"))))) : (React.createElement("div", null,
                    React.createElement(Autocomplete_1.default, { id: "combo-box-demo", options: TempData, getOptionLabel: function (option) { return option.label; }, style: { width: "100%", marginTop: 15 }, onChange: function (event, newValue) {
                            setDepName(newValue.label);
                            setDepSelected(newValue);
                        }, renderInput: function (params) { return (React.createElement(core_1.TextField, __assign({}, params, { label: "Department", variant: "outlined" }))); } }),
                    React.createElement("div", { style: { marginTop: 20 } },
                        React.createElement(core_1.Button, { disabled: DepSelected ? false : true, onClick: handleDepSelected, variant: "contained", color: "primary" }, "Set The Department Selected")))))))),
        React.createElement(Modal_1.default, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: open, className: classes.modal },
            React.createElement(core_1.Paper, { style: {
                    padding: 20,
                    height: "40vh",
                    width: "50%",
                    paddingTop: 20,
                    textAlign: "center",
                    justifyContent: "center",
                } },
                React.createElement("div", null,
                    React.createElement(core_1.Typography, { variant: "h6" }, "Start A New Department")),
                React.createElement("div", { style: { marginTop: 20 } },
                    React.createElement(core_1.TextField, { autoComplete: "depName", name: "depName", variant: "outlined", required: true, fullWidth: true, value: values.depName, onChange: function (e) { return handleTextChange(e, "depName"); }, id: "depName", label: "Department Name", autoFocus: true, error: errors.nameError === "" ? false : true, helperText: errors.nameError, disabled: IsSettingDb ? true : false })),
                React.createElement("div", { style: { marginTop: 20 } },
                    React.createElement(core_1.Button, { disabled: IsSettingDb ? true : false, onClick: OnSubmitForm, variant: "contained", color: "primary", style: { width: 200, marginRight: 10 } }, "Start Department"),
                    React.createElement(core_1.Button, { disabled: IsSettingDb ? true : false, onClick: handleClose, variant: "contained", color: "secondary", style: { width: 200, marginLeft: 10 } }, "Cancel"),
                    IsSettingDb ? (React.createElement("div", { style: { width: "30%", paddingTop: 15, margin: "auto" } },
                        React.createElement(LinearProgress_1.default, { color: "secondary" }),
                        React.createElement("div", null,
                            React.createElement(core_1.Typography, { variant: "overline" }, "Please wait...")))) : null)))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        SocketConn: state.SocketConn,
        Config: state.Config,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map