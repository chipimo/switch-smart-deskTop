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
var TreeView_1 = require("@material-ui/lab/TreeView");
var ExpandMore_1 = require("@material-ui/icons/ExpandMore");
var ChevronRight_1 = require("@material-ui/icons/ChevronRight");
var TreeItem_1 = require("@material-ui/lab/TreeItem");
var dataBase_1 = require("../../../redux/dataBase");
var material_table_1 = require("material-table");
var react_1 = require("react");
var AddBox_1 = require("@material-ui/icons/AddBox");
var ArrowDownward_1 = require("@material-ui/icons/ArrowDownward");
var Check_1 = require("@material-ui/icons/Check");
var ChevronLeft_1 = require("@material-ui/icons/ChevronLeft");
var ChevronRight_2 = require("@material-ui/icons/ChevronRight");
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
var tableIcons = {
    Add: react_1.forwardRef(function (props, ref) { return React.createElement(AddBox_1.default, null); }),
    Check: react_1.forwardRef(function (props, ref) { return React.createElement(Check_1.default, null); }),
    Clear: react_1.forwardRef(function (props, ref) { return React.createElement(Clear_1.default, null); }),
    Delete: react_1.forwardRef(function (props, ref) { return React.createElement(DeleteOutline_1.default, null); }),
    DetailPanel: react_1.forwardRef(function (props, ref) { return React.createElement(ChevronRight_2.default, null); }),
    Edit: react_1.forwardRef(function (props, ref) { return React.createElement(Edit_1.default, null); }),
    Export: react_1.forwardRef(function (props, ref) { return React.createElement(SaveAlt_1.default, null); }),
    Filter: react_1.forwardRef(function (props, ref) { return React.createElement(FilterList_1.default, null); }),
    FirstPage: react_1.forwardRef(function (props, ref) { return React.createElement(FirstPage_1.default, null); }),
    LastPage: react_1.forwardRef(function (props, ref) { return React.createElement(LastPage_1.default, null); }),
    NextPage: react_1.forwardRef(function (props, ref) { return React.createElement(ChevronRight_2.default, null); }),
    PreviousPage: react_1.forwardRef(function (props, ref) { return React.createElement(ChevronLeft_1.default, null); }),
    ResetSearch: react_1.forwardRef(function (props, ref) { return React.createElement(Clear_1.default, null); }),
    Search: react_1.forwardRef(function (props, ref) { return React.createElement(Search_1.default, null); }),
    SortArrow: react_1.forwardRef(function (props, ref) { return React.createElement(ArrowDownward_1.default, null); }),
    ThirdStateCheck: react_1.forwardRef(function (props, ref) { return React.createElement(Remove_1.default, null); }),
    ViewColumn: react_1.forwardRef(function (props, ref) { return React.createElement(ViewColumn_1.default, null); }),
};
var RideSideMenu = function (props) {
    var _a = React.useState({ data: [] }), purchaseList = _a[0], setPurchaseList = _a[1];
    var _b = React.useState({
        columns: [
            {
                title: "Product Name ",
                field: "name",
            },
            {
                title: "Group",
                field: "group",
            },
            {
                title: "Recipes",
                field: "recipes",
            },
            {
                title: "Time",
                field: "time",
            },
            {
                title: "Quantity",
                field: "quantity",
            },
        ],
        data: [],
    }), state = _b[0], setState = _b[1];
    var NodeId = 0;
    React.useEffect(function () {
        dataBase_1.default.HandelReports({ _type: "get_purchases" }, function (reciveCallback) {
            setTimeout(function () {
                setPurchaseList(__assign({}, purchaseList, { data: reciveCallback }));
            }, 300);
        });
    }, []);
    return (React.createElement("div", { style: { width: 800, display: "flex", height: "70vh" } },
        React.createElement("div", { style: { width: "80%", padding: 10, height: "66vh", overflow: "auto" } },
            React.createElement(material_table_1.default, { icons: tableIcons, title: "Inventory List ", columns: state.columns, data: state.data })),
        React.createElement(core_1.Paper, { style: { width: "25%", padding: 10 } },
            React.createElement(TreeView_1.default, { defaultCollapseIcon: React.createElement(ExpandMore_1.default, null), defaultExpandIcon: React.createElement(ChevronRight_1.default, null) }, purchaseList.data.map(function (mainNode, index) { return (React.createElement(TreeItem_1.default, { key: index, nodeId: "" + NodeId++, label: "Year-" + mainNode.year }, mainNode.months.map(function (subNode, innerIndex) { return (React.createElement(TreeItem_1.default, { key: innerIndex, nodeId: "" + NodeId++, label: subNode.month }, subNode.days.map(function (list, daysIndex) { return (React.createElement(TreeItem_1.default, { key: daysIndex, nodeId: "" + NodeId++, label: list.day + " " + list.list.length, onClick: function () {
                    setState(__assign({}, state, { data: list.list }));
                } })); }))); }))); })))));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(RideSideMenu);
//# sourceMappingURL=RideSideMenu.js.map