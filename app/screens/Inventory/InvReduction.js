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
var dataBase_1 = require("../../redux/dataBase");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var react_toastify_1 = require("react-toastify");
var Currency = require("react-currency-formatter");
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
var useStyles = styles_1.makeStyles(function (theme) { return ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        position: "absolute",
        width: 380,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 4, 3),
    },
}); });
var InvReduction = function (props) {
    var classes = useStyles();
    var _a = React.useState(true), loadOnce = _a[0], setLoadOnce = _a[1];
    var _b = React.useState(false), OpenTrans = _b[0], setOpenTrans = _b[1];
    var _c = React.useState({}), selectedItem = _c[0], setSelectedItem = _c[1];
    var _d = React.useState({ data: [] }), multi = _d[0], setMulti = _d[1];
    var _e = React.useState({}), selectedGood = _e[0], setSelectedGood = _e[1];
    var _f = React.useState({
        columns: [
            {
                title: "Product Name ",
                field: "ItemName",
            },
            {
                title: "Group",
                field: "group",
            },
            {
                title: "In Store",
                field: "amountInstore",
            },
        ],
        data: [],
    }), state = _f[0], setState = _f[1];
    React.useEffect(function () {
        if (loadOnce) {
            props.dispatchEvent({ type: "LOADTABEL" });
            setLoadOnce(false);
        }
        if (props.LoadTabel.load) {
            LoadData();
            props.dispatchEvent({ type: "CLEARLOADTABEL" });
        }
    }, [props]);
    var LoadData = function () {
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_purcheased" }, function (receiveCallback) {
            setTimeout(function () {
                setState(__assign({}, state, { data: receiveCallback }));
            }, 100);
        });
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_P" }, function (receiveCallback) {
            setMulti(__assign({}, multi, { data: receiveCallback.mulitList }));
        });
    };
    var HandleQutChange = function (value, data) {
        var dataSelected = {
            value: value,
            selectedItem: selectedItem,
        };
        setSelectedGood(dataSelected);
    };
    var done = function () {
        // console.log(selectedGood.data)
        setOpenTrans(false);
        dataBase_1.default.HandelProducts({ _type: "invReduction", data: selectedGood }, function (receiveCallback) {
            react_toastify_1.toast("Successfully Purchased " + receiveCallback.name + " ", {
                position: "top-right",
                autoClose: 5000,
                type: "success",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    };
    return (React.createElement("div", null,
        React.createElement("div", { style: {
                width: "79%",
                height: "80vh",
                overflow: "auto",
                paddingLeft: 3,
                paddingRight: 3,
            } },
            React.createElement(material_table_1.default, { icons: tableIcons, title: "Inventory Reduction ", columns: state.columns, actions: [
                    {
                        icon: "send",
                        tooltip: "Reduce",
                        onClick: function (event, rowData) {
                            setSelectedItem(rowData);
                            setTimeout(function () {
                                setOpenTrans(true);
                            }, 300);
                        },
                    },
                ], data: state.data })),
        React.createElement(core_1.Modal, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: OpenTrans, onClose: function () { return setOpenTrans(false); }, className: classes.modal },
            React.createElement("div", { className: classes.paper },
                React.createElement("div", { style: {
                        height: 150,
                        overflow: "auto",
                        paddingLeft: 3,
                        paddingRight: 3,
                        paddingTop: 3,
                        color: "#fff",
                    } },
                    selectedItem.ItemName,
                    React.createElement("div", { style: { marginTop: 10 } },
                        React.createElement(core_1.Divider, null),
                        React.createElement("div", { style: { marginTop: 5, height: 110, overflow: "auto" } },
                            React.createElement("li", { style: {
                                    borderColor: "transparent",
                                    borderWidth: 1,
                                    borderStyle: "solid",
                                    borderBottomColor: "#ccc",
                                } },
                                React.createElement("div", { style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                    } },
                                    React.createElement(Currency, { locale: "en", quantity: selectedItem.sallingprice, symbol: "K" }),
                                    React.createElement("div", null, selectedItem.amountInstore),
                                    "-",
                                    React.createElement("input", { disabled: selectedItem.amountInstore === 0 ? true : false, style: { width: 50 }, defaultValue: 0, onInput: function (e) {
                                            HandleQutChange(e.target.value, selectedItem);
                                        }, type: "text" })))))),
                React.createElement(core_1.Button, { onClick: done, style: { marginTop: 10 }, variant: "contained" }, "Done")))));
};
function mapStateToProps(state) {
    return {
        LoadTabel: state.LoadTabel,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(InvReduction);
//# sourceMappingURL=InvReduction.js.map