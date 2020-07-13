const moment = require("moment");

const uuidv4 = require("uuid/v1");

var check = moment(new Date());
var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
var month = check.format("MMMM"); // => ('January','February.....)
var year = check.format("YYYY");

function CreateId() {
  return uuidv4();
}

export const CheckWorkPeriod = (dbhook, callback) => {};

const weekOfMonth = (date) => {
  let weekInYearInedx = date.week();
  if (date.year() != date.weekYear()) {
    weekInYearInedx = date.clone().subtract(1, "week").week() + 1;
  }
  const weekIndex = weekInYearInedx - moment(date).startOf("month").week() + 1;
  return weekIndex;
};

export const StartWorkPeriod = (props, dbhook, callback) => {
  var week = `week_` + weekOfMonth(moment(new Date()));
  var tempId = CreateId();
  dbhook("work_period")
    .insert({
      id: tempId,
      year,
      month, 
      day,
      week,
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
          callback({ isDone: true, data });
        });
    });
};

export const EndWorkPeriod = (props, dbhook, sendCallback) => {
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
          sendCallback({ isDone: true, data });
        });
    });
};

export const WorkPeriodList = (dbhook, sendCallback) => {
  dbhook
    .select()
    .from("work_period")
    .then(function (data) {
      sendCallback(data.reverse());
    });
};
