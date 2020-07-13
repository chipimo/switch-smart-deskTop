"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
var store_1 = require("./redux/store");
var react_router_dom_1 = require("react-router-dom");
var notistack_1 = require("notistack");
var grommet_1 = require("grommet");
var electron_1 = require("electron");
var app_1 = require("./app");
var win = electron_1.remote.getCurrentWindow();
var theme = {
    global: {
        font: {
            family: "Roboto",
            size: "14px",
            height: "20px"
        }
    }
};
var Main = function (props) {
    var _a = React.useState(true), Main_Win_View = _a[0], setMain_Win_View = _a[1];
    React.useEffect(function () {
        setTimeout(function () {
            win.setFullScreen(true);
        }, 100);
    }, []);
    return (React.createElement("div", { style: {
            width: "100%",
            height: "100vh",
            overflow: "hidden"
        } },
        React.createElement(app_1.default, null)));
};
react_dom_1.render(React.createElement(react_redux_1.Provider, { store: store_1.default },
    React.createElement(react_router_dom_1.HashRouter, null,
        React.createElement(grommet_1.Grommet, { theme: theme },
            React.createElement(notistack_1.SnackbarProvider, null,
                React.createElement(Main, null))))), document.querySelector("main"));
//# sourceMappingURL=renderer.js.map