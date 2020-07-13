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
var react_data_grid_1 = require("react-data-grid");
var createRowData_1 = require("./createRowData");
var react_data_grid_addons_1 = require("react-data-grid-addons");
var defaultColumnProperties = {
    width: 160,
};
var columns = [
    {
        key: "id",
        name: "ID",
    },
    {
        key: "firstName",
        name: "First Name",
    },
    {
        key: "lastName",
        name: "Last Name",
    },
    {
        key: "jobTitle",
        name: "Job Title",
    },
    {
        key: "jobArea",
        name: "Job Area",
    },
    {
        key: "jobType",
        name: "Job Type",
    },
    {
        key: "email",
        name: "Email",
    },
    {
        key: "street",
        name: "Street",
    },
    {
        key: "zipCode",
        name: "ZipCode",
    },
    {
        key: "date",
        name: "Date",
    },
    {
        key: "catchPhrase",
        name: "Catch Phrase",
    },
].map(function (c) { return (__assign({}, c, defaultColumnProperties)); });
var ROW_COUNT = 50;
var groupBy = ["jobType"];
var getSubRowDetails = function (expandedRows) { return function (rowItem) {
    var isExpanded = expandedRows[rowItem.id]
        ? expandedRows[rowItem.id]
        : false;
    return {
        group: rowItem.teamMembers && rowItem.teamMembers.length > 0,
        expanded: isExpanded,
        children: rowItem.teamMembers,
        field: "firstName",
        treeDepth: rowItem.treeDepth || 0,
        siblingIndex: rowItem.siblingIndex,
        numberSiblings: rowItem.numberSiblings,
    };
}; };
function updateSubRowDetails(subRows, parentTreeDepth) {
    var treeDepth = parentTreeDepth || 0;
    subRows.forEach(function (sr, i) {
        sr.treeDepth = treeDepth + 1;
        sr.siblingIndex = i;
        sr.numberSiblings = subRows.length;
    });
}
var onCellExpand = function (args) { return function (_a) {
    var rows = _a.rows, expandedRows = _a.expandedRows;
    var rowKey = args.rowData.id;
    var rowIndex = rows.indexOf(args.rowData);
    var subRows = args.expandArgs.children;
    if (expandedRows && !expandedRows[rowKey]) {
        expandedRows[rowKey] = true;
        updateSubRowDetails(subRows, args.rowData.treeDepth);
        rows.splice.apply(rows, [rowIndex + 1, 0].concat(subRows));
    }
    else if (expandedRows[rowKey]) {
        expandedRows[rowKey] = false;
        rows.splice(rowIndex + 1, subRows.length);
    }
    return { expandedRows: expandedRows, rows: rows };
}; };
var DataTable = function () {
    var _a = React.useState({
        expandedRows: {},
        rows: createRowData_1.default(ROW_COUNT),
    }), state = _a[0], setState = _a[1];
    var visibleRows = react_data_grid_addons_1.Data.Selectors.getRows(state);
    return (React.createElement("div", null,
        React.createElement(react_data_grid_1.default, { columns: columns, rowGetter: function (i) { return visibleRows[i]; }, rowsCount: visibleRows.length, minHeight: 550, getSubRowDetails: getSubRowDetails(state.expandedRows), onCellExpand: function (args) { return setState(onCellExpand(args)); } })));
};
exports.default = DataTable;
//# sourceMappingURL=DataTable.js.map