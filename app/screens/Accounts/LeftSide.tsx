import React = require("react");
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

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

const AccountsSideList = (props) => {
  const classes = useStyles();
  const [active, setActive] = React.useState(10);

  const handleSelected = (id) => {
    setActive(id);

    switch (id) {
      case 0:
        props.dispatchEvent({
          type: "CHANGEVIEW",
          view: "inventory_list",
          title: "Inventory",
        });

        break;
      case 1:
        props.dispatchEvent({
          type: "CHANGEVIEW",
          view: "end_of_day_records",
          title: "Inventory",
        });
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <ul className={classes.list_root}>
        <div
          className={
            props.Theme.theme === "light"
              ? classes.list_light
              : classes.list_dark
          }
        >
          <li
            onClick={() => handleSelected(0)}
            style={{
              padding: 6,
              backgroundColor:
                active === 0
                  ? props.Theme.theme === "light"
                    ? "#F78A09"
                    : "#212121"
                  : "transparent",
              color: active === 0 ? "#fff" : "#1D1D1D",
            }}
          >
            <Typography
              style={{
                color:
                  props.Theme.theme === "light"
                    ? active === 0
                      ? "#fff"
                      : "#1D1D1D"
                    : "#fff",
              }}
            >
              Account Types
            </Typography>
          </li>
        </div>
        <div
          className={
            props.Theme.theme === "light"
              ? classes.list_light
              : classes.list_dark
          }
        >
          <li
            onClick={() => handleSelected(1)}
            style={{
              padding: 6,
              backgroundColor:
                active === 1
                  ? props.Theme.theme === "light"
                    ? "#F78A09"
                    : "#212121"
                  : "transparent",
              color: active === 1 ? "#fff" : "#1D1D1D",
            }}
          >
            <Typography
              style={{
                color:
                  props.Theme.theme === "light"
                    ? active === 1
                      ? "#fff"
                      : "#1D1D1D"
                    : "#fff",
              }}
            >
              Accounts
            </Typography>
          </li>
        </div>
        <div
          className={
            props.Theme.theme === "light"
              ? classes.list_light
              : classes.list_dark
          }
        >
          <li
            onClick={() => handleSelected(2)}
            style={{
              padding: 6,
              backgroundColor:
                active === 2
                  ? props.Theme.theme === "light"
                    ? "#F78A09"
                    : "#212121"
                  : "transparent",
              color: active === 2 ? "#fff" : "#1D1D1D",
            }}
          >
            <Typography
              style={{
                color:
                  props.Theme.theme === "light"
                    ? active === 2
                      ? "#fff"
                      : "#1D1D1D"
                    : "#fff",
              }}
            >
              Account Screens
            </Typography>
          </li>
        </div>
        <div
          className={
            props.Theme.theme === "light"
              ? classes.list_light
              : classes.list_dark
          }
        >
          <li
            onClick={() => handleSelected(3)}
            style={{
              padding: 6,
              backgroundColor:
                active === 3
                  ? props.Theme.theme === "light"
                    ? "#F78A09"
                    : "#212121"
                  : "transparent",
              color: active === 3 ? "#fff" : "#1D1D1D",
            }}
          >
            <Typography
              style={{
                color:
                  props.Theme.theme === "light"
                    ? active === 3
                      ? "#fff"
                      : "#1D1D1D"
                    : "#fff",
              }}
            >
              Transaction Types
            </Typography>
          </li>
        </div>
        <div
          className={
            props.Theme.theme === "light"
              ? classes.list_light
              : classes.list_dark
          }
        >
          <li
            onClick={() => handleSelected(4)}
            style={{
              padding: 6,
              backgroundColor:
                active === 4
                  ? props.Theme.theme === "light"
                    ? "#F78A09"
                    : "#212121"
                  : "transparent",
              color: active === 4 ? "#fff" : "#1D1D1D",
            }}
          >
            <Typography
              style={{
                color:
                  props.Theme.theme === "light"
                    ? active === 4
                      ? "#fff"
                      : "#1D1D1D"
                    : "#fff",
              }}
            >
              Transactions
            </Typography>
          </li>
        </div>
      </ul>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsSideList);
