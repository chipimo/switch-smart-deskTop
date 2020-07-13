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
var styles_1 = require("@material-ui/core/styles");
var TextField_1 = require("@material-ui/core/TextField");
var Button_1 = require("@material-ui/core/Button");
var react_redux_1 = require("react-redux");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    paper: {
        position: "absolute",
        width: 600,
        height: 300,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}); });
function index(props) {
    var _a = React.useState(false), isSet = _a[0], setIsste = _a[1];
    var _b = React.useState({ note: "" }), note = _b[0], setNote = _b[1];
    var classes = useStyles();
    React.useEffect(function () {
        if (props.Cart.isItemInCart) {
            setIsste(true);
        }
    }, [props]);
    var handleChangePrice = function (prop) { return function (event) {
        var _a;
        setNote(__assign({}, note, (_a = {}, _a[prop] = event.target.value, _a)));
    }; };
    return (React.createElement("div", { className: classes.paper },
        isSet ? null : React.createElement("div", null, "No Ticket to add note"),
        React.createElement(TextField_1.default, { id: "outlined-multiline-static", label: "Ticket note", multiline: true, fullWidth: true, value: note.note, onChange: handleChangePrice("note"), variant: "outlined" }),
        React.createElement("div", { style: { display: "flex", marginTop: 30 } },
            React.createElement(Button_1.default, { onClick: function () {
                    props.dispatchEvent({ type: "SetNote", note: note });
                    setNote(__assign({}, note, { note: "" }));
                }, disabled: isSet ? false : true, variant: "contained", color: "secondary" }, "Add Note"))));
}
function mapStateToProps(state) {
    return {
        Cart: state.Cart,
        TicketNote: state.TicketNote,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map