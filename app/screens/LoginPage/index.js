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
var styles_1 = require("@material-ui/core/styles");
var DialPad_1 = require("./DialPad");
var dataBase_1 = require("../../redux/dataBase");
var react_lottie_1 = require("react-lottie");
var semantic_ui_react_1 = require("semantic-ui-react");
var animationData = require("../../assets/lottie/505-error.json");
var Departments_1 = require("../Departments");
var CircularProgress_1 = require("@material-ui/core/CircularProgress");
// Inspired by the Facebook spinners.
var useStylesFacebook = styles_1.makeStyles({
    root: {
        position: "relative",
    },
    top: {
        color: "#eef3fd",
    },
    bottom: {
        color: "#6798e5",
        animationDuration: "550ms",
        marginTop: 20,
    },
});
// ispiered by facebook
function FacebookProgress(props) {
    var classes = useStylesFacebook();
    return (React.createElement("div", { className: classes.root },
        React.createElement(CircularProgress_1.default, __assign({ variant: "indeterminate", disableShrink: true, className: classes.bottom, size: 24, thickness: 4 }, props))));
}
var index = function (props) {
    var _a = React.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = React.useState(true), loadingDep = _b[0], setLoadingDep = _b[1];
    React.useEffect(function () {
        setTimeout(function () {
            dataBase_1.default.CheckConfig();
        }, 200);
        setTimeout(function () {
            setLoading(false);
        }, 4000);
        setTimeout(function () {
            setLoadingDep(false);
        }, 4500);
    }, []);
    var defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (React.createElement(core_1.Paper, { style: {
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundColor: props.Theme.theme === "light" ? "#E5E5E5" : "transparent",
        } },
        React.createElement("div", { style: {
                width: "60vw",
                textAlign: "center",
                justifyContent: "center",
                marginTop: 190,
            } }, props.Config.isSet ? (React.createElement("div", { style: { marginTop: 50 } },
            React.createElement(core_1.Typography, { variant: "h3" }, "Switch Smart POS"),
            React.createElement(core_1.Typography, { variant: "caption", style: { fontSize: 16 } }, "Switch to a smart world"),
            React.createElement("div", { style: {
                    width: "30%",
                    margin: "auto",
                    marginBottom: 20,
                    marginTop: 5,
                } },
                React.createElement(core_1.Divider, null)),
            React.createElement(core_1.Typography, { variant: "caption", style: { fontSize: 12 } }, "Powered by Software Gaints."),
            React.createElement("div", null),
            React.createElement(core_1.Typography, { variant: "caption", style: { fontSize: 12 } },
                " ",
                "Copyright © ",
                new Date().getFullYear(),
                "."))) : (React.createElement("div", { style: { marginTop: -120 } }, !props.SocketConn.isConn ? (React.createElement("div", null, loading ? (React.createElement("div", { style: { marginTop: 30 } },
            React.createElement(core_1.Typography, { variant: "h6" }, "Please Wait"))) : (React.createElement("div", null,
            React.createElement(react_lottie_1.default, { options: defaultOptions, height: 200, width: 200 }),
            React.createElement("div", { style: { width: "50%", margin: "auto" } },
                React.createElement(semantic_ui_react_1.Message, { negative: props.SocketConn.isConn ? false : true },
                    React.createElement(semantic_ui_react_1.Message.Header, null, "We're sorry we can't procced now !!!"),
                    React.createElement(core_1.Typography, null, "Server connection faild, this may be casused by internet connetion loss, make sure you have internet connection and try again")),
                React.createElement(core_1.Button, { variant: "outlined" }, "Retry again")))))) : (React.createElement("div", null, loadingDep ? (React.createElement("div", { style: {
                width: "100%",
                textAlign: "center",
                justifyContent: "center",
            } },
            React.createElement(FacebookProgress, null))) : (React.createElement("div", null,
            React.createElement(Departments_1.default, null)))))))),
        React.createElement("div", { style: { width: "40vw" } },
            React.createElement(DialPad_1.default, null))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        SocketConn: state.SocketConn,
        Config: state.Config,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map