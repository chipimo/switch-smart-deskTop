"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var List_1 = require("@material-ui/core/List");
var ListItem_1 = require("@material-ui/core/ListItem");
var Divider_1 = require("@material-ui/core/Divider");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var Typography_1 = require("@material-ui/core/Typography");
var dataBase_1 = require("../../redux/dataBase");
var core_1 = require("@material-ui/core");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },
}); });
var Dep_Notifications = function (props) {
    var classes = useStyles();
    var _a = React.useState([]), SetList = _a[0], setSetList = _a[1];
    React.useEffect(function () {
        dataBase_1.default.HandleInventoryTransfer(function (callback) {
            console.log(callback.department);
            setSetList(callback.department);
        });
    }, [props]);
    return (React.createElement(core_1.Paper, { style: { height: "70vh" } },
        React.createElement(List_1.default, { dense: true }, SetList.map(function (list, index) {
            if (list.state !== "sent") {
                if (list.isCleared !== 1) {
                    return (React.createElement(ListItem_1.default, { alignItems: "flex-start" },
                        React.createElement(ListItemText_1.default, { primary: list.name, secondary: React.createElement(React.Fragment, null,
                                React.createElement(Typography_1.default, { component: "span", variant: "body2", color: "textPrimary" }, "Stock transfer"), "this stock is sent from " + list.department) }),
                        React.createElement(Divider_1.default, { variant: "inset", component: "li" })));
                }
            }
        }))));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Dep_Notifications);
//# sourceMappingURL=Dep_Notifications.js.map