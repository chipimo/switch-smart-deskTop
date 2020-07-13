import React = require("react");
import { connect } from "react-redux";
import { Paper, Typography, Divider, Button } from "@material-ui/core";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import DialPad from "./DialPad";
import appDb from "../../redux/dataBase";
import Lottie from "react-lottie";
import { Message, Loader } from "semantic-ui-react";
import * as animationData from "../../assets/lottie/505-error.json";
import Departments from "../Departments";
import CircularProgress from "@material-ui/core/CircularProgress";

// Inspired by the Facebook spinners.
const useStylesFacebook = makeStyles({
  root: {
    position: "relative",
  },
  top: {
    color: "#eef3fd",
  },
  bottom: {
    color: "#6798e5",
    animationDuration: "550ms",
    marginTop: 20,
  },
});

// ispiered by facebook
function FacebookProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={24}
        thickness={4}
        {...props}
      />
    </div>
  );
}

const index = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [loadingDep, setLoadingDep] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      appDb.CheckConfig();
    }, 200);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    setTimeout(() => {
      setLoadingDep(false);
    }, 4500);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Paper
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor:
          props.Theme.theme === "light" ? "#E5E5E5" : "transparent",
      }}
    >
      <div
        style={{
          width: "60vw",
          textAlign: "center",
          justifyContent: "center",
          marginTop: 190,
        }}
      >
        {props.Config.isSet ? (
          <div style={{ marginTop: 50 }}>
            <Typography variant="h3">Switch Smart POS</Typography>
            <Typography variant="caption" style={{ fontSize: 16 }}>
              Switch to a smart world
            </Typography>
            <div
              style={{
                width: "30%",
                margin: "auto",
                marginBottom: 20,
                marginTop: 5,
              }}
            >
              <Divider />
            </div>
            <Typography variant="caption" style={{ fontSize: 12 }}>
              Powered by Software Gaints.
            </Typography>
            <div />
            <Typography variant="caption" style={{ fontSize: 12 }}>
              {" "}
              {"Copyright © "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </div>
        ) : (
            <div style={{ marginTop: -120 }}>
              {!props.SocketConn.isConn ? (
                <div>
                  {loading ? (
                    <div style={{ marginTop: 30 }}>
                      <Typography variant="h6">Please Wait</Typography>
                    </div>
                  ) : (
                      <div>
                        <Lottie options={defaultOptions} height={200} width={200} />
                        <div style={{ width: "50%", margin: "auto" }}>
                          <Message
                            negative={props.SocketConn.isConn ? false : true}
                          >
                            <Message.Header>
                              We're sorry we can't procced now !!!
                        </Message.Header>

                            <Typography>
                              Server connection faild, this may be casused by
                              internet connetion loss, make sure you have internet
                              connection and try again
                        </Typography>
                          </Message>

                          <Button variant="outlined">Retry again</Button>
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                  <div>
                    {loadingDep ? (
                      <div
                        style={{
                          width: "100%",
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FacebookProgress />
                      </div>
                    ) : (
                        <div>
                          <Departments />
                        </div>
                      )}
                  </div>
                )}
            </div>
          )}
      </div>
      <div style={{ width: "40vw" }}>
        <DialPad />
      </div>
    </Paper>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    SocketConn: state.SocketConn,
    Config: state.Config,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
