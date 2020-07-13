"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var Modal_1 = require("@material-ui/core/Modal");
var react_router_dom_1 = require("react-router-dom");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}); });
var index = function (props) {
    var classes = useStyles();
    var _a = React.useState(false), tab1 = _a[0], setTab1 = _a[1];
    var _b = React.useState(false), tab2 = _b[0], setTab2 = _b[1];
    var _c = React.useState(false), tab3 = _c[0], setTab3 = _c[1];
    var _d = React.useState(false), tab4 = _d[0], setTab4 = _d[1];
    var _e = React.useState(false), tab5 = _e[0], setTab5 = _e[1];
    var _f = React.useState(false), tab6 = _f[0], setTab6 = _f[1];
    var _g = React.useState(false), tab7 = _g[0], setTab7 = _g[1];
    var _h = React.useState(false), tab8 = _h[0], setTab8 = _h[1];
    var _j = React.useState(false), tab9 = _j[0], setTab9 = _j[1];
    // const [LoadingBackUp, setLoadingBackUp] = React.useState(false);
    var history = react_router_dom_1.useHistory();
    var location = react_router_dom_1.useLocation();
    var _k = React.useState(false), open = _k[0], setOpen = _k[1];
    var handleOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    return (React.createElement("div", { style: {
            width: "100vw",
            height: "100vh",
            paddingTop: 25,
            paddingLeft: 20,
            paddingRight: 20,
            overflow: "hidden",
        } },
        React.createElement("div", { style: { display: "flex" } },
            React.createElement(core_1.Paper, { square: true, onClick: function () {
                    history.push("/workperiod/list-file");
                }, onMouseEnter: function () {
                    setTab1(true);
                }, onMouseLeave: function () {
                    setTab1(false);
                }, elevation: tab1 ? 20 : 2, style: {
                    backgroundColor: props.Theme.theme === "light" ? "#00AEDB" : "#212121",
                    width: "40vw",
                    cursor: "pointer",
                    height: "27vh",
                    textAlign: "center",
                    paddingTop: 20,
                } },
                React.createElement("img", { src: "./assets/icons/timetable.png", style: { width: 60, height: 60, margin: "auto" } }),
                React.createElement(core_1.Typography, { style: { color: "#fff", marginTop: 13 }, variant: "h4" }, "Work Periods")),
            React.createElement(core_1.Paper, { square: true, onClick: function () {
                    props.WorkPeriod.isStarted ? history.push("/pos") : handleOpen();
                }, onMouseEnter: function () {
                    setTab2(true);
                }, onMouseLeave: function () {
                    setTab2(false);
                }, elevation: tab2 ? 20 : 2, style: {
                    backgroundColor: props.Theme.theme === "light" ? "#00AEDB" : "#212121",
                    width: "40vw",
                    cursor: "pointer",
                    height: "27vh",
                    textAlign: "center",
                    paddingTop: 20,
                    marginLeft: 15,
                } },
                React.createElement("img", { src: props.WorkPeriod.isStarted
                        ? "./assets/icons/icons8_cash_register_128px_1.png"
                        : "./assets/icons/icons8_cash_register_128px.png", style: { width: 80, height: 80, margin: "auto" } }),
                React.createElement(core_1.Typography, { style: {
                        color: props.WorkPeriod.isStarted ? "#fff" : "#575757",
                        marginTop: 3,
                    }, variant: "h4" }, "POS")),
            React.createElement(core_1.Paper, { square: true, onClick: function () {
                    history.push("/tickets");
                }, onMouseEnter: function () {
                    setTab3(true);
                }, onMouseLeave: function () {
                    setTab3(false);
                }, elevation: tab3 ? 20 : 2, style: {
                    backgroundColor: props.Theme.theme === "light" ? "#00AEDB" : "#212121",
                    width: "40vw",
                    cursor: "pointer",
                    height: "27vh",
                    textAlign: "center",
                    paddingTop: 20,
                    marginLeft: 15,
                } },
                React.createElement("img", { src: "./assets/icons/invoice.png", style: { width: 60, height: 60, margin: "auto" } }),
                React.createElement(core_1.Typography, { style: { color: "#fff", marginTop: 10 }, variant: "h4" }, "Tickets"))),
        React.createElement("div", { style: { display: "flex", marginTop: 10 } },
            React.createElement(core_1.Paper, { square: true, onClick: function () {
                    props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? history.push("/accounts")
                        : null;
                }, onMouseEnter: function () {
                    props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? setTab4(true)
                        : null;
                }, onMouseLeave: function () {
                    props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? setTab4(false)
                        : null;
                }, elevation: tab4 ? 20 : 2, style: {
                    backgroundColor: props.Theme.theme === "light" ? "#00AEDB" : "#212121",
                    width: "40vw",
                    cursor: "pointer",
                    height: "27vh",
                    textAlign: "center",
                    paddingTop: 20,
                } },
                React.createElement("img", { src: props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? "./assets/icons/combo_chart.png"
                        : "./assets/icons/icons8_combo_chart_128px_1.png", style: { width: 60, height: 60, margin: "auto" } }),
                React.createElement(core_1.Typography, { style: {
                        color: props.User.isLoggedIn === true &&
                            props.User.userLogged.prevarges === "1"
                            ? "#fff"
                            : "#575757",
                        marginTop: 13,
                    }, variant: "h4" }, "Accounts")),
            React.createElement(core_1.Paper, { onClick: function () {
                    history.push("/warehouses");
                }, square: true, onMouseEnter: function () {
                    setTab5(true);
                }, onMouseLeave: function () {
                    setTab5(false);
                }, elevation: tab5 ? 20 : 2, style: {
                    backgroundColor: props.Theme.theme === "light" ? "#00AEDB" : "#212121",
                    width: "40vw",
                    cursor: "pointer",
                    height: "27vh",
                    textAlign: "center",
                    paddingTop: 20,
                    marginLeft: 15,
                } },
                React.createElement("img", { src: "./assets/icons/icons8_warehouse_240px.png", style: { width: 80, height: 80, margin: "auto" } }),
                React.createElement(core_1.Typography, { style: { color: "#fff", marginTop: 3 }, variant: "h4" }, "Warehouses")),
            React.createElement(core_1.Paper, { square: true, onClick: function () {
                    props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? history.push("/departments")
                        : null;
                }, onMouseEnter: function () {
                    props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? setTab6(true)
                        : null;
                }, onMouseLeave: function () {
                    props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? setTab6(false)
                        : null;
                }, elevation: tab6 ? 20 : 2, style: {
                    backgroundColor: props.Theme.theme === "light" ? "#00AEDB" : "#212121",
                    width: "40vw",
                    cursor: "pointer",
                    height: "27vh",
                    textAlign: "center",
                    paddingTop: 20,
                    marginLeft: 15,
                } },
                React.createElement("img", { src: props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? "./assets/icons/icons8_unit_240px.png"
                        : "./assets/icons/icons8_unit_240px_1.png", style: { width: 60, height: 60, margin: "auto" } }),
                React.createElement(core_1.Typography, { style: {
                        color: props.User.isLoggedIn === true &&
                            props.User.userLogged.prevarges === "1"
                            ? "#fff"
                            : "#575757",
                        marginTop: 10,
                    }, variant: "h4" }, "Departments"))),
        React.createElement("div", { style: { display: "flex", marginTop: 10 } },
            React.createElement(core_1.Paper, { square: true, onClick: function () {
                    props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? history.push("/reports")
                        : null;
                }, onMouseEnter: function () {
                    props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? setTab7(true)
                        : null;
                }, onMouseLeave: function () {
                    props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? setTab7(false)
                        : null;
                }, elevation: tab7 ? 20 : 2, style: {
                    backgroundColor: props.Theme.theme === "light" ? "#00AEDB" : "#212121",
                    width: "40vw",
                    cursor: "pointer",
                    height: "27vh",
                    textAlign: "center",
                    paddingTop: 20,
                } },
                React.createElement("img", { src: props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? "./assets/icons/account.png"
                        : "./assets/icons/icons8_account_200px_2.png", style: { width: 60, height: 60, margin: "auto" } }),
                React.createElement(core_1.Typography, { style: {
                        color: props.User.isLoggedIn === true &&
                            props.User.userLogged.prevarges === "1"
                            ? "#fff"
                            : "#575757",
                        marginTop: 13,
                    }, variant: "h4" }, "Reports")),
            React.createElement(core_1.Paper, { onClick: function () {
                    props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? history.push("/settings")
                        : null;
                }, square: true, onMouseEnter: function () {
                    props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? setTab8(true)
                        : null;
                }, onMouseLeave: function () {
                    props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? setTab8(false)
                        : null;
                }, elevation: tab8 ? 20 : 2, style: {
                    backgroundColor: props.Theme.theme === "light" ? "#00AEDB" : "#212121",
                    width: "40vw",
                    cursor: "pointer",
                    height: "27vh",
                    textAlign: "center",
                    paddingTop: 20,
                    marginLeft: 15,
                } },
                React.createElement("img", { src: props.User.isLoggedIn === true &&
                        props.User.userLogged.prevarges === "1"
                        ? "./assets/icons/icons8_settings_100px.png"
                        : "./assets/icons/icons8_settings_100px_2.png", style: { width: 60, height: 60, margin: "auto" } }),
                React.createElement(core_1.Typography, { style: {
                        color: props.User.isLoggedIn === true &&
                            props.User.userLogged.prevarges === "1"
                            ? "#fff"
                            : "#575757",
                        marginTop: 11,
                    }, variant: "h4" }, "Settings")),
            React.createElement(core_1.Paper, { square: true, onClick: function () {
                    props.dispatchEvent({
                        type: "LOGOUT",
                    });
                    setTimeout(function () {
                        history.push("/");
                    }, 400);
                }, onMouseEnter: function () {
                    setTab9(true);
                }, onMouseLeave: function () {
                    setTab9(false);
                }, elevation: tab9 ? 20 : 2, style: {
                    backgroundColor: props.Theme.theme === "light" ? "#00AEDB" : "#212121",
                    width: "40vw",
                    cursor: "pointer",
                    height: "27vh",
                    textAlign: "center",
                    paddingTop: 20,
                    marginLeft: 15,
                } },
                React.createElement("img", { src: "./assets/icons/icons8_export_52px.png", style: { width: 60, height: 60, margin: "auto" } }),
                React.createElement(core_1.Typography, { style: { color: "#fff", marginTop: 10 }, variant: "h4" }, "Logout"))),
        React.createElement("div", null,
            React.createElement(Modal_1.default, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: open, className: classes.modal },
                React.createElement(core_1.Paper, { style: { padding: 20 } },
                    React.createElement("div", null,
                        React.createElement(core_1.Typography, { variant: "h6" }, "Start work Period first")),
                    React.createElement("div", { style: { marginTop: 20 } },
                        React.createElement(core_1.Button, { onClick: handleClose, variant: "contained", color: "secondary", style: { width: 200 } }, "Ok")))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        WorkPeriod: state.WorkPeriod,
        User: state.User,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map