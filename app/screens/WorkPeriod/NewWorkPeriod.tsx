import React = require("react");
import TextField from "@material-ui/core/TextField";
import { ListSubheader, List } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Route, useHistory, useLocation } from "react-router-dom";
import moment = require("moment");
import { connect } from "react-redux";
import appDb from "../../redux/dataBase";

const NewWorkPeriod = (props) => {
  const history = useHistory();

  const [note, setNote] = React.useState("");

  const startWorkPeriod = () => {
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
      time,
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

    appDb.HandleWorkperiods(initalData, (reciveCallback) => {
      var year = reciveCallback.data.year;
      var month = reciveCallback.data.month;
      var week = reciveCallback.data.week;
      var day = reciveCallback.data.day;

      var initalRecivedData = {
        type: "STARTWORKPERIOD",
        _type: "start",
        id:reciveCallback.data.id,
        dateStarted: dateStarted,
        dateStartedString: _dateStarted_string,
        date: moment().format(),
        time,
        timeEnded: "",
        dateEnded: "",
        dateEndedString: "",
        note: note,
        ticketsId: [],
        userId: props.User.userLogged.userName,
        department: props.Dep.dep,
        departmentInfo: props.Dep.departmentInfo,
        workedFor: "",
        year,
        month,
        week,
        day,
      };
      props.dispatchEvent(initalRecivedData);

      setTimeout(() => {
        appDb.HandleWorkperiods({ _type: "loadList" }, (recivedCallback) => {
          if (recivedCallback) {
            props.dispatchEvent({
              type: "SETWORKPERIOD",
              data: recivedCallback,
            });
            history.push("/workperiod/list-file");
            setTimeout(() => {
              alert("Work Period has Started");
            }, 100);
          }
        });
      }, 200);
    });
  };

  return (
    <div style={{ width: "70%", marginLeft: 20 }}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            New Work Period
          </ListSubheader>
        }
        //   className={classes.root}
      >
        <div>
          <TextField
            fullWidth
            id="outlined-helperText"
            label="Add a note for this work period"
            helperText={
              props.WorkPeriod.isStarted
                ? "Work period already running..."
                : "add a note here"
            }
            variant="outlined"
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
          />
        </div>
      </List>
      <Button
        onClick={startWorkPeriod}
        disabled={props.WorkPeriod.isStarted}
        variant="contained"
        color="primary"
      >
        Start This Work Period
      </Button>
      <Button
        onClick={() => {
          history.push("/workperiod/list-file");
        }}
        style={{ marginLeft: 20 }}
        variant="contained"
        color="secondary"
      >
        Cancel
      </Button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    NavTo: state.NavTo,
    WorkPeriod: state.WorkPeriod,
    Dep: state.Dep,
    User: state.User,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewWorkPeriod);
