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
var core_1 = require("@material-ui/core");
var dataBase_1 = require("../../redux/dataBase");
var styles_1 = require("@material-ui/core/styles");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TablePagination_1 = require("@material-ui/core/TablePagination");
var TableRow_1 = require("@material-ui/core/TableRow");
var TableSortLabel_1 = require("@material-ui/core/TableSortLabel");
var Toolbar_1 = require("@material-ui/core/Toolbar");
var Typography_1 = require("@material-ui/core/Typography");
var Paper_1 = require("@material-ui/core/Paper");
var Checkbox_1 = require("@material-ui/core/Checkbox");
var react_toastify_1 = require("react-toastify");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
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
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === "desc"
        ? function (a, b) { return descendingComparator(a, b, orderBy); }
        : function (a, b) { return -descendingComparator(a, b, orderBy); };
}
function stableSort(array, comparator) {
    var stabilizedThis = array.map(function (el, index) { return [el, index]; });
    stabilizedThis.sort(function (a, b) {
        var order = comparator(a[0], b[0]);
        if (order !== 0)
            return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(function (el) { return el[0]; });
}
var headCells = [
    { id: "name", numeric: false, disablePadding: false, label: "Product" },
    { id: "group", numeric: false, disablePadding: false, label: "Group" },
    { id: "sallingprice", numeric: true, disablePadding: false, label: "Price" },
    { id: "quantity", numeric: true, disablePadding: false, label: "Quantity" },
];
function EnhancedTableHead(props) {
    var classes = props.classes, onSelectAllClick = props.onSelectAllClick, order = props.order, orderBy = props.orderBy, numSelected = props.numSelected, rowCount = props.rowCount, onRequestSort = props.onRequestSort;
    var createSortHandler = function (property) { return function (event) {
        onRequestSort(event, property);
    }; };
    return (React.createElement(TableHead_1.default, null,
        React.createElement(TableRow_1.default, null,
            React.createElement(TableCell_1.default, { padding: "checkbox" },
                React.createElement(Checkbox_1.default, { indeterminate: numSelected > 0 && numSelected < rowCount, checked: rowCount > 0 && numSelected === rowCount, onChange: onSelectAllClick, inputProps: { "aria-label": "select all products" } })),
            headCells.map(function (headCell) { return (React.createElement(TableCell_1.default, { key: headCell.id, align: headCell.numeric ? "right" : "left", padding: headCell.disablePadding ? "none" : "default", sortDirection: orderBy === headCell.id ? order : false },
                React.createElement(TableSortLabel_1.default, { active: orderBy === headCell.id, direction: orderBy === headCell.id ? order : "asc", onClick: createSortHandler(headCell.id) },
                    React.createElement(Typography_1.default, { variant: "h6" }, headCell.label)))); }),
            React.createElement(TableCell_1.default, { padding: "checkbox" }))));
}
var useToolbarStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight: theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: styles_1.lighten(theme.palette.secondary.light, 0.85),
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },
    title: {
        flex: "1 1 100%",
    },
}); });
var EnhancedTableToolbar = function (props) {
    var classes = useToolbarStyles();
    var numSelected = props.numSelected;
    return (React.createElement(Toolbar_1.default, { className: numSelected > 0 ? classes.highlight : null }, numSelected > 0 ? (React.createElement(Typography_1.default, { className: classes.title, color: "inherit", variant: "subtitle1", component: "div" },
        numSelected,
        " selected")) : (React.createElement(Typography_1.default, { className: classes.title, variant: "h6", id: "tableTitle", component: "div" }, "Products List"))));
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        position: "absolute",
        width: 900,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 4, 3),
    },
}); });
var PaneRender = function (props) {
    var classes = useStyles();
    var _a = React.useState({
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
    }), state = _a[0], setState = _a[1];
    var _b = React.useState({
        data: [],
    }), purchase = _b[0], setPurchase = _b[1];
    var _c = React.useState(false), openPurchase = _c[0], setopenPurchase = _c[1];
    var _d = React.useState(false), OpenTrans = _d[0], setOpenTrans = _d[1];
    var _e = React.useState([]), selected = _e[0], setSelected = _e[1];
    var _f = React.useState({}), selectedItem = _f[0], setSelectedItem = _f[1];
    var _g = React.useState([]), purchaseSelected = _g[0], setpurchaseSelected = _g[1];
    var _h = React.useState([]), mulitSelected = _h[0], setMulitSelected = _h[1];
    var _j = React.useState("asc"), order = _j[0], setOrder = _j[1];
    var _k = React.useState("calories"), orderBy = _k[0], setOrderBy = _k[1];
    var _l = React.useState(0), page = _l[0], setPage = _l[1];
    var _m = React.useState(false), dense = _m[0], setDense = _m[1];
    var _o = React.useState({ data: [] }), multi = _o[0], setMulti = _o[1];
    var _p = React.useState(50), rowsPerPage = _p[0], setRowsPerPage = _p[1];
    var _q = React.useState(true), loadOnce = _q[0], setLoadOnce = _q[1];
    var _r = React.useState([]), Departments = _r[0], SetDepartments = _r[1];
    var _s = React.useState(""), dep = _s[0], setDep = _s[1];
    var _t = React.useState({ value: "" }), qnt = _t[0], setqnt = _t[1];
    var _u = React.useState({
        amount: "",
        password: "",
        weight: "",
        weightRange: "",
        showPassword: false,
    }), values = _u[0], setValues = _u[1];
    var handleChange = function (prop) { return function (event) {
        var _a;
        setValues(__assign({}, values, (_a = {}, _a[prop] = event.target.value, _a)));
    }; };
    var handleOpenPurchase = function () {
        setopenPurchase(true);
    };
    var handlePurchase = function () {
        var data = {
            _type: "add_to_store",
            purchaseSelected: purchaseSelected,
            mulitSelected: mulitSelected,
            dep: props.Dep.dep,
        };
        // console.log(data);
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
            CloseOpenPurchase();
            setpurchaseSelected([]);
            setSelected([]);
        });
    };
    var CloseOpenPurchase = function () {
        setopenPurchase(false);
    };
    var HandleQutChange = function (value, data, index, type) {
        if (type === "multi") {
            var selectedMulitIndex = mulitSelected.indexOf(data);
            purchaseSelected.map(function (list, index) {
                if (list.ItemName === data.productName) {
                    purchaseSelected[index].quantity = list.quantity
                        ? list.quantity + 1
                        : parseInt(value);
                }
            });
            if (selectedMulitIndex === -1) {
                data.quantity = parseInt(value);
                mulitSelected.push(data);
                setMulitSelected(mulitSelected);
            }
            else {
                mulitSelected[selectedMulitIndex].quantity = parseInt(value);
            }
        }
        else {
            var selectedIndex = purchaseSelected.indexOf(data);
            purchaseSelected[selectedIndex].quantity = parseInt(value);
            setpurchaseSelected(purchaseSelected);
        }
    };
    React.useEffect(function () {
        if (loadOnce) {
            props.dispatchEvent({ type: "LOADTABEL" });
            setLoadOnce(false);
        }
        if (props.LoadTabel.load) {
            LoadData();
            props.dispatchEvent({ type: "CLEARLOADTABEL" });
        }
        dataBase_1.default.HandleDepartments({ type: "getAll" }, function (callback) {
            // console.log(callback);
            SetDepartments(callback.departments);
        });
    }, [props]);
    var LoadData = function () {
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_purcheased" }, function (receiveCallback) {
            setTimeout(function () {
                setState(__assign({}, state, { data: receiveCallback }));
            }, 100);
        });
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_P" }, function (receiveCallback) {
            if (receiveCallback.productsList.length > 50)
                setRowsPerPage(100);
            setPurchase(__assign({}, purchase, { data: receiveCallback.productsList }));
            setMulti(__assign({}, multi, { data: receiveCallback.mulitList }));
        });
    };
    var handleRequestSort = function (event, property) {
        var isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    var handleSelectAllClick = function (event) {
        if (event.target.checked) {
            var newSelecteds = purchase.data.map(function (n) { return n.name; });
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    var handleClick = function (event, data) {
        // console.log(data);
        var selectedIndex = selected.indexOf(data.ItemName);
        var purchesSelected = [];
        var newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, data.ItemName);
            purchesSelected = purchesSelected.concat(purchaseSelected, data);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            purchesSelected = purchesSelected.concat(purchaseSelected.slice(1));
        }
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            purchesSelected = purchesSelected.concat(purchaseSelected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
            purchesSelected = purchesSelected.concat(purchaseSelected.slice(0, selectedIndex), purchaseSelected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
        setpurchaseSelected(purchesSelected);
        var filteredItems = mulitSelected.filter(function (item) {
            if (item.productName !== data.ItemName)
                return item;
        });
        setMulitSelected(filteredItems);
    };
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    var handleDepChange = function (event) {
        setDep(event.target.value);
    };
    var isSelected = function (name) { return selected.indexOf(name) !== -1; };
    var emptyRows = rowsPerPage -
        Math.min(rowsPerPage, purchase.data.length - page * rowsPerPage);
    var submit = function () {
        if (dep === "") {
            alert("Please selecte a department");
            return;
        }
        dataBase_1.default.HandelProducts({
            _type: "getPOSList",
            layoutType: "mulitList",
            name: selectedItem.ItemName,
        }, function (callback) {
            // console.log(callback);
            if (props.Dep.dep === dep.dep_name) {
                return alert("We're sorry we can't send this item to the same department you are on \"" + props.Dep.dep + "\"");
            }
            var data = {
                _type: "tranfer",
                value: qnt.value,
                selected: selectedItem,
                to: dep.dep_name,
                from: props.Dep.dep,
                multi: callback,
                state: "send",
                isCleared: true,
            };
            dataBase_1.default.HandelProducts(data, function (callback) { });
            setOpenTrans(false);
        });
    };
    var search = function (event, item) {
        if (item !== null)
            dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "searchedProduct", id: item }, function (receiveCallback) {
                setPurchase(__assign({}, purchase, { data: receiveCallback }));
            });
        else
            dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_P" }, function (receiveCallback) {
                if (receiveCallback.productsList.length > 50)
                    setRowsPerPage(100);
                setPurchase(__assign({}, purchase, { data: receiveCallback.productsList }));
                setMulti(__assign({}, multi, { data: receiveCallback.mulitList }));
            });
    };
    return (React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
        React.createElement("div", { style: {
                width: "79%",
                height: "80vh",
                overflow: "auto",
                paddingLeft: 3,
                paddingRight: 3,
            } },
            React.createElement(material_table_1.default, { icons: tableIcons, title: "Inventory List ", columns: state.columns, actions: [
                    {
                        icon: "send",
                        tooltip: "Tranffer",
                        onClick: function (event, rowData) {
                            setOpenTrans(true);
                            setSelectedItem(rowData);
                            // console.log(rowData);
                            setqnt(__assign({}, qnt, { value: rowData.quantity }));
                        },
                    },
                ], data: state.data, editable: {
                    onRowDelete: function (oldData) {
                        return new Promise(function (resolve) {
                            dataBase_1.default.HandelProducts({
                                _type: "remove_from_store",
                                oldData: oldData,
                                dep: props.Dep.dep,
                            }, function (callback) {
                                setTimeout(function () {
                                    resolve();
                                    setState(function (prevState) {
                                        var data = prevState.data.slice();
                                        data.splice(data.indexOf(oldData), 1);
                                        return __assign({}, prevState, { data: data });
                                    });
                                }, 600);
                            });
                        });
                    },
                } })),
        React.createElement(Paper_1.default, { style: { width: "20%" } },
            React.createElement(core_1.Button, { onClick: handleOpenPurchase, variant: "outlined", style: { width: "100%" } }, "Purchase")),
        React.createElement("div", null,
            React.createElement(core_1.Modal, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: openPurchase, className: classes.modal },
                React.createElement("div", { className: classes.paper },
                    React.createElement(Autocomplete_1.default, { id: "combo-box-demo", options: purchase.data, getOptionLabel: function (option) { return option.ItemName; }, onChange: search, renderInput: function (params) { return (React.createElement(core_1.TextField, __assign({}, params, { label: "Search products", variant: "outlined" }))); } }),
                    React.createElement("div", { style: {
                            height: 450,
                            overflow: "auto",
                            paddingLeft: 3,
                            paddingRight: 3,
                            paddingTop: 3,
                        } },
                        React.createElement(EnhancedTableToolbar, { numSelected: selected.length }),
                        React.createElement(TableContainer_1.default, null,
                            React.createElement(Table_1.default, { "aria-labelledby": "tableTitle", size: "small", "aria-label": "enhanced table" },
                                React.createElement(EnhancedTableHead, { classes: classes, numSelected: selected.length, order: order, orderBy: orderBy, onSelectAllClick: handleSelectAllClick, onRequestSort: handleRequestSort, rowCount: purchase.data.length }),
                                React.createElement(TableBody_1.default, null,
                                    stableSort(purchase.data, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(function (row, index) {
                                        var isItemSelected = isSelected(row.ItemName);
                                        var labelId = "enhanced-table-checkbox-" + index;
                                        return (React.createElement(TableRow_1.default, { hover: true, role: "checkbox", "aria-checked": isItemSelected, tabIndex: -1, key: labelId, selected: isItemSelected },
                                            React.createElement(TableCell_1.default, { padding: "checkbox" },
                                                React.createElement(Checkbox_1.default, { onClick: function (event) { return handleClick(event, row); }, checked: isItemSelected, inputProps: { "aria-labelledby": labelId } })),
                                            React.createElement(TableCell_1.default, { component: "th", id: labelId, scope: "row", padding: "none" },
                                                React.createElement(Typography_1.default, null, row.ItemName)),
                                            React.createElement(TableCell_1.default, { align: "left" },
                                                React.createElement(Typography_1.default, null, row.group)),
                                            React.createElement(TableCell_1.default, { align: "right" },
                                                React.createElement(Typography_1.default, null,
                                                    React.createElement(Currency, { locale: "en", quantity: row.sallingprice, symbol: "K" }))),
                                            React.createElement(TableCell_1.default, { align: "right" },
                                                React.createElement("input", { style: { width: 50 }, disabled: isItemSelected ? false : true, defaultValue: isItemSelected ? 0 : null, onInput: function (e) {
                                                        HandleQutChange(e.target.value, row, index, "list");
                                                    }, type: "number" }))));
                                    }),
                                    emptyRows > 0 && (React.createElement(TableRow_1.default, { style: { height: (dense ? 33 : 53) * emptyRows } },
                                        React.createElement(TableCell_1.default, { colSpan: 6 })))))),
                        React.createElement(TablePagination_1.default, { rowsPerPageOptions: [5, 10, 25], component: "div", count: purchase.data.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage })),
                    React.createElement("div", { style: { display: "flex" } },
                        React.createElement(core_1.Button, { disabled: selected.length !== 0 ? false : true, variant: "contained", color: "primary", onClick: handlePurchase }, "Purchase Selected"),
                        React.createElement(core_1.Button, { onClick: CloseOpenPurchase, variant: "contained", color: "secondary", style: { marginLeft: 10 } }, "Close")))),
            React.createElement(core_1.Modal, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: OpenTrans, className: classes.modal },
                React.createElement(Paper_1.default, { square: true, elevation: 12, style: { width: 400, height: 260, padding: 20 } },
                    React.createElement("div", { style: { marginTop: 15 } },
                        React.createElement(Typography_1.default, { variant: "h6" },
                            "Transfer",
                            " ",
                            React.createElement("span", { style: { color: "green" } }, selectedItem.ItemName))),
                    React.createElement("div", { style: { display: "flex" } },
                        React.createElement("div", { style: { width: 150, marginTop: 10 } },
                            React.createElement(Typography_1.default, null, "Tranfer to ")),
                        React.createElement(core_1.FormControl, { style: { width: "100%" } },
                            React.createElement(core_1.Select, { labelId: "demo-simple-select-label", id: "demo-simple-select", value: dep, displayEmpty: true, onChange: handleDepChange }, Departments.map(function (list, index) { return (React.createElement(core_1.MenuItem, { key: index, value: list }, list.dep_name)); })))),
                    React.createElement("div", { style: { marginTop: 20 } },
                        React.createElement(core_1.TextField, { label: "Number of items", type: "number", value: qnt.value, onChange: function (e) { return setqnt(__assign({}, qnt, { value: e.target.value })); }, id: "outlined-margin-dense", 
                            // defaultValue={qnt.value}
                            helperText: "The default value is the total number of this items", margin: "dense", variant: "outlined" })),
                    React.createElement("div", { style: { marginTop: 15 } },
                        React.createElement(core_1.Button, { onClick: function () { return submit(); }, variant: "contained", color: "primary" }, "Done"),
                        React.createElement(core_1.Button, { onClick: function () { return setOpenTrans(false); }, variant: "contained", color: "secondary", style: { marginLeft: 5 } }, "Cancel")))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        Dep: state.Dep,
        LoadTabel: state.LoadTabel,
        LoggedUsers: state.LoggedUsers,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PaneRender);
//# sourceMappingURL=PaneRender.js.map