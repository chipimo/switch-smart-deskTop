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
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var styles_2 = require("@material-ui/core/styles");
var Tooltip_1 = require("@material-ui/core/Tooltip");
var AppBar_1 = require("@material-ui/core/AppBar");
var grommet_1 = require("grommet");
// import { Button } from "@blueprintjs/core";
var react_router_dom_1 = require("react-router-dom");
var semantic_ui_react_1 = require("semantic-ui-react");
var SelectionPan_1 = require("./screens/SelectionPan");
var LoginPage_1 = require("./screens/LoginPage");
var WorkPeriod_1 = require("./screens/WorkPeriod");
var Pos_1 = require("./screens/Pos");
var Tickets_1 = require("./screens/Tickets");
var Accounts_1 = require("./screens/Accounts");
var AccountDetails_1 = require("./screens/Accounts/AccountDetails");
var Warehouses_1 = require("./screens/Warehouses");
var DepartmentView_1 = require("./screens/Departments/DepartmentView");
var Reports_1 = require("./screens/Reports");
var Settings_1 = require("./screens/Settings");
var NewWorkPeriod_1 = require("./screens/WorkPeriod/NewWorkPeriod");
var Notifications_1 = require("./screens/Notifications");
var dataBase_1 = require("./redux/dataBase");
var Drawer_1 = require("@material-ui/core/Drawer");
var Dep_Notifications_1 = require("./screens/Departments/Dep_Notifications");
var updater_1 = require("./redux/dataBase/updater");
var react_toastify_1 = require("react-toastify");
var electron_1 = require("electron");
var electron = require("electron");
var mainWindow = electron_1.remote.getCurrentWindow();
var socketIOClient = require("socket.io-client");
var moment = require("moment");
var socketUrl = "http://localhost:3200";
// const socketUrl = "https://switch-smart.herokuapp.com/";
// Moment valz
var date = new Date();
var check = moment(date);
var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
var month = check.format("MMMM"); // => ('January','February ----)
var year = check.format("YYYY");
// Theme layout
var darkTheme = styles_1.createMuiTheme({
    palette: {
        type: "dark",
    },
});
var lightTheme = styles_1.createMuiTheme({
    palette: {
        type: "light",
    },
});
// Tool tip
var HtmlTooltip = styles_2.withStyles(function (theme) { return ({
    tooltip: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
    },
}); })(Tooltip_1.default);
var Accapp = function (props) {
    var _a = React.useState({ Connected: false }), conn = _a[0], setConn = _a[1];
    var _b = React.useState(true), iSConnecting = _b[0], setiSConnecting = _b[1];
    var _c = React.useState(false), LoadingBackUp = _c[0], setLoadingBackUp = _c[1];
    var _d = React.useState({
        top: false,
        left: false,
        bottom: false,
        bottom2: false,
        right: false,
    }), Drawerstate = _d[0], setDrawerState = _d[1];
    var _e = React.useState(true), LoadOnce = _e[0], setLoadOnce = _e[1];
    var history = react_router_dom_1.useHistory();
    var toggleDrawer = function (side, open) { return function (event) {
        var _a;
        if (event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerState(__assign({}, Drawerstate, (_a = {}, _a[side] = open, _a)));
    }; };
    React.useEffect(function () {
        if (LoadOnce) {
            setLoadOnce(false);
            mainWindow.maximize();
            setTimeout(function () {
                initiSocket();
            }, 3000);
            dataBase_1.default.HandleTheme({ _type: "getTheme" }, function (callback) {
                props.dispatchEvent({ type: "Theme", theme: "light" });
            });
            dataBase_1.default.HandleWorkperiods({ _type: "loadList" }, function (recivedCallback) {
                if (recivedCallback)
                    recivedCallback.map(function (list) {
                        if (list.dateEnded === "") {
                            var initalData = {
                                type: "STARTWORKPERIOD",
                                id: list.id,
                                dateStarted: list.dateStarted,
                                dateStartedString: list.dateStartedString,
                                date: list.date,
                                time: list.time,
                                timeEnded: list.timeEnded,
                                dateEnded: list.dateEnded,
                                dateEndedString: list.dateEndedString,
                                note: list.note,
                                userId: list.userId,
                                department: list.department,
                                departmentInfo: list.departmentInfo,
                                workedFor: list.workedFor,
                                year: list.year,
                                month: list.month,
                                week: list.week,
                                day: list.day,
                            };
                            props.dispatchEvent(initalData);
                        }
                    });
                props.dispatchEvent({
                    type: "SETWORKPERIOD",
                    data: recivedCallback,
                });
            });
        }
        // console.log(props.Updater);
    }, []);
    var initiSocket = function () {
        dataBase_1.default.CheckConfig();
        setConn(__assign({}, conn, { Connected: false }));
        var socket = socketIOClient(socketUrl);
        socket.on("connect", function () {
            setConn(__assign({}, conn, { Connected: true }));
            props.dispatchEvent({ type: "CONNECTED", socket: socket });
            updater_1.default.isOnline();
        });
        // socket.emit("GETSALESTICKETS", (callback) => {
        //   // console.log(callback);
        // });
        socket.on("SALESREPORTLIST", function (callback) {
            // console.log(callback);
        });
        socket.on("disconnect", function () {
            props.dispatchEvent({ type: "CONNCETIONFAILED" });
        });
        socket.on("BACKUPFILES", function (data) {
            setLoadingBackUp(false);
            // console.log(data);
            dataBase_1.default.HandelProducts({ _type: "backUp", data: data }, function (callback) { });
        });
        socket.on("TRANSFER_NOTIFICATION", function (data) {
            // console.log(data);
            var datalist = {
                _type: "tranfer",
                value: data.value,
                selected: data.selected,
                state: "recived",
                isCleared: true,
                data: data,
            };
            dataBase_1.default.HandelProducts(datalist, function (callback) {
                react_toastify_1.toast("You Have Recived Product(s) " + data.selected.ItemName + " " + data.value, {
                    position: "top-right",
                    autoClose: 5000,
                    type: "success",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        });
        socket.on("DELIVERY_NOTIFICATION", function (data) {
            var datalist = {
                _type: "tranfer",
                value: data.value,
                selected: data.selected,
                state: "delivery",
                isCleared: true,
                data: data,
            };
            dataBase_1.default.HandelProducts(datalist, function (callback) {
                react_toastify_1.toast("Product(s) " + callback.name + " (" + data.value + ") have been successfuly delivered to " + data.to + " ", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "success",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        });
        socket.on("DEP_LOGGEDIN", function (callback) {
            // if (props.Dep.dep !== callback.name) {
            //   console.log(props.Dep.dep);
            // }
            props.dispatchEvent({
                type: "UserLoggedIn",
                users: callback.users,
            });
        });
        setTimeout(function () {
            setiSConnecting(false);
        }, 300);
    };
    return (React.createElement(styles_1.ThemeProvider, { theme: props.Theme.theme === "light" ? lightTheme : darkTheme },
        React.createElement(react_toastify_1.ToastContainer, null),
        React.createElement(Notifications_1.default, null),
        React.createElement(core_1.Paper, { square: true, style: {
                width: "100vw",
                height: "100vh",
                overflow: "hidden !important",
            } },
            React.createElement(AppBar_1.default, { elevation: 1, position: "static", color: "default" },
                React.createElement("div", { style: {
                        width: "100vw",
                        paddingLeft: 10,
                        display: "flex",
                        justifyContent: "space-between",
                    } },
                    React.createElement("div", { style: { display: "flex", marginTop: 10 } },
                        React.createElement("div", null,
                            React.createElement("img", { style: { width: 30, marginTop: -2, marginRight: 10 }, src: "./assets/icons/logo.png" })),
                        React.createElement("div", null,
                            React.createElement(core_1.Typography, { variant: "h6", style: { color: "#AAAAAA", marginTop: -5 }, color: "inherit" }, "Switch Smart"))),
                    React.createElement("div", { style: { marginRight: 26, display: "flex" } },
                        React.createElement("div", { style: { display: "flex", color: "#888080" } },
                            React.createElement("div", { style: { marginTop: 5, marginRight: 10 } },
                                React.createElement(core_1.Typography, { variant: "h6" },
                                    day,
                                    ",")),
                            React.createElement("div", { style: { marginTop: 5, marginRight: 10 } },
                                React.createElement(core_1.Typography, { variant: "h6" },
                                    month,
                                    " ",
                                    date.getDate(),
                                    ",")),
                            React.createElement("div", { style: { marginTop: 5, marginRight: 10 } },
                                React.createElement(core_1.Typography, { variant: "h6" }, year)),
                            React.createElement("div", { style: { marginTop: 9, marginRight: 20 } },
                                React.createElement(core_1.Typography, { variant: "h6" },
                                    React.createElement(grommet_1.Clock, { style: { color: "#888080" }, type: "digital" }))))))),
            React.createElement(core_1.Paper, { style: {
                    width: "100vw",
                    height: "90.5vh",
                } },
                React.createElement(react_router_dom_1.Route, { path: "/", exact: true, component: LoginPage_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/home", component: SelectionPan_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/workperiod/list-file", component: WorkPeriod_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/workperiod/new-file", component: NewWorkPeriod_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/pos", component: Pos_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/tickets", component: Tickets_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/accounts", component: Accounts_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/accounts_details", component: AccountDetails_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/warehouses", component: Warehouses_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/departments", component: DepartmentView_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/reports", component: Reports_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/settings", component: Settings_1.default })),
            React.createElement(AppBar_1.default, { style: {
                    borderStyle: "solid",
                    height: 50,
                    borderWidth: 1,
                    zIndex: 20000,
                    overflow: "hidden",
                    borderColor: "transparent",
                    borderTopColor: props.Theme.theme === "light" ? "#C6C6C6" : "transparent",
                }, position: "static", color: "default" },
                React.createElement("div", { style: {
                        marginTop: 5,
                        marginRight: 15,
                        display: "flex",
                        justifyContent: "space-between",
                    } },
                    React.createElement("div", { style: { marginLeft: 20, display: "flex" } },
                        iSConnecting ? (React.createElement("div", { style: { marginTop: 2, display: "flex" } },
                            React.createElement(semantic_ui_react_1.Icon, { name: "refresh", loading: true }),
                            React.createElement(core_1.Typography, { style: { marginTop: -4 } }, "Connecting..."))) : (React.createElement("div", null, props.SocketConn.isConn ? (React.createElement("div", { style: { marginTop: 5, display: "flex" } },
                            React.createElement(semantic_ui_react_1.Icon, { name: "server", color: "green" }),
                            React.createElement(core_1.Typography, { style: { marginTop: -1 } }, "Connected*"))) : (React.createElement("div", { style: { marginTop: 5, display: "flex" } },
                            React.createElement(semantic_ui_react_1.Icon, { name: "server" }),
                            React.createElement(core_1.Typography, { style: { marginTop: -1 } }, "Connection Failed"))))),
                        props.Dep.dep ? (React.createElement("div", { style: { display: "flex", marginLeft: 10, marginTop: 5 } },
                            React.createElement(semantic_ui_react_1.Icon, { name: "building" }),
                            React.createElement(core_1.Typography, null, props.Dep.dep),
                            React.createElement("div", { style: { marginLeft: 10 } }))) : null),
                    React.createElement("div", { style: { display: "flex" } },
                        props.User.isLoggedIn ? (React.createElement("div", { style: { display: "flex" } },
                            React.createElement("div", { style: { marginTop: 3, marginRight: 10 } },
                                React.createElement(core_1.Typography, null, props.User.userLogged.userName)),
                            React.createElement("div", { style: { marginTop: -15 } },
                                React.createElement(Drawer_1.default, { anchor: "bottom", open: Drawerstate.bottom, onClose: toggleDrawer("bottom", false) },
                                    React.createElement(Dep_Notifications_1.default, null))),
                            React.createElement("div", { style: { marginRight: 10, marginTop: -1 } },
                                React.createElement(core_1.Button, { onClick: function () {
                                        history.push("/home");
                                    } },
                                    React.createElement(core_1.Typography, null, "Main Menu"))))) : null,
                        React.createElement(core_1.Button, { onClick: function () {
                                history.push("/home");
                            } },
                            React.createElement(core_1.Typography, null, "Main Menu")),
                        React.createElement("div", null,
                            React.createElement("div", { style: { display: "flex" } },
                                React.createElement(HtmlTooltip, { title: React.createElement(React.Fragment, null,
                                        React.createElement(core_1.Typography, { color: "inherit" }, "Change Theme Color"), "default theme:" + props.Theme.theme) },
                                    React.createElement(core_1.IconButton, { style: {
                                            width: 30,
                                            height: 30,
                                            backgroundColor: props.Theme.theme === "light" ? "#212121" : "#ccc",
                                        }, onClick: function () {
                                            props.dispatchEvent({
                                                type: "setTheme",
                                                setTheme: props.Theme.theme === "light" ? "dark" : "light",
                                            });
                                        } }))))))))));
};
function mapStateToProps(state) {
    return {
        NetiveNotify: state.NetiveNotify,
        Theme: state.Theme,
        SocketConn: state.SocketConn,
        User: state.User,
        Dep: state.Dep,
        WorkPeriod: state.WorkPeriod,
        Updater: state.Updater,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Accapp);
//# sourceMappingURL=app.js.map