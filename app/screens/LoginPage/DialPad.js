"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var semantic_ui_react_1 = require("semantic-ui-react");
var IconButton_1 = require("@material-ui/core/IconButton");
var OutlinedInput_1 = require("@material-ui/core/OutlinedInput");
var InputAdornment_1 = require("@material-ui/core/InputAdornment");
var Visibility_1 = require("@material-ui/icons/Visibility");
var VisibilityOff_1 = require("@material-ui/icons/VisibilityOff");
var InputLabel_1 = require("@material-ui/core/InputLabel");
var FormControl_1 = require("@material-ui/core/FormControl");
var styles_1 = require("@material-ui/core/styles");
var dataBase_1 = require("../../redux/dataBase");
var react_router_dom_1 = require("react-router-dom");
var electron = require("electron");
var remote = electron.remote;
var win = remote.getCurrentWindow();
var useStyles = styles_1.makeStyles(function (theme) { return ({
    textField: {
        width: "100%",
    },
}); });
var DialPad = function (props) {
    var history = react_router_dom_1.useHistory();
    var classes = useStyles();
    var _a = React.useState(""), pin = _a[0], setPin = _a[1];
    var _b = React.useState(false), showPassword = _b[0], setshowPassword = _b[1];
    var inputRef = React.useRef();
    React.useEffect(function () {
        document.addEventListener("keydown", handleKeyDown, false);
        return function () {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    }, []);
    var handleKeyDown = function (event) {
        // console.log(event.key);
        inputRef.current.focus();
        if (event.key === "Enter") {
            handleSubmit();
        }
        else if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].findIndex(function (x) { return x === event.key; }) !== -1) {
            pin = pin + event.key;
            setPin(pin);
        }
        else if (event.key === "Backspace") {
            pin = pin.slice(0, -1);
            setPin(pin);
        }
        else if (event.key === "Delete") {
            pin = "";
            setPin(pin);
        }
    };
    var handleClick = function (value) {
        pin = pin + value;
        setPin(pin);
    };
    // const clear = () => {
    //   pin = "";
    //   setPin(pin);
    // };
    var handleSubmit = function () {
        dataBase_1.default.HandleLogIn({ pin: pin }, function (reciveCallback) {
            if (reciveCallback.isLoggedIn) {
                props.dispatchEvent({
                    type: "LOGIN",
                    userLogged: reciveCallback.config[0],
                });
                setTimeout(function () {
                    history.push("/home");
                }, 400);
            }
            else {
                props.dispatchEvent({
                    type: "SHOW_NETIVE_NOTIFICATION",
                    payload: {
                        type: "error",
                        title: "Invalid Pin",
                        message: "User not found or Account does not exist. Please contact the Adminstrtor",
                        state: "msgBox",
                        detail: "",
                        data: {},
                    },
                });
                props.dispatchEvent({
                    type: "DISMISS_NETIVE_NOTIFY",
                });
            }
        });
    };
    var handleChange = function (event) {
        // console.log(event);
        setPin(event.target.value);
    };
    var handleClickShowPassword = function () {
        setshowPassword(!showPassword);
    };
    var handleMouseDownPassword = function (event) {
        event.preventDefault();
    };
    return (React.createElement("div", { style: { width: "30vw", marginTop: 25 } },
        React.createElement("div", null,
            React.createElement(FormControl_1.default, { className: classes.textField, variant: "outlined" },
                React.createElement(InputLabel_1.default, { htmlFor: "outlined-adornment-password" }, "Password"),
                React.createElement(OutlinedInput_1.default, { autoFocus: true, inputRef: inputRef, id: "outlined-adornment-password", type: showPassword ? "text" : "password", value: pin, disabled: props.Config.isSet ? false : true, fullWidth: true, label: "ENTER PIN", color: props.Theme.theme === "light" ? "primary" : "secondary", 
                    // onChange={handleChange}
                    endAdornment: React.createElement(InputAdornment_1.default, { position: "end" },
                        React.createElement(IconButton_1.default, { "aria-label": "toggle password visibility", onClick: handleClickShowPassword, onMouseDown: handleMouseDownPassword, edge: "end" }, showPassword ? React.createElement(Visibility_1.default, null) : React.createElement(VisibilityOff_1.default, null))), labelWidth: 70 }))),
        React.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                marginTop: 6,
            } },
            React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("1"); }, style: {
                    width: "12vw",
                    backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                    height: "12vh",
                    borderRadius: 0,
                }, variant: "outlined" },
                React.createElement(core_1.Typography, { variant: "h5" }, "1")),
            React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("2"); }, style: {
                    width: "12vw",
                    backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                    height: "12vh",
                    borderRadius: 0,
                }, variant: "outlined" },
                React.createElement(core_1.Typography, { variant: "h5" }, "2")),
            React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("3"); }, style: {
                    width: "12vw",
                    backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                    height: "12vh",
                    borderRadius: 0,
                }, variant: "outlined" },
                React.createElement(core_1.Typography, { variant: "h5" }, "3"))),
        React.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                marginTop: 6,
            } },
            React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("4"); }, style: {
                    width: "12vw",
                    backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                    height: "12vh",
                    borderRadius: 0,
                }, variant: "outlined" },
                React.createElement(core_1.Typography, { variant: "h5" }, "4")),
            React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("5"); }, style: {
                    width: "12vw",
                    backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                    height: "12vh",
                    borderRadius: 0,
                }, variant: "outlined" },
                React.createElement(core_1.Typography, { variant: "h5" }, "5")),
            React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("6"); }, style: {
                    width: "12vw",
                    backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                    height: "12vh",
                    borderRadius: 0,
                }, variant: "outlined" },
                React.createElement(core_1.Typography, { variant: "h5" }, "6"))),
        React.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                marginTop: 6,
            } },
            React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("7"); }, style: {
                    width: "12vw",
                    backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                    height: "12vh",
                    borderRadius: 0,
                }, variant: "outlined" },
                React.createElement(core_1.Typography, { variant: "h5" }, "7")),
            React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("8"); }, style: {
                    width: "12vw",
                    backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                    height: "12vh",
                    borderRadius: 0,
                }, variant: "outlined" },
                React.createElement(core_1.Typography, { variant: "h5" }, "8")),
            React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("9"); }, style: {
                    width: "12vw",
                    backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                    height: "12vh",
                    borderRadius: 0,
                }, variant: "outlined" },
                React.createElement(core_1.Typography, { variant: "h5" }, "9"))),
        React.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                marginTop: 6,
            } },
            React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function () {
                    handleKeyDown({ key: "Delete" });
                    // clear();
                }, style: {
                    width: "12vw",
                    backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                    height: "12vh",
                    borderRadius: 0,
                }, variant: "outlined" },
                React.createElement(core_1.Typography, { variant: "h5" }, "X")),
            React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("0"); }, style: {
                    width: "12vw",
                    backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                    height: "12vh",
                    borderRadius: 0,
                }, variant: "outlined" },
                React.createElement(core_1.Typography, { variant: "h5" }, "0")),
            React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function () { return handleSubmit(); }, style: {
                    width: "12vw",
                    backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                    height: "12vh",
                    borderRadius: 0,
                }, variant: "outlined" },
                React.createElement(core_1.Typography, { variant: "h5" }, ">"))),
        React.createElement("div", { style: {
                width: "100%",
                marginTop: 10,
                textAlign: "center",
                justifyContent: "center",
            } },
            React.createElement("div", { style: { marginTop: 6 } },
                React.createElement(core_1.Button, { onClick: function () { return win.close(); }, disabled: props.Config.isSet ? false : true, style: {
                        width: "10vw",
                        backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                        height: "12vh",
                        borderRadius: 0,
                    }, variant: "outlined" },
                    React.createElement(core_1.Typography, { variant: "h5" },
                        React.createElement(semantic_ui_react_1.Icon, { name: "power off" })))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        Config: state.Config,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DialPad);
//# sourceMappingURL=DialPad.js.map