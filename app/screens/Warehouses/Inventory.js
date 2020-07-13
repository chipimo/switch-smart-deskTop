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
var styles_1 = require("@material-ui/core/styles");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var TableSortLabel_1 = require("@material-ui/core/TableSortLabel");
var Toolbar_1 = require("@material-ui/core/Toolbar");
var Typography_1 = require("@material-ui/core/Typography");
var Checkbox_1 = require("@material-ui/core/Checkbox");
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
    { id: "recipes", numeric: false, disablePadding: false, label: "Recipes" },
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
                    React.createElement(Typography_1.default, { variant: "h6" }, headCell.label)))); }))));
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
var Inventory = function (props) {
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
    var _d = React.useState(false), IsSelected = _d[0], setIsSelected = _d[1];
    var _e = React.useState([]), selected = _e[0], setSelected = _e[1];
    var _f = React.useState([]), purchaseSelected = _f[0], setpurchaseSelected = _f[1];
    var _g = React.useState("asc"), order = _g[0], setOrder = _g[1];
    var _h = React.useState("calories"), orderBy = _h[0], setOrderBy = _h[1];
    var _j = React.useState(0), page = _j[0], setPage = _j[1];
    var _k = React.useState(false), dense = _k[0], setDense = _k[1];
    var _l = React.useState(5), rowsPerPage = _l[0], setRowsPerPage = _l[1];
    var _m = React.useState(true), loadOnce = _m[0], setLoadOnce = _m[1];
    var handleOpenPurchase = function () {
        setopenPurchase(true);
    };
    var handlePurchase = function () {
        var data = {
            _type: "add_to_store",
            purchaseSelected: purchaseSelected,
            dep: props.Dep.dep,
        };
        dataBase_1.default.HandelProducts(data, function (reciveCallback) {
            props.dispatchEvent({
                type: "SHOWNOTIFICATION",
                message: "Successfully Purchased " + (reciveCallback.data.number === 1
                    ? reciveCallback.data.name
                    : reciveCallback.data.number + " Products") + " ",
                vertical: "bottom",
                horizontal: "right",
                variant: "success",
            });
            setSelected([]);
        });
    };
    var CloseOpenPurchase = function () {
        setopenPurchase(false);
    };
    var HandleQutChange = function (value, data, index) {
        var selectedIndex = purchaseSelected.indexOf(data);
        purchaseSelected[selectedIndex].quantity = parseInt(value);
        setpurchaseSelected(purchaseSelected);
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
    }, [props]);
    var LoadData = function () {
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_purcheased" }, function (receiveCallback) {
            setTimeout(function () {
                setState(__assign({}, state, { data: receiveCallback }));
            }, 100);
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
        var selectedIndex = selected.indexOf(data.name);
        var purchesSelected = [];
        var newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, data.name);
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
    };
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    var isSelected = function (name) { return selected.indexOf(name) !== -1; };
    var emptyRows = rowsPerPage -
        Math.min(rowsPerPage, purchase.data.length - page * rowsPerPage);
    return (React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
        React.createElement("div", { style: {
                width: "100%",
                height: "68vh",
                overflow: "auto",
                paddingLeft: 3,
                paddingRight: 3,
            } },
            React.createElement(material_table_1.default, { icons: tableIcons, title: "Inventory List ", columns: state.columns, data: state.data }))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        Dep: state.Dep,
        LoadTabel: state.LoadTabel,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Inventory);
//# sourceMappingURL=Inventory.js.map