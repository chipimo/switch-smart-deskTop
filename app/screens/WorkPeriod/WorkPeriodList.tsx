import React = require("react");
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
}));

const WorkPeriodList = (props) => {
  const classes = useStyles();
  const [active, setActive] = React.useState(0);

  const handleSelected = (id) => {
    setActive(id);
  };

  return (
    <div>
      <List
        className={classes.mainList}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Work Period List
          </ListSubheader>
        }
      >
        {props.WorkPeriodList.data.map((items) => (
          <div key={items.id}>
            <ul className={classes.list_root}>
              <div
                className={
                  props.Theme.theme === "light"
                    ? classes.list_light
                    : classes.list_dark
                }
              >
                <li
                  onClick={() => handleSelected(items.id)}
                  style={{
                    padding: 6,
                    backgroundColor:
                      active === items.id
                        ? props.Theme.theme === "light"
                          ? "#F78A09"
                          : "#212121"
                        : "transparent",
                    color: active === items.id ? "#fff" : "#1D1D1D",
                  }}
                >
                  <Typography
                    style={{
                      color:
                        props.Theme.theme === "light"
                          ? active === items.id
                            ? "#fff"
                            : "#1D1D1D"
                          : "#fff",
                    }}
                  >
                    {items.dateStartedString
                      ? `${items.dateStartedString} - ${items.dateEndedString}`
                      : null}
                  </Typography>
                </li>
              </div>
            </ul>
          </div>
        ))}
      </List>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    WorkPeriod: state.WorkPeriod,
    WorkPeriodList: state.WorkPeriodList,
    TicketOut: state.TicketOut,
    Theme: state.Theme,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkPeriodList);
