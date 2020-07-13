"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var SideBarTools_1 = require("./SideBarTools");
var TicketView_1 = require("./TicketView");
var ProductView_1 = require("./ProductView");
exports.index = function (props) {
    return (React.createElement("div", { style: {
            width: "100vw",
            height: "88vh",
            display: "flex",
            justifyContent: "space-between"
        } },
        React.createElement("div", { style: {
                width: "8%",
                paddingTop: 20,
                backgroundColor: props.Theme.theme === "light" ? "#EEEEEE" : "#212121",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "transparent",
                borderRightColor: props.Theme.theme === "light" ? "#ccc" : "#2C2C2C"
            } },
            React.createElement(SideBarTools_1.default, null)),
        React.createElement("div", { style: {
                width: "35%",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "transparent",
                borderRightColor: props.Theme.theme === "light" ? "#ccc" : "#2C2C2C",
                borderLeftColor: props.Theme.theme === "light" ? "#ccc" : "#2C2C2C"
            } },
            React.createElement(core_1.Paper, { square: true, elevation: 20, style: {
                    height: "87vh"
                } },
                React.createElement(core_1.AppBar, { elevation: 0, position: "static", color: "default" },
                    React.createElement(TicketView_1.default, null)))),
        React.createElement("div", { style: {
                width: "56%",
                backgroundColor: props.Theme.theme === "light" ? "#EEEEEE" : "#212121",
            } },
            React.createElement(ProductView_1.default, null))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        SocketConn: state.SocketConn
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(exports.index);
//# sourceMappingURL=index.js.map