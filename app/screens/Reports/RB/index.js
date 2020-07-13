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
var styles_1 = require("@material-ui/core/styles"); // web.cjs is required for IE 11 support
var dataBase_1 = require("../../../redux/dataBase");
var TableCell_1 = require("@material-ui/core/TableCell");
var ciqu_react_calendar_1 = require("ciqu-react-calendar");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var PictureAsPdf_1 = require("@material-ui/icons/PictureAsPdf");
var Currency = require("react-currency-formatter");
var moment = require("moment");
var ipcRenderer = require("electron").ipcRenderer;
var _ = require("lodash");
var check = moment(new Date());
var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
var month = check.format("MMMM"); // => ('January','February.....)
var year = check.format("YYYY");
var time = check.format("LT");
var useStyles = styles_1.makeStyles({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
    },
});
var StyledTableRow = styles_1.withStyles(function (theme) { return ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}); })(TableRow_1.default);
var initialState = {
    mouseX: null,
    mouseY: null,
};
var index = function (props) {
    var classes = useStyles();
    var _a = React.useState({ value: moment() }), selectedDate = _a[0], setSelectedDate = _a[1];
    var _b = React.useState({ data: [] }), SalesList = _b[0], setSalesList = _b[1];
    var _c = React.useState("Deparment"), Dep = _c[0], setDep = _c[1];
    var _d = React.useState({
        date: "",
        day: "",
        totalInvoices: "",
    }), Header = _d[0], setHeader = _d[1];
    var _e = React.useState({
        GrandTotal: 0,
        Discount: 0,
        Balance: 0,
        Taxtotal: 0,
    }), Totals = _e[0], setTotals = _e[1];
    var _f = React.useState([]), Departments = _f[0], SetDepartments = _f[1];
    var _g = React.useState([]), Months = _g[0], SetMonths = _g[1];
    var _h = React.useState(""), defaultMonth = _h[0], setdefaultMonth = _h[1];
    var _j = React.useState(2), reportType = _j[0], setReportType = _j[1];
    React.useEffect(function () {
        setDep(props.Dep.dep);
        setdefaultMonth(month);
        if (props.SocketConn.isConn) {
            dataBase_1.default.HandleDepartments({ type: "getAll" }, function (callback) {
                SetDepartments(callback.departments);
                handleGetSaleData({
                    date: month,
                    Datetype: "Month",
                    dep: props.Dep.dep,
                });
            });
        }
        else {
            // SetDepartments(props.Dep.dep);
            handleGetSaleData({
                date: month,
                Datetype: "Month",
                dep: props.Dep.dep,
            });
        }
    }, [props]);
    var handleGetSaleData = function (prop) {
        dataBase_1.default.HandelReports({
            _type: "get_sales",
            data: prop.dep,
            dateType: prop.Datetype,
            date: prop.date,
        }, function (callback) {
            // console.log(callback);
            setHeader(__assign({}, Header, { date: prop.date, totalInvoices: callback.data.length }));
            setSalesList(__assign({}, SalesList, { data: callback.data }));
            var monthList = [];
            callback.data.map(function (list) {
                var IsMonth = monthList.indexOf(list.Month);
                if (IsMonth === -1) {
                    monthList.push(list.Month);
                }
            });
            SetMonths(monthList);
        });
    };
    var handleDepChange = function (event) {
        setDep(event.target.value);
        // console.log(event.target.value);
        handleGetSaleData({
            date: month,
            Datetype: "Month",
            dep: event.target.value,
        });
    };
    var handleMonthChange = function (event) {
        setdefaultMonth(event.target.value);
        // console.log(event.target.value);
        handleGetSaleData({
            date: event.target.value,
            Datetype: "Month",
            dep: Dep,
        });
    };
    var onChange = function (value, inputValue) {
        // console.log(value.format("MM/DD/YYYY"));
        setSelectedDate(__assign({}, selectedDate, { value: value }));
        handleGetSaleData({
            date: value.format("MM/DD/YYYY"),
            Datetype: "Datetrack",
            dep: Dep,
        });
    };
    var savePdf = function () {
        ipcRenderer.send("save_pdf", { type: "trx", SalesList: SalesList });
    };
    var onOpenChange = function (status) {
        // console.log("open status: " + status);
    };
    var disabledDate = function (currentDate, inputValue) {
        return false;
    };
    return (React.createElement("div", { style: { width: "84vw", display: "flex" } },
        React.createElement("div", { style: {
                width: "100%",
                height: "84vh",
                backgroundColor: "#424242",
                padding: 7,
                marginTop: 4,
                overflow: "auto",
            } },
            React.createElement("div", { style: { overflow: "auto", display: "flex" } },
                React.createElement("div", { style: { width: "20vw" } },
                    React.createElement(core_1.NativeSelect, { value: Dep, onChange: handleDepChange, inputProps: { "aria-label": "age" } }, Departments.map(function (list, index) { return (React.createElement("option", { value: list.dep_name }, list.dep_name)); }))),
                React.createElement("div", { style: { width: "20vw", marginLeft: 30 } },
                    React.createElement(core_1.NativeSelect, { value: defaultMonth, onChange: handleMonthChange, inputProps: { "aria-label": "age" } }, Months.map(function (list, index) { return (React.createElement("option", { value: list }, list)); }))),
                React.createElement(core_1.Divider, { style: { marginTop: 3, marginBottom: 5 } }),
                React.createElement(ciqu_react_calendar_1.default, { onChange: onChange, value: selectedDate.value, allowClear: true, disabled: false, placeholder: "please input date", format: "MM/DD/YYYY", onOpenChange: onOpenChange, disabledDate: disabledDate })),
            React.createElement(core_1.Divider, null),
            React.createElement(TableContainer_1.default, { component: core_1.Paper },
                React.createElement(core_1.Typography, { style: { marginTop: 5, marginBottom: 5 } }, "Sales Invoice"),
                React.createElement(core_1.Button, { style: { marginLeft: 10 }, variant: "outlined", startIcon: React.createElement(PictureAsPdf_1.default, null), onClick: function () { return savePdf(); } }, "Save As Pdf"),
                React.createElement(Table_1.default, { stickyHeader: true, size: "small", "aria-label": "a dense table" },
                    React.createElement(TableHead_1.default, null,
                        React.createElement(TableRow_1.default, null,
                            React.createElement(TableCell_1.default, { align: "left" }, "Invoice No"),
                            React.createElement(TableCell_1.default, { align: "left" }, "Department"),
                            React.createElement(TableCell_1.default, { align: "left" }, "Date"),
                            React.createElement(TableCell_1.default, { align: "right" }, "Cash sales"),
                            React.createElement(TableCell_1.default, { align: "right" }, "Discount"),
                            React.createElement(TableCell_1.default, { align: "right" }, "Credit"),
                            React.createElement(TableCell_1.default, { align: "right" }, "Tax"),
                            React.createElement(TableCell_1.default, { align: "right" }, "Total"))),
                    React.createElement(TableBody_1.default, null, SalesList.data.map(function (row) { return (React.createElement(StyledTableRow, { key: row.SrNo },
                        React.createElement(TableCell_1.default, { align: "left" },
                            React.createElement(core_1.Typography, null, row.SrNo)),
                        React.createElement(TableCell_1.default, { align: "left" },
                            React.createElement(core_1.Typography, null, row.Department)),
                        React.createElement(TableCell_1.default, { align: "left" },
                            React.createElement(core_1.Typography, null, row.Date)),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, null,
                                React.createElement(Currency, { locale: "en", quantity: row.GrandTotal, symbol: "K" }))),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, null,
                                React.createElement(Currency, { locale: "en", quantity: row.Discount, symbol: "K" }))),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, null,
                                React.createElement(Currency, { locale: "en", quantity: row.Balance, symbol: "K" }))),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, null,
                                React.createElement(Currency, { locale: "en", quantity: row.totalTaxFinal, symbol: "K" }))),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, null,
                                React.createElement(Currency, { locale: "en", quantity: row.GrandTotal - row.Discount - row.Balance, symbol: "K" }))))); })))))));
};
function mapStateToProps(state) {
    return {
        Dep: state.Dep,
        SocketConn: state.SocketConn,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map