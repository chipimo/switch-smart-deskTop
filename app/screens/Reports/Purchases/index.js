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
var semantic_ui_react_1 = require("semantic-ui-react");
var RideSideMenu_1 = require("./RideSideMenu");
var index = function (props) {
    var _a = React.useState({ screens: [] }), panes = _a[0], setPanes = _a[1];
    React.useEffect(function () {
        var tempArr = [];
        tempArr.push({
            menuItem: {
                key: "inventory",
                icon: "box",
                content: "New Entery Reports",
            },
            render: function () { return (React.createElement(semantic_ui_react_1.Tab.Pane, null,
                React.createElement(RideSideMenu_1.default, null))); },
        }, {
            menuItem: {
                key: "stocktaking",
                icon: "book",
                content: "Stock Taking Reports",
            },
            render: function () { return React.createElement(semantic_ui_react_1.Tab.Pane, null, "stock"); },
        });
        setPanes(__assign({}, panes, { screens: tempArr }));
    }, []);
    return (React.createElement("div", { style: { width: 830, height: "70vh" } },
        React.createElement(semantic_ui_react_1.Tab, { panes: panes.screens })));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map