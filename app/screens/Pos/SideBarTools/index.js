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
var core_1 = require("@material-ui/core");
var Drawer_1 = require("@material-ui/core/Drawer");
var Modal_1 = require("@material-ui/core/Modal");
var styles_1 = require("@material-ui/core/styles");
var TicketNote_1 = require("../TicketNote");
var Repair_1 = require("../Repair");
var Customers_1 = require("../../Customers");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    list: {
        width: 650,
    },
    bottom: {
        width: "auto",
        height: 680,
    },
    bottom2: {
        width: "auto",
        height: 680,
    },
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}); });
var index = function (props) {
    var classes = useStyles();
    var _a = React.useState({
        top: false,
        left: false,
        bottom: false,
        bottom2: false,
        bottom3: false,
        right: false,
    }), state = _a[0], setState = _a[1];
    var _b = React.useState(false), open = _b[0], setOpen = _b[1];
    var _c = React.useState(false), openRepair = _c[0], setOpenRepair = _c[1];
    React.useEffect(function () {
        if (props.Model.toClose === "repair")
            handleCloseRepair();
    });
    var handleOpenRepair = function () {
        setOpenRepair(true);
    };
    var handleCloseRepair = function () {
        setOpenRepair(false);
        if (props.Model.toClose === "repair")
            props.dispatchEvent({ type: "HANDELCLEAR" });
    };
    var handleOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    var toggleDrawer = function (side, open) { return function (event) {
        var _a;
        if (event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setState(__assign({}, state, (_a = {}, _a[side] = open, _a)));
    }; };
    return (React.createElement("div", null,
        React.createElement(core_1.Button, { onClick: toggleDrawer("left", true), style: {
                width: "100%",
            }, variant: "contained", color: "primary" },
            React.createElement(core_1.Typography, null, "Select Customer")),
        React.createElement(core_1.Button, { onClick: handleOpen, style: {
                width: "100%",
                marginTop: 10,
            }, variant: "contained", color: "primary" },
            React.createElement(core_1.Typography, null, "Ticket Note")),
        React.createElement(core_1.Button, { onClick: handleOpenRepair, style: {
                width: "100%",
                marginTop: 10,
            }, variant: "contained", color: "secondary" },
            React.createElement(core_1.Typography, null, "Repare Ticket")),
        React.createElement("div", null,
            React.createElement(Drawer_1.default, { open: state.left, onClose: toggleDrawer("left", false) },
                React.createElement("div", { className: classes.list },
                    React.createElement(Customers_1.default, null),
                    " "))),
        React.createElement("div", null,
            React.createElement(Modal_1.default, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: open, className: classes.modal, onClose: handleClose },
                React.createElement(TicketNote_1.default, null))),
        React.createElement("div", null,
            React.createElement(Modal_1.default, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: openRepair, className: classes.modal },
                React.createElement(Repair_1.default, null)))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        SocketConn: state.SocketConn,
        Model: state.Model,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map