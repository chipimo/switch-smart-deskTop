"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var List_1 = require("@material-ui/core/List");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var ListItemAvatar_1 = require("@material-ui/core/ListItemAvatar");
var Avatar_1 = require("@material-ui/core/Avatar");
var Image_1 = require("@material-ui/icons/Image");
var Work_1 = require("@material-ui/icons/Work");
var BeachAccess_1 = require("@material-ui/icons/BeachAccess");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}); });
var EndOfDayRecords = function (props) {
    var classes = useStyles();
    return (React.createElement(List_1.default, { className: classes.root },
        React.createElement(ListItem_1.default, null,
            React.createElement(ListItemAvatar_1.default, null,
                React.createElement(Avatar_1.default, null,
                    React.createElement(Image_1.default, null))),
            React.createElement(ListItemText_1.default, { primary: "Photos", secondary: "Jan 9, 2014" })),
        React.createElement(ListItem_1.default, null,
            React.createElement(ListItemAvatar_1.default, null,
                React.createElement(Avatar_1.default, null,
                    React.createElement(Work_1.default, null))),
            React.createElement(ListItemText_1.default, { primary: "Work", secondary: "Jan 7, 2014" })),
        React.createElement(ListItem_1.default, null,
            React.createElement(ListItemAvatar_1.default, null,
                React.createElement(Avatar_1.default, null,
                    React.createElement(BeachAccess_1.default, null))),
            React.createElement(ListItemText_1.default, { primary: "Vacation", secondary: "July 20, 2014" }))));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(EndOfDayRecords);
//# sourceMappingURL=EndOfDayRecords.js.map