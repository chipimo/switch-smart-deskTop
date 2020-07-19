"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var WorkPeriodList_1 = require("./WorkPeriodList");
var react_router_dom_1 = require("react-router-dom");
var moment = require("moment");
var dataBase_1 = require("../../redux/dataBase");
var backupFunc_1 = require("../../backupFunc");
var useStyles = styles_1.makeStyles({
    root: {
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
});
var isLoaded = false;
exports.index = function (props) {
    var classes = useStyles();
    var _a = React.useState(0), Day = _a[0], setDay = _a[1];
    var _b = React.useState(0), Hours = _b[0], setHours = _b[1];
    var _c = React.useState(0), Minutes = _c[0], setMinutes = _c[1];
    var history = react_router_dom_1.useHistory();
    React.useEffect(function () {
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
            isLoaded = true;
            props.dispatchEvent({
                type: "SETWORKPERIOD",
                data: recivedCallback,
            });
        });
        setInterval(function () {
            if (props.WorkPeriod.isStarted) {
                var now = moment(moment().format());
                var started = moment(props.WorkPeriod.date);
                var diff = now.diff(started);
                var diffDuration = moment.duration(diff);
                setDay(diffDuration.days());
                setHours(diffDuration.hours());
                setMinutes(diffDuration.minutes());
            }
        }, 60 * 1000);
    }, []);
    var HandleEndWorkPeriod = function () {
        var check = moment(new Date());
        var time = check.format("LT");
        var _dateEnded_string = moment().format("LLLL");
        var dateEnded = moment().format("L");
        var initalData = {
            type: "ENDWORKPERIOD",
            _type: "end",
            id: props.WorkPeriod.id,
            dateStarted: props.WorkPeriod.dateStarted,
            dateStartedString: props.WorkPeriod.dateStartedString,
            dateEnded: dateEnded,
            dateEndedString: _dateEnded_string,
            time: props.WorkPeriod.time,
            timeEnded: time,
            ticketsId: props.WorkPeriod.ticketsId,
            userId: props.WorkPeriod.userId,
            note: props.WorkPeriod.note,
            department: props.WorkPeriod.department,
            departmentInfo: props.WorkPeriod.departmentInfo,
            date: props.WorkPeriod.date,
            fileName: props.WorkPeriod.fileName,
            year: props.WorkPeriod.year,
            month: props.WorkPeriod.month,
            week: props.WorkPeriod.week,
            day: props.WorkPeriod.day,
            workedFor: (Day !== 0 ? Day + " days " : "") + " " + (Hours !== 0 ? Hours + " hours " : "") + " " + (Minutes + " minutes"),
        };
        dataBase_1.default.HandleWorkperiods(initalData, function (Callback) {
            props.dispatchEvent(initalData);
            if (Callback.isDone)
                setTimeout(function () {
                    dataBase_1.default.HandleWorkperiods({ _type: "loadList" }, function (recivedCallback) {
                        props.dispatchEvent({
                            type: "SETWORKPERIOD",
                            data: recivedCallback,
                        });
                        setTimeout(function () {
                            backupFunc_1.socketStream(function (BackupCallback) { });
                            alert("Work Period ends. Vist Reports section and create Work Period Reports");
                        }, 200);
                    });
                }, 300);
        });
    };
    return (React.createElement("div", { style: {
            borderColor: props.Theme.theme === "light" ? "#ccc" : "#535353",
            borderWidth: 1,
            borderStyle: "solid",
            width: "98%",
            height: "84vh",
            marginLeft: 10,
            display: "flex",
            padding: 10,
            justifyContent: "space-between",
        } },
        React.createElement("div", { style: {
                width: "76%",
                borderColor: props.Theme.theme === "light" ? "#ccc" : "#535353",
                borderWidth: 1,
                borderStyle: "solid",
            } },
            React.createElement(WorkPeriodList_1.default, null)),
        React.createElement("div", { style: { width: "23%" } },
            React.createElement("div", null),
            React.createElement("div", { style: { width: "100%" } },
                props.WorkPeriod.isStarted ? (React.createElement("div", { style: { marginTop: 20 } },
                    React.createElement(core_1.Typography, { style: { fontSize: 16 } },
                        "Date of work Period: ",
                        props.WorkPeriod.dateStarted),
                    React.createElement(core_1.Typography, { style: { fontSize: 16 } },
                        "Time of work Period: ",
                        props.WorkPeriod.time),
                    React.createElement(core_1.Typography, { style: { fontSize: 16 } },
                        "Total work Time:", (Day !== 0 ? Day + " days " : "") + " " + (Hours !== 0
                        ? Hours === 1
                            ? Hours + " hour "
                            : Hours + " hours "
                        : "") + " " + (Minutes + " minutes")))) : (React.createElement("div", { style: { marginTop: 20 } },
                    React.createElement(core_1.Typography, { style: { fontSize: 16 } }, "Start Work Period to enable POS"))),
                React.createElement("div", { style: { marginTop: 20 } }),
                React.createElement(core_1.Button, { style: { width: "100%", height: 60 }, variant: "contained", color: "primary", disableElevation: true, disabled: props.WorkPeriod.isStarted ? true : false, onClick: function () {
                        history.push("/workperiod/new-file");
                    } },
                    React.createElement(core_1.Typography, { variant: "h6" }, "Start Work Period")),
                React.createElement("div", { style: { height: 10 } }),
                React.createElement(core_1.Button, { style: { width: "100%", height: 60 }, variant: "contained", color: "primary", disableElevation: true, disabled: props.WorkPeriod.isStarted ? false : true, onClick: HandleEndWorkPeriod },
                    React.createElement(core_1.Typography, { variant: "h6" }, "End Work Period"))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        WorkPeriod: state.WorkPeriod,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(exports.index);
//# sourceMappingURL=index.js.map