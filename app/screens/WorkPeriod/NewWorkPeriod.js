"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TextField_1 = require("@material-ui/core/TextField");
var core_1 = require("@material-ui/core");
var Button_1 = require("@material-ui/core/Button");
var react_router_dom_1 = require("react-router-dom");
var moment = require("moment");
var react_redux_1 = require("react-redux");
var dataBase_1 = require("../../redux/dataBase");
var NewWorkPeriod = function (props) {
    var history = react_router_dom_1.useHistory();
    var _a = React.useState(""), note = _a[0], setNote = _a[1];
    var startWorkPeriod = function () {
        // Moment date
        var check = moment(new Date());
        var time = check.format("LT");
        var dateStarted = moment().format("L");
        var _dateStarted_string = moment().format("LLLL");
        var initalData = {
            type: "STARTWORKPERIOD",
            _type: "start",
            dateStarted: dateStarted,
            dateStartedString: _dateStarted_string,
            date: moment().format(),
            time: time,
            timeEnded: "",
            dateEnded: "",
            dateEndedString: "",
            note: note,
            ticketsId: [],
            userId: props.User.userLogged.userName,
            department: props.Dep.dep,
            departmentInfo: props.Dep.departmentInfo,
            workedFor: "",
        };
        dataBase_1.default.HandleWorkperiods(initalData, function (reciveCallback) {
            var year = reciveCallback.data.year;
            var month = reciveCallback.data.month;
            var week = reciveCallback.data.week;
            var day = reciveCallback.data.day;
            var initalRecivedData = {
                type: "STARTWORKPERIOD",
                _type: "start",
                id: reciveCallback.data.id,
                dateStarted: dateStarted,
                dateStartedString: _dateStarted_string,
                date: moment().format(),
                time: time,
                timeEnded: "",
                dateEnded: "",
                dateEndedString: "",
                note: note,
                ticketsId: [],
                userId: props.User.userLogged.userName,
                department: props.Dep.dep,
                departmentInfo: props.Dep.departmentInfo,
                workedFor: "",
                year: year,
                month: month,
                week: week,
                day: day,
            };
            props.dispatchEvent(initalRecivedData);
            setTimeout(function () {
                dataBase_1.default.HandleWorkperiods({ _type: "loadList" }, function (recivedCallback) {
                    if (recivedCallback) {
                        props.dispatchEvent({
                            type: "SETWORKPERIOD",
                            data: recivedCallback,
                        });
                        history.push("/workperiod/list-file");
                        setTimeout(function () {
                            alert("Work Period has Started");
                        }, 100);
                    }
                });
            }, 200);
        });
    };
    return (React.createElement("div", { style: { width: "70%", marginLeft: 20 } },
        React.createElement(core_1.List, { component: "nav", "aria-labelledby": "nested-list-subheader", subheader: React.createElement(core_1.ListSubheader, { component: "div", id: "nested-list-subheader" }, "New Work Period") },
            React.createElement("div", null,
                React.createElement(TextField_1.default, { fullWidth: true, id: "outlined-helperText", label: "Add a note for this work period", helperText: props.WorkPeriod.isStarted
                        ? "Work period already running..."
                        : "add a note here", variant: "outlined", value: note, onChange: function (event) {
                        setNote(event.target.value);
                    } }))),
        React.createElement(Button_1.default, { onClick: startWorkPeriod, disabled: props.WorkPeriod.isStarted, variant: "contained", color: "primary" }, "Start This Work Period"),
        React.createElement(Button_1.default, { onClick: function () {
                history.push("/workperiod/list-file");
            }, style: { marginLeft: 20 }, variant: "contained", color: "secondary" }, "Cancel")));
};
function mapStateToProps(state) {
    return {
        NavTo: state.NavTo,
        WorkPeriod: state.WorkPeriod,
        Dep: state.Dep,
        User: state.User,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NewWorkPeriod);
//# sourceMappingURL=NewWorkPeriod.js.map