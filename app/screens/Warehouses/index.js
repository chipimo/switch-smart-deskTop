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
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TablePagination_1 = require("@material-ui/core/TablePagination");
var TableRow_1 = require("@material-ui/core/TableRow");
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var OpenWithOutlined_1 = require("@material-ui/icons/OpenWithOutlined");
var dataBase_1 = require("../../redux/dataBase");
var react_toastify_1 = require("react-toastify");
var updater_1 = require("../../redux/dataBase/updater");
var semantic_ui_react_1 = require("semantic-ui-react");
var Currency = require("react-currency-formatter");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: "73vh",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        position: "absolute",
        width: 600,
        height: 500,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 4, 3),
    },
    inline: {
        display: "inline",
    },
    list: {
        maxHeight: 400,
        overflow: "auto",
    },
    listHeader: {
        backgroundColor: theme.palette.background.paper,
    },
}); });
var columns = [
    {
        id: "checkBox",
        label: "",
        minWidth: 30,
        align: "left",
        format: function (value) { return value.toLocaleString(); },
    },
    { id: "ItemName", label: "Product", minWidth: 90 },
    {
        id: "group",
        label: "Group",
        minWidth: 90,
        align: "right",
        format: function (value) { return value.toLocaleString(); },
    },
    {
        id: "sallingprice",
        label: "Price",
        minWidth: 70,
        align: "right",
        format: function (value) { return value.toFixed(2); },
    },
    {
        id: "Instore",
        label: "In Store",
        minWidth: 80,
        align: "right",
        format: function (value) { return value.toLocaleString(); },
    },
];
var initialState = {
    mouseX: null,
    mouseY: null,
};
var initialState2 = {
    mouseX: null,
    mouseY: null,
};
var index = function (props) {
    var classes = useStyles();
    var _a = React.useState(0), page = _a[0], setPage = _a[1];
    var _b = React.useState(10), rowsPerPage = _b[0], setRowsPerPage = _b[1];
    var _c = React.useState(), selectedId = _c[0], setSelectedId = _c[1];
    var _d = React.useState(), selected = _d[0], setSelected = _d[1];
    var _e = React.useState(false), openNewProduct = _e[0], setopenNewProduct = _e[1];
    var _f = React.useState({
        rows: [],
    }), state = _f[0], setState = _f[1];
    var _g = React.useState({}), Syncstate = _g[0], setSyncState = _g[1];
    var _h = React.useState(initialState), menustate = _h[0], setMenuState = _h[1];
    var _j = React.useState(initialState2), menustate2 = _j[0], setMenuState2 = _j[1];
    var _k = React.useState([]), multi = _k[0], SetMulti = _k[1];
    var _l = React.useState(false), isMulti = _l[0], setisMulti = _l[1];
    var _m = React.useState(false), OpenProductList = _m[0], setOpenProductList = _m[1];
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var _o = React.useState(false), open = _o[0], setOpen = _o[1];
    var _p = React.useState(false), LoadingData = _p[0], setLoadingData = _p[1];
    var handleDailogClickOpen = function () {
        setOpen(true);
    };
    var handleDailogClose = function () {
        setOpen(false);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    React.useEffect(function () {
        if (props.Model.toClose === "edit_product") {
            props.dispatchEvent({ type: "HANDELCLEAR" });
            // console.log("text");
            CloseOpenNewProduct();
        }
        else if (props.LoadTabel.load) {
            props.dispatchEvent({ type: "CLEARLOADTABEL" });
        }
        else if (props.Model.toClose === "LoadServer_all_products") {
            props.dispatchEvent({ type: "HANDELCLEAR" });
            dataBase_1.default.HandelProducts({ _type: "getServerProducts" }, function (receiveCallback) {
                setTimeout(function () { }, 100);
            });
        }
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_purcheased" }, function (receiveCallback) {
            setTimeout(function () {
                if (receiveCallback.length > 15)
                    setRowsPerPage(25);
                setState(__assign({}, state, { rows: receiveCallback }));
            }, 100);
        });
    }, [props]);
    var handleClick = function (event, data) {
        event.preventDefault();
        setMenuState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };
    var handleClick2 = function (event, data) {
        event.preventDefault();
        setMenuState2({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };
    var handleClose = function () {
        setMenuState(initialState);
    };
    var handleCloseSync = function () {
        setMenuState2(initialState2);
    };
    var handleOpenMulti = function () {
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "mulitList", name: selected.ItemName }, function (receiveCallback) {
            setTimeout(function () {
                SetMulti(receiveCallback.data);
            }, 100);
        });
        handleClose();
        HandelOpenProductList();
    };
    var CloseProductList = function () {
        setOpenProductList(false);
    };
    var CloseOpenNewProduct = function () {
        setopenNewProduct(false);
        handleClose();
    };
    var HandelOpenProductList = function () {
        setOpenProductList(true);
    };
    var HandelAddToInventory = function () {
        var purchaseSelected = [selected];
        var data = {
            _type: "add_to_store",
            purchaseSelected: purchaseSelected,
            dep: props.Dep.dep,
        };
        dataBase_1.default.HandelProducts(data, function (reciveCallback) {
            react_toastify_1.toast("Successfully Purchased " + (reciveCallback.data.number === 1
                ? reciveCallback.data.name
                : reciveCallback.data.number + " Products") + " ", {
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
    var HandelDelete = function (serverdelete) {
        handleDailogClose();
        dataBase_1.default.HandelProducts({ _type: "delete", serverdelete: serverdelete, selected: selected }, function (callback) {
            props.dispatchEvent({ type: "LOADTABEL" });
            react_toastify_1.toast("Successfully Purchased Successfully Deleted " + callback.name, {
                position: "top-right",
                autoClose: 5000,
                type: "success",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleClose();
        });
    };
    var UploadProduct = function () {
        console.log(Syncstate);
        updater_1.default._runUpates(Syncstate, function (callback) { });
    };
    var DeleteProductServer = function (data) {
        console.log(data);
    };
    return (React.createElement("div", { style: {
            width: "100%",
            height: "85vh",
            overflow: "auto",
        } },
        React.createElement(core_1.Paper, { className: classes.root },
            React.createElement(semantic_ui_react_1.Loader, { active: LoadingData }, "Loading Data From Server..."),
            React.createElement(TableContainer_1.default, { className: classes.container },
                React.createElement(Table_1.default, { size: "small", stickyHeader: true, "aria-label": "sticky table" },
                    React.createElement(TableHead_1.default, null,
                        React.createElement(TableRow_1.default, null,
                            columns.map(function (column) { return (React.createElement(TableCell_1.default, { key: column.id, align: column.align, style: { minWidth: column.minWidth } },
                                React.createElement(core_1.Typography, { variant: "h6" }, column.label))); }),
                            React.createElement(TableCell_1.default, null))),
                    React.createElement(TableBody_1.default, null, state.rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(function (row) {
                        return (React.createElement(TableRow_1.default, { onContextMenu: function (event) {
                                handleClick(event, row);
                                setSelectedId(row.productKey);
                                setSelected(row);
                                setisMulti(row.isMulity);
                            }, style: { cursor: "context-menu" }, onClick: function () {
                                setSelectedId(row.productKey);
                                setSelected(row);
                                setisMulti(row.isMulity);
                                // console.log(row);
                            }, hover: true, selected: selectedId === row.productKey, role: "checkbox", tabIndex: -1, key: row.id },
                            columns.map(function (column, index) {
                                var value = row[column.id];
                                var labelId = "enhanced-table-checkbox-" + index;
                                if (column.id === "checkBox") {
                                    return (React.createElement(TableCell_1.default, { padding: "checkbox" },
                                        React.createElement(core_1.Checkbox, { checked: selectedId === row.productKey, inputProps: {
                                                "aria-labelledby": labelId,
                                            } })));
                                }
                                else if (column.id === "Instore") {
                                    return (React.createElement(TableCell_1.default, { align: "right" }, row.amountInstore));
                                }
                                else {
                                    return (React.createElement(TableCell_1.default, { key: column.id, align: column.align }, column.format && typeof value === "number" ? (React.createElement(Currency, { locale: "en", quantity: value, symbol: "K" })) : (value)));
                                }
                            }),
                            React.createElement(TableCell_1.default, null, row.isMulity ? (React.createElement("img", { style: { width: 25, height: 25 }, src: props.Theme.theme === "light"
                                    ? "./assets/icons/icons8_check_all_240px_1.png"
                                    : "./assets/icons/icons8_check_all_240px.png", alt: "multi Price" })) : (React.createElement("img", { style: { width: 20, height: 20 }, src: props.Theme.theme === "light"
                                    ? "./assets/icons/icons8_unchecked_checkbox_100px_2.png"
                                    : "./assets/icons/icons8_unchecked_checkbox_100px_3.png", alt: "multi Price" })))));
                    })))),
            React.createElement(TablePagination_1.default, { rowsPerPageOptions: [10, 25, 100], component: "div", count: state.rows.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage }),
            React.createElement(core_1.Menu, { keepMounted: true, open: menustate.mouseY !== null, onClose: handleClose, anchorReference: "anchorPosition", anchorPosition: menustate.mouseY !== null && menustate.mouseX !== null
                    ? { top: menustate.mouseY, left: menustate.mouseX }
                    : undefined }, isMulti ? (React.createElement(core_1.MenuItem, { onClick: function () { return handleOpenMulti(); } },
                React.createElement(core_1.ListItemIcon, null,
                    React.createElement(OpenWithOutlined_1.default, { fontSize: "small" })),
                React.createElement(core_1.Typography, null, "Open Price List"))) : null)),
        React.createElement(core_1.Modal, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: OpenProductList, className: classes.modal, onClose: CloseProductList },
            React.createElement("div", { className: classes.paper }, selected ? (React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement(core_1.Typography, { color: "textPrimary" }, selected.ItemName)),
                React.createElement("div", null,
                    React.createElement(core_1.List, { subheader: React.createElement(core_1.ListSubheader, { className: classes.listHeader }, "Price List"), className: classes.list },
                        multi.map(function (data) {
                            if (data.isInstore)
                                return (React.createElement(core_1.ListItem, { key: data.productKey },
                                    React.createElement(core_1.ListItemText, { style: { color: "#fff" }, primary: React.createElement(core_1.Typography, null,
                                            React.createElement(Currency, { locale: "en", quantity: parseInt(data.sallingprice), symbol: "K" })), secondary: React.createElement(React.Fragment, null,
                                            React.createElement(core_1.Typography, { component: "span", variant: "body2", className: classes.inline, color: "textPrimary" }, " In store: " + data.amountInstore + ", ")) })));
                        }),
                        "}")))) : null))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        Model: state.Model,
        Dep: state.Dep,
        ProductsMainList: state.ProductsMainList,
        LoadTabel: state.LoadTabel,
        ProductSync: state.ProductSync,
        SocketConn: state.SocketConn,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map