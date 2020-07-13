"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var Select_1 = require("@material-ui/core/Select");
var styles_1 = require("@material-ui/core/styles");
var InputBase_1 = require("@material-ui/core/InputBase");
var Print_1 = require("@material-ui/icons/Print");
var react_router_dom_1 = require("react-router-dom");
var styles_2 = require("@material-ui/core/styles");
var darkTheme = styles_2.createMuiTheme({
    palette: {
        type: "dark"
    }
});
var useStyles = styles_1.makeStyles(function (theme) { return ({
    margin: {
        margin: theme.spacing(1)
    },
    textField: {
        width: 200
    },
    root: {
        width: "100%",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    container: {
        maxHeight: 380
    },
    table: {
        width: "100%"
    }
}); });
var BootstrapInput = styles_1.withStyles(function (theme) { return ({
    root: {
        "label + &": {
            marginTop: theme.spacing(3)
        }
    },
    input: {
        borderRadius: 4,
        width: 100,
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(","),
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
        }
    }
}); })(InputBase_1.default);
var columns = [
    {
        id: "checkBox",
        label: "",
        minWidth: 30,
        align: "left",
        format: function (value) { return value.toLocaleString(); }
    },
    {
        id: "date",
        label: "Date",
        minWidth: 170,
        align: "left",
        format: function (value) { return value.toLocaleString(); }
    },
    {
        id: "description",
        label: "Description",
        minWidth: 170,
        align: "left",
        format: function (value) { return value.toLocaleString(); }
    },
    {
        id: "debit",
        label: "Debit",
        minWidth: 170,
        align: "right",
        format: function (value) { return value.toFixed(2); }
    },
    {
        id: "credit",
        label: "Credit",
        minWidth: 170,
        align: "right",
        format: function (value) { return value.toLocaleString(); }
    },
    {
        id: "balance",
        label: "Balance",
        minWidth: 170,
        align: "right",
        format: function (value) { return value.toLocaleString(); }
    }
];
function createData(id, date, description, debit, credit, balance) {
    return { id: id, date: date, description: description, debit: debit, credit: credit, balance: balance };
}
var rows = [
    createData("t1", "3/31/2020 1:02", "Sales Transations [#1]", "-", "K 200.00", "(98.90)"),
    createData("t2", "3/3/2020 1:02", "Sales Transations [#2]", "-", "K 200.00", "(98.90)")
];
var initialState = {
    mouseX: null,
    mouseY: null
};
var AccountDetails = function (props) {
    var classes = useStyles();
    var _a = React.useState(""), age = _a[0], setAge = _a[1];
    var _b = React.useState(0), page = _b[0], setPage = _b[1];
    var _c = React.useState(10), rowsPerPage = _c[0], setRowsPerPage = _c[1];
    var _d = React.useState(initialState), state = _d[0], setState = _d[1];
    var _e = React.useState(), selectedId = _e[0], setSelectedId = _e[1];
    var _f = React.useState(), selected = _f[0], setSelected = _f[1];
    var _g = React.useState(new Date()), startDate = _g[0], setStartDate = _g[1];
    var history = react_router_dom_1.useHistory();
    var handleChange = function (event) {
        setAge(event.target.value);
    };
    var handleClose = function () {
        setState(initialState);
    };
    var handleClick = function (event, data) {
        event.preventDefault();
        setState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4
        });
    };
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    var handleFindTicket = function () {
        if (selected) {
        }
        else {
            alert("Select an item from the list first");
        }
    };
    return (React.createElement("div", { style: { width: "100%", display: "flex" } },
        React.createElement("div", { style: { padding: 20, width: "87%" } },
            React.createElement(core_1.AppBar, { elevation: 0, color: "default", position: "static", style: {
                    padding: 5,
                    backgroundColor: props.Theme.theme === "light" ? "#007FAA" : "#212121"
                } },
                React.createElement("div", { style: { display: "flex", width: "100%" } },
                    React.createElement("div", null,
                        React.createElement(Select_1.default, { labelId: "demo-customized-select-label", id: "demo-customized-select", value: age, onChange: handleChange, input: React.createElement(BootstrapInput, null) },
                            React.createElement(core_1.MenuItem, { value: "" },
                                React.createElement("em", null, "None")),
                            React.createElement(core_1.MenuItem, { value: 10 }, "Ten"),
                            React.createElement(core_1.MenuItem, { value: 20 }, "Twenty"),
                            React.createElement(core_1.MenuItem, { value: 30 }, "Thirty"))),
                    React.createElement(styles_2.ThemeProvider, { theme: darkTheme },
                        React.createElement("div", { style: { marginLeft: 40 } },
                            React.createElement(core_1.TextField, { id: "date", fullWidth: true, type: "date", defaultValue: "2017-05-24", className: classes.textField, InputLabelProps: {
                                    shrink: true
                                } })),
                        React.createElement("div", { style: { marginLeft: 40 } },
                            React.createElement(core_1.TextField, { id: "date", fullWidth: true, type: "date", defaultValue: "2017-05-24", className: classes.textField, InputLabelProps: {
                                    shrink: true
                                } }))),
                    React.createElement("div", { style: { marginLeft: 10 } },
                        React.createElement(core_1.Button, { color: "primary", variant: "contained", startIcon: React.createElement(Print_1.default, null) }, "Printer")),
                    React.createElement("div", { style: { display: "flex", marginLeft: 20 } },
                        React.createElement(core_1.Typography, { style: { marginTop: 10, color: "#fff" } }, "sales"),
                        React.createElement(core_1.Typography, { style: { color: "#fff" }, variant: "h4" }, "(79.00)")))),
            React.createElement(core_1.Paper, null,
                React.createElement(core_1.TableContainer, { className: classes.container },
                    React.createElement(core_1.Table, { stickyHeader: true, "aria-label": "sticky table" },
                        React.createElement(core_1.TableHead, null,
                            React.createElement(core_1.TableRow, null, columns.map(function (column) { return (React.createElement(core_1.TableCell, { key: column.id, align: column.align, style: { minWidth: column.minWidth } },
                                React.createElement(core_1.Typography, { variant: "h6" }, column.label))); }))),
                        React.createElement(core_1.TableBody, null, rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(function (row) {
                            return (React.createElement(core_1.TableRow, { hover: true, onContextMenu: function (event) {
                                    handleClick(event, row);
                                    setSelectedId(row.id);
                                    setSelected(row);
                                }, style: { cursor: "context-menu" }, onClick: function () {
                                    setSelectedId(row.id);
                                    setSelected(row);
                                    console.log(row);
                                }, selected: selectedId === row.id, role: "checkbox", tabIndex: -1, key: row.id }, columns.map(function (column, index) {
                                var value = row[column.id];
                                var labelId = "enhanced-table-checkbox-" + index;
                                if (column.id === "checkBox") {
                                    return (React.createElement(core_1.TableCell, { padding: "checkbox" },
                                        React.createElement(core_1.Checkbox, { checked: selectedId === row.id, inputProps: {
                                                "aria-labelledby": labelId
                                            } })));
                                }
                                else {
                                    return (React.createElement(core_1.TableCell, { key: column.id, align: column.align },
                                        React.createElement(core_1.Typography, null, column.format && typeof value === "number"
                                            ? column.format(value)
                                            : value)));
                                }
                            })));
                        })))),
                React.createElement(core_1.TablePagination, { rowsPerPageOptions: [10, 25, 100], component: "div", count: rows.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage }))),
        React.createElement("div", { style: { width: "13%", padding: 2, marginTop: 10 } },
            React.createElement(core_1.Button, { onClick: function () { return history.push("/home/accounts"); }, variant: "contained", color: "secondary", style: { width: "90%", height: 70 } },
                React.createElement(core_1.Typography, null, "Close")),
            React.createElement(core_1.Button, { onClick: function () { return handleFindTicket(); }, variant: "contained", color: "default", style: { width: "90%", height: 70, marginTop: 20 } },
                React.createElement(core_1.Typography, null, "Find Ticket")))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
//# sourceMappingURL=AccountDetails.js.map