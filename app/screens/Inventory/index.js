"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var PaneRender_1 = require("./PaneRender");
exports.index = function () {
    return (React.createElement("div", { style: { marginTop: 10 } },
        React.createElement(PaneRender_1.default, null)));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(exports.index);
//# sourceMappingURL=index.js.map