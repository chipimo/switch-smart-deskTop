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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var Tabs_1 = require("@material-ui/core/Tabs");
var Tab_1 = require("@material-ui/core/Tab");
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var dataBase_1 = require("../../redux/dataBase");
var material_table_1 = require("material-table");
var react_1 = require("react");
var AddBox_1 = require("@material-ui/icons/AddBox");
var ArrowDownward_1 = require("@material-ui/icons/ArrowDownward");
var Check_1 = require("@material-ui/icons/Check");
var ChevronLeft_1 = require("@material-ui/icons/ChevronLeft");
var ChevronRight_1 = require("@material-ui/icons/ChevronRight");
var Clear_1 = require("@material-ui/icons/Clear");
var DeleteOutline_1 = require("@material-ui/icons/DeleteOutline");
var Edit_1 = require("@material-ui/icons/Edit");
var FilterList_1 = require("@material-ui/icons/FilterList");
var FirstPage_1 = require("@material-ui/icons/FirstPage");
var LastPage_1 = require("@material-ui/icons/LastPage");
var Remove_1 = require("@material-ui/icons/Remove");
var SaveAlt_1 = require("@material-ui/icons/SaveAlt");
var Search_1 = require("@material-ui/icons/Search");
var ViewColumn_1 = require("@material-ui/icons/ViewColumn");
var react_toastify_1 = require("react-toastify");
var tableIcons = {
    Add: react_1.forwardRef(function (props, ref) { return React.createElement(AddBox_1.default, null); }),
    Check: react_1.forwardRef(function (props, ref) { return React.createElement(Check_1.default, null); }),
    Clear: react_1.forwardRef(function (props, ref) { return React.createElement(Clear_1.default, null); }),
    Delete: react_1.forwardRef(function (props, ref) { return React.createElement(DeleteOutline_1.default, null); }),
    DetailPanel: react_1.forwardRef(function (props, ref) { return React.createElement(ChevronRight_1.default, null); }),
    Edit: react_1.forwardRef(function (props, ref) { return React.createElement(Edit_1.default, null); }),
    Export: react_1.forwardRef(function (props, ref) { return React.createElement(SaveAlt_1.default, null); }),
    Filter: react_1.forwardRef(function (props, ref) { return React.createElement(FilterList_1.default, null); }),
    FirstPage: react_1.forwardRef(function (props, ref) { return React.createElement(FirstPage_1.default, null); }),
    LastPage: react_1.forwardRef(function (props, ref) { return React.createElement(LastPage_1.default, null); }),
    NextPage: react_1.forwardRef(function (props, ref) { return React.createElement(ChevronRight_1.default, null); }),
    PreviousPage: react_1.forwardRef(function (props, ref) { return React.createElement(ChevronLeft_1.default, null); }),
    ResetSearch: react_1.forwardRef(function (props, ref) { return React.createElement(Clear_1.default, null); }),
    Search: react_1.forwardRef(function (props, ref) { return React.createElement(Search_1.default, null); }),
    SortArrow: react_1.forwardRef(function (props, ref) { return React.createElement(ArrowDownward_1.default, null); }),
    ThirdStateCheck: react_1.forwardRef(function (props, ref) { return React.createElement(Remove_1.default, null); }),
    ViewColumn: react_1.forwardRef(function (props, ref) { return React.createElement(ViewColumn_1.default, null); }),
};
function TabPanel(props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    return (React.createElement(core_1.Typography, __assign({ component: "div", role: "tabpanel", hidden: value !== index, id: "vertical-tabpanel-" + index, "aria-labelledby": "vertical-tab-" + index }, other), value === index && React.createElement(core_1.Box, { p: 3 }, children)));
}
var useStyles = styles_1.makeStyles(function (theme) { return ({
    Treeroot: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: "84vh",
    },
    tableroot: {
        width: "60vw",
        height: "65vh",
        overflow: "auto",
        marginTop: 10,
    },
    tabs: {
        borderRight: "1px solid " + theme.palette.divider,
        backgroundColor: theme.palette.background.paper,
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: "25ch",
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
    _buttonLinks: {
        color: "#5FA3F6",
        textDecoration: "underline",
        "&:hover": {
            color: "red",
        },
        cursor: "pointer",
        marginLeft: 10,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: 180,
    },
}); });
function a11yProps(index) {
    return {
        id: "vertical-tab-" + index,
        "aria-controls": "vertical-tabpanel-" + index,
    };
}
var Tax_Template = function (props) {
    var classes = useStyles();
    var _a = React.useState(0), value = _a[0], setValue = _a[1];
    var _b = React.useState(0), selected = _b[0], setSelected = _b[1];
    var _c = React.useState({
        ProductName: "",
        tax: "",
        tpin: "",
    }), values = _c[0], setValues = _c[1];
    var _d = React.useState({
        nameError: "",
        taxError: "",
    }), errors = _d[0], setErrors = _d[1];
    var _e = React.useState([]), taxMapping = _e[0], setTaxMapping = _e[1];
    var _f = React.useState([]), TaxMappingOut = _f[0], setTaxMappingOut = _f[1];
    var _g = React.useState({
        data: [],
        columns: [
            {
                title: "Product Name",
                field: "tabname",
            },
        ],
    }), Taxedproducts = _g[0], setTaxedproducts = _g[1];
    var _h = React.useState({
        data: [],
        columns: [
            {
                title: "Product Name",
                field: "tabname",
            }
        ],
    }), products = _h[0], setProducts = _h[1];
    var _j = React.useState({
        columns: [
            {
                title: "Product Name",
                field: "ItemName",
            },
        ],
        data: [],
    }), state = _j[0], setState = _j[1];
    var _k = React.useState([]), MainCategory = _k[0], setMainCategory = _k[1];
    var NodeId = 0;
    React.useEffect(function () {
        LoadList();
        setTimeout(function () {
            setValues(__assign({}, values, { tax: props.Config.config.config[0].taxRat, ProductName: props.Config.config.config[0].taxType, tpin: props.Config.config.config[0].tpin }));
        }, 700);
    }, []);
    var LoadList = function () {
        dataBase_1.default.HandelProducts({
            _type: "getPOSList",
            layoutType: "all_P",
        }, function (reciveCallback) {
            var arr = [];
            var arrOut = [];
            reciveCallback.tabs.map(function (list) {
                // console.log(list);
                if (list.isTaxEnabled) {
                    arr.push(list);
                }
                else {
                    arrOut.push(list);
                }
            });
            setProducts(__assign({}, products, { data: arr }));
            setTaxedproducts(__assign({}, Taxedproducts, { data: arrOut }));
        });
    };
    var handleChange = function (event, newValue) {
        setValue(newValue);
        setSelected(newValue);
    };
    var handleTextChange = function (prop) { return function (event) {
        var _a;
        setValues(__assign({}, values, (_a = {}, _a[prop] = event.target.value, _a)));
        if (prop === "ProductName")
            setErrors(__assign({}, errors, { nameError: "" }));
        if (prop === "alertOut")
            setErrors(__assign({}, errors, { taxError: "" }));
    }; };
    var handleSave = function () {
        // console.log(taxMapping);
        if (values.ProductName !== props.Config.config.config[0].taxType ||
            values.tpin !== props.Config.config.config[0].tpin ||
            values.tax !== props.Config.config.config[0].taxRat)
            dataBase_1.default.HandleTaxUpdate(values, function (callback) {
                react_toastify_1.toast("Successfully Updated tax", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "success",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                LoadList();
            });
        if (taxMapping.length !== 0)
            dataBase_1.default.HandelProducts({ _type: "Add_filter", taxMapping: taxMapping }, function (reciveCallback) {
                react_toastify_1.toast("Successfully Added to filtered List", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "success",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                LoadList();
            });
    };
    var HandleFilterdDelete = function () {
        // console.log(data);
        dataBase_1.default.HandelProducts({ _type: "remove_filter", TaxMappingOut: TaxMappingOut }, function (reciveCallback) {
            react_toastify_1.toast("Successfully Removed from filtered List", {
                position: "top-right",
                autoClose: 5000,
                type: "success",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            LoadList();
        });
    };
    return (React.createElement("div", null,
        React.createElement("div", { style: {
                width: "100%",
                display: "flex",
                height: "70vh",
                backgroundColor: props.Theme.theme === "light" ? "#fff" : "#",
            } },
            React.createElement(Tabs_1.default, { orientation: "vertical", variant: "scrollable", value: value, onChange: handleChange, "aria-label": "Vertical tabs example", className: classes.tabs },
                React.createElement(Tab_1.default, __assign({ label: "General Settings" }, a11yProps(0), { style: {
                        backgroundColor: selected === 0 ? "#0A56D9" : "transparent",
                        color: selected === 0
                            ? "#fff"
                            : props.Theme.theme === "light"
                                ? "#3b3b3b"
                                : "#ccc",
                    } })),
                React.createElement(Tab_1.default, __assign({ label: "Product list" }, a11yProps(1), { style: {
                        backgroundColor: selected === 1 ? "#0A56D9" : "transparent",
                        color: selected === 1
                            ? "#fff"
                            : props.Theme.theme === "light"
                                ? "#3b3b3b"
                                : "#ccc",
                    } })),
                React.createElement(Tab_1.default, __assign({ label: "Trx List" }, a11yProps(2), { style: {
                        backgroundColor: selected === 2 ? "#0A56D9" : "transparent",
                        color: selected === 2
                            ? "#fff"
                            : props.Theme.theme === "light"
                                ? "#3b3b3b"
                                : "#ccc",
                    } }))),
            React.createElement(TabPanel, { value: value, index: 0 },
                React.createElement("div", { style: { width: 600 } },
                    React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                        React.createElement(core_1.TextField, { style: { marginTop: props.type === "edit" ? 20 : 0 }, autoComplete: "Name", name: "ProductName", variant: "outlined", fullWidth: true, value: values.ProductName, onChange: handleTextChange("ProductName"), id: "ProductName", label: "Name", autoFocus: true, error: errors.nameError === "" ? false : true, helperText: errors.nameError })),
                    React.createElement(core_1.Grid, { style: { marginTop: 20 }, item: true, xs: 12, sm: 6 },
                        React.createElement(core_1.TextField, { style: { marginTop: props.type === "edit" ? 20 : 0 }, autoComplete: "tpin", name: "tpin", variant: "outlined", fullWidth: true, value: values.tpin, onChange: handleTextChange("tpin"), id: "tpin", label: "T Pin", autoFocus: true, error: errors.nameError === "" ? false : true, helperText: errors.nameError })),
                    React.createElement("div", { style: { marginTop: 25 } },
                        React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                            React.createElement(core_1.FormControl, null,
                                React.createElement(core_1.Input, { id: "standard-adornment-percent", value: values.tax, onChange: handleTextChange("tax"), endAdornment: React.createElement(core_1.InputAdornment, { position: "end" }, "%"), "aria-describedby": "standard-percent-helper-text", inputProps: {
                                        "aria-label": "percent",
                                    } }),
                                React.createElement(core_1.FormHelperText, { id: "standard-percent-helper-text" }, "Tax Percent")))))),
            React.createElement(TabPanel, { value: value, index: 1 },
                React.createElement("div", { className: classes.tableroot },
                    React.createElement(material_table_1.default, { icons: tableIcons, title: "Product list", columns: products.columns, data: products.data, options: {
                            selection: true,
                        }, onSelectionChange: function (rows) {
                            setTaxMapping(rows);
                        } }))),
            React.createElement(TabPanel, { value: value, index: 2 },
                React.createElement("div", { className: classes.tableroot },
                    React.createElement(material_table_1.default, { icons: tableIcons, title: "Product list", columns: Taxedproducts.columns, data: Taxedproducts.data, options: {
                            selection: true,
                        }, onSelectionChange: function (rows) {
                            setTaxMappingOut(rows);
                        } })))),
        React.createElement("div", { style: {
                height: "13.5vh",
            } }, value === 2 ? (React.createElement(core_1.Button, { variant: "contained", color: "primary", disabled: TaxMappingOut.length === 0 ? true : false, onClick: HandleFilterdDelete, style: { marginLeft: 20, marginTop: 11 } }, "Delete")) : (React.createElement(core_1.Button, { variant: "contained", color: "primary", disabled: taxMapping.length === 0 ? true : false, onClick: handleSave, style: { marginLeft: 20, marginTop: 11 } }, "Save")))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        Config: state.Config,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Tax_Template);
//# sourceMappingURL=Tax_Template.js.map