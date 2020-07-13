"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var Paper_1 = require("@material-ui/core/Paper");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TablePagination_1 = require("@material-ui/core/TablePagination");
var TableRow_1 = require("@material-ui/core/TableRow");
var core_1 = require("@material-ui/core");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var react_router_dom_1 = require("react-router-dom");
var columns = [
    { id: "name", label: "Account Name", minWidth: 170 },
    {
        id: "population",
        label: "Debit",
        minWidth: 170,
        align: "right",
        format: function (value) { return value.toLocaleString(); },
    },
    {
        id: "size",
        label: "Credit",
        minWidth: 170,
        align: "right",
        format: function (value) { return value.toLocaleString(); },
    },
    {
        id: "density",
        label: "Balance",
        minWidth: 170,
        align: "right",
        format: function (value) { return value.toFixed(2); },
    },
];
function createData(name, code, population, size) {
    var density = population / size;
    return { name: name, code: code, population: population, size: size, density: density };
}
var rows = [];
var initialState = {
    mouseX: null,
    mouseY: null,
};
var useStyles = styles_1.makeStyles({
    root: {
        width: "100%",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    container: {
        maxHeight: 380,
    },
    table: {
        width: "100%",
    },
});
var index = function (props) {
    var classes = useStyles();
    var _a = React.useState(0), page = _a[0], setPage = _a[1];
    var _b = React.useState(10), rowsPerPage = _b[0], setRowsPerPage = _b[1];
    var _c = React.useState(initialState), state = _c[0], setState = _c[1];
    var _d = React.useState(), selectedId = _d[0], setSelectedId = _d[1];
    var _e = React.useState(), selected = _e[0], setSelected = _e[1];
    var history = react_router_dom_1.useHistory();
    var handleClose = function () {
        setState(initialState);
    };
    var handleClick = function (event, data) {
        event.preventDefault();
        setState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (React.createElement("div", { className: classes.root },
        React.createElement("div", null,
            React.createElement(core_1.AppBar, { elevation: 0, position: "static", color: "default", style: {
                    padding: 15,
                    borderRadius: 5,
                    textAlign: "center",
                    marginBottom: 10,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "#ccc",
                } },
                React.createElement(core_1.Typography, { variant: "h5" }, "General"))),
        React.createElement("div", { style: { display: "flex" } },
            React.createElement("div", { style: { width: "87%" } },
                React.createElement(Paper_1.default, { elevation: 0, className: classes.table, style: {
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderColor: "#ccc",
                    } },
                    React.createElement(TableContainer_1.default, { className: classes.container },
                        React.createElement(Table_1.default, { stickyHeader: true, "aria-label": "sticky table" },
                            React.createElement(TableHead_1.default, null,
                                React.createElement(TableRow_1.default, null, columns.map(function (column) { return (React.createElement(TableCell_1.default, { key: column.id, align: column.align, style: { minWidth: column.minWidth } },
                                    React.createElement(core_1.Typography, { variant: "h6" }, column.label))); }))),
                            React.createElement(TableBody_1.default, null, rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(function (row) {
                                return (React.createElement(TableRow_1.default, { hover: true, onContextMenu: function (event) {
                                        handleClick(event, row);
                                        setSelectedId(row.code);
                                        setSelected(row);
                                    }, style: { cursor: "context-menu" }, onClick: function () {
                                        setSelectedId(row.code);
                                        setSelected(row);
                                        console.log(row);
                                    }, selected: selectedId === row.code, role: "checkbox", tabIndex: -1, key: row.code }, columns.map(function (column) {
                                    var value = row[column.id];
                                    return (React.createElement(TableCell_1.default, { key: column.id, align: column.align },
                                        React.createElement(core_1.Typography, null, column.format && typeof value === "number"
                                            ? column.format(value)
                                            : value)));
                                })));
                            })))),
                    React.createElement(TablePagination_1.default, { rowsPerPageOptions: [10, 25, 100], component: "div", count: rows.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage }))),
            React.createElement("div", { style: { width: "13%", padding: 3 } },
                React.createElement(core_1.Button, { onClick: function () { return history.push("/accounts_details"); }, variant: "outlined", style: { width: "100%" } },
                    React.createElement(core_1.Typography, null, "Account details")),
                React.createElement("div", { style: { marginTop: 20 } }),
                React.createElement(core_1.Button, { variant: "outlined", style: { width: "100%" } },
                    React.createElement(core_1.Typography, null, "Print")))),
        React.createElement(core_1.Menu, { keepMounted: true, open: state.mouseY !== null, onClose: handleClose, anchorReference: "anchorPosition", anchorPosition: state.mouseY !== null && state.mouseX !== null
                ? { top: state.mouseY, left: state.mouseX }
                : undefined },
            React.createElement(MenuItem_1.default, { onClick: function () {
                    // handleOpenTicket();
                    handleClose();
                    history.push("/home/accounts_details");
                } }, "Account Details"))));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map