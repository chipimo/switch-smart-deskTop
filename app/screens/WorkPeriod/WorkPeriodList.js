"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ListSubheader_1 = require("@material-ui/core/ListSubheader");
var List_1 = require("@material-ui/core/List");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
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
    mainList: {
        height: "70vh",
        width: "100%",
        overflow: "auto",
    },
}); });
var WorkPeriodList = function (props) {
    var classes = useStyles();
    var _a = React.useState(0), active = _a[0], setActive = _a[1];
    var handleSelected = function (id) {
        setActive(id);
    };
    return (React.createElement("div", null,
        React.createElement(List_1.default, { className: classes.mainList, component: "nav", "aria-labelledby": "nested-list-subheader", subheader: React.createElement(ListSubheader_1.default, { component: "div", id: "nested-list-subheader" }, "Work Period List") }, props.WorkPeriodList.data.map(function (items) { return (React.createElement("div", { key: items.id },
            React.createElement("ul", { className: classes.list_root },
                React.createElement("div", { className: props.Theme.theme === "light"
                        ? classes.list_light
                        : classes.list_dark },
                    React.createElement("li", { onClick: function () { return handleSelected(items.id); }, style: {
                            padding: 6,
                            backgroundColor: active === items.id
                                ? props.Theme.theme === "light"
                                    ? "#F78A09"
                                    : "#212121"
                                : "transparent",
                            color: active === items.id ? "#fff" : "#1D1D1D",
                        } },
                        React.createElement(core_1.Typography, { style: {
                                color: props.Theme.theme === "light"
                                    ? active === items.id
                                        ? "#fff"
                                        : "#1D1D1D"
                                    : "#fff",
                            } }, items.dateStartedString
                            ? items.dateStartedString + " - " + items.dateEndedString
                            : null)))))); }))));
};
function mapStateToProps(state) {
    return {
        WorkPeriod: state.WorkPeriod,
        WorkPeriodList: state.WorkPeriodList,
        TicketOut: state.TicketOut,
        Theme: state.Theme,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(WorkPeriodList);
//# sourceMappingURL=WorkPeriodList.js.map