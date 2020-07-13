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
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var Paper_1 = require("@material-ui/core/Paper");
var dataBase_1 = require("../../redux/dataBase");
var Row_1 = require("./Row");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var ciqu_react_calendar_1 = require("ciqu-react-calendar");
var Currency = require("react-currency-formatter");
var moment = require("moment");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    container: {
        zIndex: 8000,
        backgroundColor: "#fff",
        color: '#3b3b3b'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}); });
var index = function (props) {
    var _a = React.useState({
        columns: [],
        data: [],
    }), state = _a[0], setState = _a[1];
    var _b = React.useState(0), TotalSales = _b[0], setTotalSales = _b[1];
    var classes = useStyles();
    var _c = React.useState({ value: moment() }), selectedDate = _c[0], setSelectedDate = _c[1];
    var onChange = function (value, inputValue) {
        // console.log(value.format("MM/DD/YYYY"));
        dataBase_1.default.HandelReports({ _type: "get_sales_tickets", date: value.format("MM/DD/YYYY") }, function (reciveCallback) {
            // console.log(reciveCallback.data);
            setState(__assign({}, state, { data: reciveCallback.data }));
            var totals = 0;
            reciveCallback.data.map(function (items) {
                totals = items.AmountPaid + totals;
            });
            setTotalSales(totals);
        });
        setSelectedDate(__assign({}, selectedDate, { value: value }));
    };
    var onOpenChange = function (status) {
        // console.log("open status: " + status);
    };
    var disabledDate = function (currentDate, inputValue) {
        return false;
    };
    React.useEffect(function () {
        dataBase_1.default.HandelReports({ _type: "get_sales_tickets", date: moment().format("MM/DD/YYYY") }, function (reciveCallback) {
            // console.log(reciveCallback.data);
            setState(__assign({}, state, { data: reciveCallback.data }));
            var totals = 0;
            reciveCallback.data.map(function (items) {
                totals = items.AmountPaid + totals;
            });
            setTotalSales(totals);
        });
    }, []);
    return (React.createElement("div", { style: {
            padding: 6,
            paddingLeft: 27,
            paddingRight: 27,
            height: "84vh",
            overflow: "auto",
        } },
        React.createElement("div", { style: { height: 30, width: 220 } },
            React.createElement(ciqu_react_calendar_1.default, { onChange: onChange, value: selectedDate.value, allowClear: true, disabled: false, placeholder: "please input date", format: "MM/DD/YYYY", className: classes.container, onOpenChange: onOpenChange, disabledDate: disabledDate })),
        React.createElement(TableContainer_1.default, { style: { maxHeight: "80vh" }, component: Paper_1.default },
            React.createElement(Table_1.default, { stickyHeader: true, size: "small", "aria-label": "collapsible table" },
                React.createElement(TableHead_1.default, null,
                    React.createElement(TableRow_1.default, null,
                        React.createElement(TableCell_1.default, null,
                            React.createElement(core_1.Typography, null, "Print")),
                        React.createElement(TableCell_1.default, null,
                            React.createElement(core_1.Typography, null, "Date")),
                        React.createElement(TableCell_1.default, { align: "left" },
                            React.createElement(core_1.Typography, null, "Cash Sale No")),
                        React.createElement(TableCell_1.default, { align: "left" },
                            React.createElement(core_1.Typography, null, "Customer")),
                        React.createElement(TableCell_1.default, { align: "left" },
                            React.createElement(core_1.Typography, null, "Description")),
                        React.createElement(TableCell_1.default, { align: "left" },
                            React.createElement(core_1.Typography, null, "Payment")),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, null, "Cash sale")),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, null, "More")))),
                React.createElement(TableBody_1.default, null,
                    state.data.map(function (row) { return (React.createElement(Row_1.default, { key: row.id, row: row })); }),
                    React.createElement(TableRow_1.default, { style: { backgroundColor: "#303030" } },
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "left" },
                            React.createElement(core_1.Divider, null),
                            React.createElement(core_1.Typography, { variant: "h6" }, "Total sales")),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Divider, null),
                            React.createElement(core_1.Typography, { variant: "h6" },
                                React.createElement(Currency, { locale: "en", quantity: TotalSales, symbol: "K" })),
                            React.createElement(core_1.Divider, null),
                            React.createElement(core_1.Divider, null),
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" })))))));
};
exports.default = index;
//# sourceMappingURL=index.js.map