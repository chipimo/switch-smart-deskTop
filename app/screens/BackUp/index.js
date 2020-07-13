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
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var styles_1 = require("@material-ui/core/styles");
var TableCell_1 = require("@material-ui/core/TableCell");
var backupFunc_1 = require("../../backupFunc");
var semantic_ui_react_1 = require("semantic-ui-react");
var dirTree = require("directory-tree");
var List = [];
var StyledTableRow = styles_1.withStyles(function (theme) { return ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}); })(TableRow_1.default);
var index = function (props) {
    var _a = React.useState({ data: [] }), FiLeist = _a[0], setList = _a[1];
    var _b = React.useState(true), Backedup = _b[0], setBackedup = _b[1];
    React.useEffect(function () {
        var filteredTree = dirTree("C:/Switch-Smart/backups", {
            extensions: /\.tar/,
        });
        if (filteredTree)
            setList(__assign({}, FiLeist, { data: filteredTree.children }));
    }, []);
    return (React.createElement("div", { style: { padding: 15 } },
        React.createElement("div", null,
            React.createElement(core_1.Typography, null, "MANUAL BACKUPS & DATA EXPORTS")),
        React.createElement("div", { style: { marginTop: 10 } },
            React.createElement(TableContainer_1.default, { style: { height: "76vh" }, component: core_1.Paper },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                    React.createElement(core_1.Typography, { style: { marginTop: 5, marginBottom: 5 } }, "back-up list"),
                    Backedup ? null : (React.createElement(core_1.Typography, { style: { marginTop: 5, marginBottom: 5 } }, "Backing up please wait...")),
                    React.createElement(core_1.Button, { onClick: function () {
                            setBackedup(false);
                            backupFunc_1.socketStream(function (BackupCallback) {
                                setBackedup(true);
                                var filteredTree = dirTree("C:/Switch-Smart/backups", {
                                    extensions: /\.tar/,
                                });
                                setList(__assign({}, FiLeist, { data: filteredTree.children }));
                            });
                        }, disabled: Backedup ? false : true, variant: "contained", color: "primary" }, "Create backup")),
                React.createElement(Table_1.default, { stickyHeader: true, size: "small", "aria-label": "a dense table" },
                    React.createElement(TableHead_1.default, null,
                        React.createElement(TableRow_1.default, null,
                            React.createElement(TableCell_1.default, { align: "left" }, "Name"),
                            React.createElement(TableCell_1.default, { align: "left" }, "Size"),
                            React.createElement(TableCell_1.default, { align: "right" }),
                            React.createElement(TableCell_1.default, { align: "right" }))),
                    React.createElement(TableBody_1.default, null, FiLeist.data.map(function (list, index) {
                        return (React.createElement(StyledTableRow, { key: index },
                            React.createElement(TableCell_1.default, { align: "left" },
                                React.createElement(core_1.Typography, null,
                                    list.name,
                                    " ")),
                            React.createElement(TableCell_1.default, { align: "left" },
                                React.createElement(core_1.Typography, null,
                                    list.size,
                                    " ")),
                            React.createElement(TableCell_1.default, { align: "right" },
                                React.createElement(core_1.Button, { startIcon: React.createElement(semantic_ui_react_1.Icon, { size: "small", name: "refresh" }), variant: "contained", size: "small", onClick: function () {
                                        setBackedup(false);
                                        backupFunc_1.restoreDB({ backup_file: list.name }, function (callback) {
                                            setBackedup(true);
                                        });
                                    } }, "Restore Backup")),
                            React.createElement(TableCell_1.default, { align: "right" },
                                React.createElement(core_1.Button, { variant: "contained", color: "secondary", size: "small" }, "Delete Backup"))));
                    })))))));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map