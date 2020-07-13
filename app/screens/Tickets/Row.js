"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var react_router_dom_1 = require("react-router-dom");
var PrintOutlined_1 = require("@material-ui/icons/PrintOutlined");
var More_1 = require("@material-ui/icons/More");
var IconButton_1 = require("@material-ui/core/IconButton");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableRow_1 = require("@material-ui/core/TableRow");
var core_1 = require("@material-ui/core");
var Currency = require("react-currency-formatter");
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
var StyledTableRow = styles_1.withStyles(function (theme) { return ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}); })(TableRow_1.default);
function Row(props) {
    var row = props.row;
    var classes = useRowStyles();
    var history = react_router_dom_1.useHistory();
    var _a = React.useState(false), openNewProduct = _a[0], setopenNewProduct = _a[1];
    React.useEffect(function () {
        // console.log(props.row);
    }, []);
    var CloseOpenProduct = function () {
        setopenNewProduct(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(StyledTableRow, { className: classes.root },
            React.createElement(TableCell_1.default, null,
                React.createElement(IconButton_1.default, { "aria-label": "print row", size: "small", onClick: function () {
                        var itemData = [];
                        row.TicketList.list.map(function (list) {
                            props.dispatchEvent({
                                type: "RESTATECART",
                            });
                            setTimeout(function () {
                                props.dispatchEvent({
                                    type: "ADDTOCART",
                                    payload: {
                                        items: {
                                            id: list.productKey,
                                            ItemName: list.ItemName,
                                            productKey: list.productKey,
                                            sallingprice: list.sallingprice,
                                            initalPrice: list.initalPrice,
                                            isTaxEnabled: list.isTaxEnabled,
                                            quantity: 1,
                                            amountInstore: 1,
                                            qnt: 1,
                                            isAddedToCart: false,
                                            istaxed: "copy",
                                        },
                                    },
                                });
                            });
                            props.dispatchEvent({
                                type: "PRINTHISTORY",
                                invoiceNumber: row.InvoiceNumber,
                                user: row.User,
                                PaymentType: row.PaymentType,
                                Date: row.Date,
                                time: row.time,
                            });
                        }, 300);
                        setTimeout(function () {
                            history.push("/pos");
                        }, 100);
                    } },
                    React.createElement(PrintOutlined_1.default, null))),
            React.createElement(TableCell_1.default, { component: "th", scope: "row" }, row.Date),
            React.createElement(TableCell_1.default, { component: "th", scope: "row" }, row.InvoiceNumber),
            React.createElement(TableCell_1.default, { component: "th", scope: "row" }, row.Customer.name),
            React.createElement(TableCell_1.default, { align: "left" }, row.TicketList.list.map(function (productRow, index) { return (React.createElement("div", { key: index }, productRow.ItemName)); })),
            React.createElement(TableCell_1.default, { align: "left" }, row.PaymentType),
            React.createElement(TableCell_1.default, { align: "right" },
                React.createElement(core_1.Typography, { variant: "h6" },
                    React.createElement(Currency, { locale: "en", quantity: row.RtxAmountPaid, symbol: "K" }))),
            React.createElement(TableCell_1.default, { align: "right" },
                React.createElement(IconButton_1.default, { onClick: function () {
                        console.log(row);
                        setopenNewProduct(true);
                    } },
                    React.createElement(More_1.default, null)))),
        React.createElement(core_1.Modal, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: openNewProduct, className: classes.modal, onClose: CloseOpenProduct },
            React.createElement("div", { className: classes.paper },
                React.createElement("div", { style: { display: '' } },
                    React.createElement("div", null,
                        React.createElement(core_1.Typography, { style: { color: '#fff' }, variant: 'h6' },
                            "Day: ",
                            row.Day)),
                    React.createElement("div", null,
                        React.createElement(core_1.Typography, { style: { color: '#fff' }, variant: 'h6' },
                            "Day: ",
                            row.time)),
                    React.createElement("div", null,
                        React.createElement(core_1.Typography, { style: { color: '#fff' }, variant: 'h6' },
                            "Customer Name: ",
                            row.Customer.name)),
                    React.createElement("div", null,
                        React.createElement(core_1.Typography, { style: { color: '#fff' }, variant: 'h6' },
                            "Customer Phone Number: ",
                            row.Customer.number))),
                React.createElement("div", null,
                    React.createElement("div", null,
                        React.createElement(core_1.Typography, { style: { color: '#fff' }, variant: 'h6' },
                            "GrandTotal : ",
                            React.createElement(Currency, { locale: "en", quantity: row.RtxGrandTotal, symbol: "K" }))),
                    React.createElement("div", null,
                        React.createElement(core_1.Typography, { style: { color: '#fff' }, variant: 'h6' },
                            "Casher : ",
                            row.User)))))));
}
function mapStateToProps(state) {
    return {
        SocketConn: state.SocketConn,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Row);
//# sourceMappingURL=Row.js.map