"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    inline: {
        display: "inline",
    },
    list_root: {
        width: "100%",
        listStyle: "none",
        padding: 0,
        margin: 0,
        marginTop: 2,
    },
    list_light: {
        width: "100%",
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "#E3E3E3",
        },
    },
    list_dark: {
        width: "100%",
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "#6B6B6B",
        },
    },
    list_light2: {
        width: "100%",
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "#E3E3E3",
        },
    },
    list_dark2: {
        width: "100%",
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "#6B6B6B",
        },
    },
    mainList: {
        height: "70vh",
        width: "100%",
        overflow: "auto",
    },
}); });
var SideList = function (props) {
    var classes = useStyles();
    var _a = React.useState(10), active = _a[0], setActive = _a[1];
    var handleSelected = function (id) {
        setActive(id);
        switch (id) {
            case 0:
                props.dispatchEvent({
                    type: "CHANGEVIEW",
                    view: "inventory_list",
                    title: "Inventory",
                });
                break;
            case 1:
                props.dispatchEvent({
                    type: "CHANGEVIEW",
                    view: "inventory_reduction",
                    title: "Inventory",
                });
                break;
            default:
                break;
        }
    };
    return (React.createElement("div", null,
        React.createElement("ul", { className: classes.list_root },
            React.createElement("div", { className: props.Theme.theme === "light"
                    ? classes.list_light
                    : classes.list_dark },
                React.createElement("li", { onClick: function () { return handleSelected(0); }, style: {
                        padding: 6,
                        backgroundColor: active === 0
                            ? props.Theme.theme === "light"
                                ? "#F78A09"
                                : "#212121"
                            : "transparent",
                        color: active === 0 ? "#fff" : "#1D1D1D",
                    } },
                    React.createElement(core_1.Typography, { style: {
                            color: props.Theme.theme === "light"
                                ? active === 0
                                    ? "#fff"
                                    : "#1D1D1D"
                                : "#fff",
                        } }, "Inventory List"))),
            React.createElement("div", { className: props.Theme.theme === "light"
                    ? classes.list_light2
                    : classes.list_dark2 },
                React.createElement("li", { onClick: function () { return handleSelected(1); }, style: {
                        padding: 6,
                        backgroundColor: active === 1
                            ? props.Theme.theme === "light"
                                ? "#F78A09"
                                : "#212121"
                            : "transparent",
                        color: active === 1 ? "#fff" : "#1D1D1D",
                    } },
                    React.createElement(core_1.Typography, { style: {
                            color: props.Theme.theme === "light"
                                ? active === 1
                                    ? "#fff"
                                    : "#1D1D1D"
                                : "#fff",
                        } }, "Inventory Reduction"))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SideList);
//# sourceMappingURL=InvSideView.js.map