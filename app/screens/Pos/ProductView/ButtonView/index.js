"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
exports.index = function (props) {
    return (React.createElement("div", { style: { width: "100%", height: "84vh" } },
        React.createElement(core_1.Button, { variant: "text", style: {
                width: "100%",
                height: 70,
                backgroundColor: "#1DA261",
                color: "#fff"
            } }, "soup sole")));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(exports.index);
//# sourceMappingURL=index.js.map