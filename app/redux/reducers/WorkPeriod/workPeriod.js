"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var uuidv4 = require("uuid/v1");
var check = moment(new Date());
var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
var month = check.format("MMMM"); // => ('January','February.....)
var year = check.format("YYYY");
function CreateId() {
    return uuidv4();
}
exports.CheckWorkPeriod = function (dbhook, callback) { };
var weekOfMonth = function (date) {
    var weekInYearInedx = date.week();
    if (date.year() != date.weekYear()) {
        weekInYearInedx = date.clone().subtract(1, "week").week() + 1;
    }
    var weekIndex = weekInYearInedx - moment(date).startOf("month").week() + 1;
    return weekIndex;
};
exports.StartWorkPeriod = function (props, dbhook, callback) {
    var week = "week_" + weekOfMonth(moment(new Date()));
    var tempId = CreateId();
    dbhook("work_period")
        .insert({
        id: tempId,
        year: year,
        month: month,
        day: day,
        week: week,
        dateStarted: props.dateStarted,
        dateStartedString: props.dateStartedString,
        dateEnded: "",
        dateEndedString: "",
        time: props.time,
        timeEnded: "",
        date: props.date,
        note: props.note,
        department: props.department,
        workedFor: "",
        ticket_count: 0,
        sales_total: 0,
        isOpen: true,
    })
        .then(function () {
        dbhook
            .select()
            .from("work_period")
            .where({ id: tempId })
            .then(function (data) {
            callback({ isDone: true, data: data });
        });
    });
};
exports.EndWorkPeriod = function (props, dbhook, sendCallback) {
    dbhook("work_period")
        .where("id", props.id)
        .update({
        dateEnded: props.dateEnded,
        dateEndedString: props.dateEndedString,
        timeEnded: props.timeEnded,
        workedFor: props.workedFor,
        isOpen: false,
    })
        .then(function () {
        dbhook
            .select()
            .from("work_period")
            .then(function (data) {
            sendCallback({ isDone: true, data: data });
        });
    });
};
exports.WorkPeriodList = function (dbhook, sendCallback) {
    dbhook
        .select()
        .from("work_period")
        .then(function (data) {
        sendCallback(data.reverse());
    });
};
exports.UpdateWorkPeriodTime = function (props, dbhook, sendCallback) {
    console.log(props);
    // dbhook("work_period")
    // .update({})
    //   .then(function (data) {
    //     sendCallback(data.reverse());
    //   });
};
//# sourceMappingURL=workPeriod.js.map