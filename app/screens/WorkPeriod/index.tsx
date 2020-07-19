import React = require("react");
import { connect } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import WorkPeriodList from "./WorkPeriodList";
import { useHistory, useLocation } from "react-router-dom";
import moment = require("moment");
import appDb from "../../redux/dataBase";
import { socketStream } from "../../backupFunc";

const useStyles = makeStyles({
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

export const index = (props) => {
  const classes = useStyles();

  const [Day, setDay] = React.useState(0);
  const [Hours, setHours] = React.useState(0);
  const [Minutes, setMinutes] = React.useState(0);

  const history = useHistory();

  React.useEffect(() => {
    appDb.HandleWorkperiods({ _type: "loadList" }, (recivedCallback) => {
      if (recivedCallback)
        recivedCallback.map((list) => {
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
        const now = moment(moment().format());
        const started = moment(props.WorkPeriod.date);
  
        const diff = now.diff(started);
        const diffDuration = moment.duration(diff);
  
        setDay(diffDuration.days());
        setHours(diffDuration.hours());
        setMinutes(diffDuration.minutes());
      }
    }, 60 * 1000);
  }, []);

  const HandleEndWorkPeriod = () => {
    var check = moment(new Date());
    var time = check.format("LT");

    var _dateEnded_string = moment().format("LLLL");
    var dateEnded = moment().format("L");

    const initalData = {
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
      workedFor: `${Day !== 0 ? Day + " days " : ""} ${
        Hours !== 0 ? Hours + " hours " : ""
      } ${Minutes + " minutes"}`,
    };

    appDb.HandleWorkperiods(initalData, (Callback) => {
      props.dispatchEvent(initalData);

      if (Callback.isDone)
        setTimeout(() => {
          appDb.HandleWorkperiods({ _type: "loadList" }, (recivedCallback) => {
            props.dispatchEvent({
              type: "SETWORKPERIOD",
              data: recivedCallback,
            });

            setTimeout(() => {
              socketStream((BackupCallback) => {});
              alert(
                "Work Period ends. Vist Reports section and create Work Period Reports"
              );
            }, 200);
          });
        }, 300);
    });
  };

  return (
    <div
      style={{
        borderColor: props.Theme.theme === "light" ? "#ccc" : "#535353",
        borderWidth: 1,
        borderStyle: "solid",
        width: "98%",
        height: "84vh",
        marginLeft: 10,
        display: "flex",
        padding: 10,
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "76%",
          borderColor: props.Theme.theme === "light" ? "#ccc" : "#535353",
          borderWidth: 1,
          borderStyle: "solid",
        }}
      >
        <WorkPeriodList />
      </div>
      <div style={{ width: "23%" }}>
        <div></div>
        <div style={{ width: "100%" }}>
          {props.WorkPeriod.isStarted ? (
            <div style={{ marginTop: 20 }}>
              <Typography style={{ fontSize: 16 }}>
                Date of work Period: {props.WorkPeriod.dateStarted}
              </Typography>
              <Typography style={{ fontSize: 16 }}>
                Time of work Period: {props.WorkPeriod.time}
              </Typography>
              {/* <Typography style={{ fontSize: 16 }}>Total work Time:</Typography> */}
              <Typography style={{ fontSize: 16 }}>
                Total work Time:
                {`${Day !== 0 ? Day + " days " : ""} ${
                  Hours !== 0
                    ? Hours === 1
                      ? Hours + " hour "
                      : Hours + " hours "
                    : ""
                } ${Minutes + " minutes"}`}
              </Typography>
            </div>
          ) : (
            <div style={{ marginTop: 20 }}>
              <Typography style={{ fontSize: 16 }}>
                Start Work Period to enable POS
              </Typography>
            </div>
          )}

          <div style={{ marginTop: 20 }} />
          <Button
            style={{ width: "100%", height: 60 }}
            variant="contained"
            color="primary"
            disableElevation
            disabled={props.WorkPeriod.isStarted ? true : false}
            onClick={() => {
              history.push("/workperiod/new-file");
            }}
          >
            <Typography variant="h6">Start Work Period</Typography>
          </Button>
          <div style={{ height: 10 }} />
          <Button
            style={{ width: "100%", height: 60 }}
            variant="contained"
            color="primary"
            disableElevation
            disabled={props.WorkPeriod.isStarted ? false : true}
            onClick={HandleEndWorkPeriod}
          >
            <Typography variant="h6">End Work Period</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    WorkPeriod: state.WorkPeriod,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
