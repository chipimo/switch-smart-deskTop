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
var styles_1 = require("@material-ui/core/styles");
var TextField_1 = require("@material-ui/core/TextField");
var Button_1 = require("@material-ui/core/Button");
var core_1 = require("@material-ui/core");
var NumberFormat = require("react-number-format");
var uuidv4 = require("uuid/v4");
function CreatId() {
    return uuidv4();
}
function NumberFormatCustom(props) {
    var inputRef = props.inputRef, onChange = props.onChange, other = __rest(props, ["inputRef", "onChange"]);
    return (React.createElement(NumberFormat, __assign({}, other, { getInputRef: inputRef, onValueChange: function (values) {
            onChange({
                target: {
                    value: values.value,
                },
            });
        }, thousandSeparator: true, isNumericString: true, prefix: "K" })));
}
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
var index = function (props) {
    var _a = React.useState({
        ticketNote: "",
        amount: "",
    }), values = _a[0], setValues = _a[1];
    var _b = React.useState({
        ticketNote: "",
        amount: "",
    }), errors = _b[0], setErrors = _b[1];
    var classes = useStyles();
    var handleChangePrice = function (prop) { return function (event) {
        var _a;
        setValues(__assign({}, values, (_a = {}, _a[prop] = event.target.value, _a)));
        if (prop === "amount")
            setErrors(__assign({}, errors, { amount: "" }));
    }; };
    var sendTranstion = function () {
        if (values.amount === "") {
            setErrors(__assign({}, errors, { amount: "Amount charged is required" }));
        }
        else if (values.ticketNote === "") {
            setErrors(__assign({}, errors, { ticketNote: "Transaction note is required" }));
        }
        else {
            var itemData = {
                id: CreatId(),
                ItemName: values.ticketNote,
                productKey: CreatId(),
                sallingprice: values.amount,
                initalPrice: values.amount,
                isTaxEnabled: false,
                quantity: 1,
                amountInstore: 1,
                qnt: 1,
                isAddedToCart: false,
                istaxed: "no",
            };
            props.dispatchEvent({
                type: "ADDTOCART",
                payload: {
                    items: itemData,
                },
            });
        }
    };
    return (React.createElement("div", { className: classes.paper },
        React.createElement("div", { style: { marginBottom: 10 } },
            React.createElement(core_1.Typography, { variant: "h5", style: { color: "#AAAAAA" } }, "Repair")),
        React.createElement("div", { style: { height: 170, paddingTop: 10, overflow: "auto" } },
            React.createElement(TextField_1.default, { id: "ticket note", name: "ticketNote", label: "Ticket note", value: values.ticketNote, onChange: handleChangePrice("ticketNote"), error: errors.ticketNote === "" ? false : true, multiline: true, fullWidth: true, variant: "outlined", helperText: errors.ticketNote }),
            React.createElement("div", { style: { marginTop: 10 } }),
            React.createElement(TextField_1.default, { label: "Repair Charge", value: values.amount, onChange: handleChangePrice("amount"), error: errors.amount === "" ? false : true, variant: "outlined", required: true, fullWidth: true, id: "formatted-numberformat-input", InputProps: {
                    inputComponent: NumberFormatCustom,
                }, helperText: errors.amount })),
        React.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
            } },
            React.createElement("div", null,
                React.createElement(Button_1.default, { onClick: sendTranstion, variant: "contained", color: "primary" }, "Add To Ticket"),
                React.createElement(Button_1.default, { style: { marginLeft: 10 }, variant: "contained", color: "primary", onClick: function () {
                        props.dispatchEvent({ type: "HANDELCLOSE", toClose: "repair" });
                    } }, "done")),
            React.createElement("div", null,
                React.createElement(Button_1.default, { onClick: function () {
                        props.dispatchEvent({ type: "HANDELCLOSE", toClose: "repair" });
                    }, style: { marginLeft: 10 }, variant: "contained", color: "secondary" }, "Cancel")))));
};
function mapStateToProps(state) {
    return {
        Cart: state.Cart,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map