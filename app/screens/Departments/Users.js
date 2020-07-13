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
var Box_1 = require("@material-ui/core/Box");
var Collapse_1 = require("@material-ui/core/Collapse");
var IconButton_1 = require("@material-ui/core/IconButton");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var Typography_1 = require("@material-ui/core/Typography");
var Paper_1 = require("@material-ui/core/Paper");
var KeyboardArrowDown_1 = require("@material-ui/icons/KeyboardArrowDown");
var KeyboardArrowUp_1 = require("@material-ui/icons/KeyboardArrowUp");
var PersonAdd_1 = require("@material-ui/icons/PersonAdd");
var Delete_1 = require("@material-ui/icons/Delete");
var dataBase_1 = require("../../redux/dataBase");
var Modal_1 = require("@material-ui/core/Modal");
var Backdrop_1 = require("@material-ui/core/Backdrop");
var core_1 = require("@material-ui/core");
var semantic_ui_react_1 = require("semantic-ui-react");
// const PropTypes = require("prop-types");
var useRowStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        "& > *": {
            borderBottom: "unset",
        },
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}); });
function Row(props) {
    var row = props.row;
    var _a = React.useState(false), open = _a[0], setOpen = _a[1];
    var _b = React.useState(false), modalOpen = _b[0], setmodalOpen = _b[1];
    var _c = React.useState({ name: "", pin: "", dep: "" }), text = _c[0], setText = _c[1];
    var _d = React.useState("0"), state = _d[0], setState = _d[1];
    var classes = useRowStyles();
    var handleCloseAlert = function () {
        setmodalOpen(false);
    };
    var handleChange = function (event) {
        var _a;
        setText(__assign({}, text, (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    var handleCheckChange = function (e, _a) {
        var value = _a.value;
        return setState(value);
    };
    var handleSubmit = function () {
        var data = {
            userName: text.name,
            pin: text.pin,
            department: text.dep,
            prevarges: state,
        };
        dataBase_1.default.HandleNewUser(data, function (callback) {
        });
        // console.log(data);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(TableRow_1.default, { className: classes.root },
            React.createElement(TableCell_1.default, null,
                React.createElement(IconButton_1.default, { "aria-label": "expand row", size: "small", onClick: function () { return setOpen(!open); } }, open ? React.createElement(KeyboardArrowUp_1.default, null) : React.createElement(KeyboardArrowDown_1.default, null))),
            React.createElement(TableCell_1.default, { component: "th", scope: "row" }, row.dep_name),
            React.createElement(TableCell_1.default, { align: "right" }, row.shopNo),
            React.createElement(TableCell_1.default, { align: "right" }, row.road),
            React.createElement(TableCell_1.default, { align: "right" }, row.phone)),
        React.createElement(TableRow_1.default, null,
            React.createElement(TableCell_1.default, { style: { paddingBottom: 0, paddingTop: 0 }, colSpan: 6 },
                React.createElement(Collapse_1.default, { in: open, timeout: "auto", unmountOnExit: true },
                    React.createElement(Box_1.default, { margin: 1 },
                        React.createElement("div", { style: { display: "flex" } },
                            React.createElement(Typography_1.default, { variant: "h6", gutterBottom: true, component: "div" }, "Users - (" + row.dep_name + ")"),
                            React.createElement(IconButton_1.default, { onClick: function () {
                                    setmodalOpen(true);
                                    setText(__assign({}, text, { dep: row.dep_name }));
                                }, style: { marginTop: -6, marginLeft: 10 }, "aria-label": "add" },
                                React.createElement(PersonAdd_1.default, { fontSize: "inherit" }))),
                        React.createElement(Table_1.default, { size: "small", "aria-label": "users" },
                            React.createElement(TableHead_1.default, null,
                                React.createElement(TableRow_1.default, null,
                                    React.createElement(TableCell_1.default, null, "Delete"),
                                    React.createElement(TableCell_1.default, null, "User Name"),
                                    React.createElement(TableCell_1.default, null, "Prevarges"),
                                    React.createElement(TableCell_1.default, { align: "right" }, "id"))),
                            React.createElement(TableBody_1.default, null, row.user.Users.map(function (usersRow) { return (React.createElement(TableRow_1.default, { key: usersRow.id },
                                React.createElement(TableCell_1.default, null,
                                    React.createElement(IconButton_1.default, { disabled: usersRow.prevarges === "1" ? true : false, "aria-label": "delete" },
                                        React.createElement(Delete_1.default, { fontSize: "inherit" }))),
                                React.createElement(TableCell_1.default, null, usersRow.userName),
                                React.createElement(TableCell_1.default, { component: "th", scope: "row" }, usersRow.prevarges === "1" ? "Admin" : "Worker"),
                                React.createElement(TableCell_1.default, { align: "right" }, usersRow.id))); }))))))),
        React.createElement(Modal_1.default, { "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", className: classes.modal, open: modalOpen, 
            // onClose={handleCloseAlert}
            closeAfterTransition: true, BackdropComponent: Backdrop_1.default, BackdropProps: {
                timeout: 500,
            } },
            React.createElement(core_1.Fade, { in: modalOpen },
                React.createElement(Paper_1.default, { square: true, elevation: 10, style: { padding: 20, width: 300 } },
                    React.createElement(semantic_ui_react_1.Form, null,
                        React.createElement(semantic_ui_react_1.Form.Field, null,
                            React.createElement("label", null, "User Name"),
                            React.createElement("input", { value: text.name, onChange: handleChange, name: "name", placeholder: "User Name" })),
                        React.createElement(semantic_ui_react_1.Form.Field, null,
                            React.createElement("label", null, "Pin"),
                            React.createElement("input", { type: "password", value: text.pin, onChange: handleChange, name: "pin", placeholder: "PIN" })),
                        React.createElement(semantic_ui_react_1.Form.Field, null,
                            React.createElement(semantic_ui_react_1.Checkbox, { onChange: handleCheckChange, label: "Is Adminstrator", value: "1", name: "isAdmin", checked: state === "1" }),
                            React.createElement(semantic_ui_react_1.Checkbox, { style: { marginLeft: 10 }, onChange: handleCheckChange, label: "Is User", name: "isAdmin", value: "0", checked: state === "0" })),
                        React.createElement(semantic_ui_react_1.Button, { onClick: function () { return handleSubmit(); } }, "Submit"),
                        React.createElement(semantic_ui_react_1.Button, { onClick: function () { return handleCloseAlert(); } }, "Cancel")))))));
}
var Users = function (props) {
    var _a = React.useState({ data: [] }), depList = _a[0], setDepList = _a[1];
    React.useEffect(function () {
        dataBase_1.default.HandleDepartments({ type: "getAll" }, function (callback) {
            setDepList(__assign({}, depList, { data: callback.departments }));
        });
    }, []);
    return (React.createElement(TableContainer_1.default, { component: Paper_1.default },
        React.createElement(Table_1.default, { "aria-label": "collapsible table" },
            React.createElement(TableHead_1.default, null,
                React.createElement(TableRow_1.default, null,
                    React.createElement(TableCell_1.default, null),
                    React.createElement(TableCell_1.default, null, "Deparment Name"),
                    React.createElement(TableCell_1.default, { align: "right" }, "ShopNo"),
                    React.createElement(TableCell_1.default, { align: "right" }, "Road"),
                    React.createElement(TableCell_1.default, { align: "right" }, "Number"))),
            React.createElement(TableBody_1.default, null, depList.data.map(function (row) { return (React.createElement(Row, { key: row.id, row: row })); })))));
};
var mapStateToProps = function (state) { return ({
    Customers: state.Customers,
    Transactions: state.Transactions,
}); };
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Users);
//# sourceMappingURL=Users.js.map