import React = require("react");
import { Paper, Typography, Button, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import AppBar from "@material-ui/core/AppBar";
import { Clock } from "grommet";
// import { Button } from "@blueprintjs/core";
import { Route, useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import SelectionPan from "./screens/SelectionPan";
import LoginPage from "./screens/LoginPage";
import WorkPeriod from "./screens/WorkPeriod";
import Pos from "./screens/Pos";
import Tickets from "./screens/Tickets";
import Accouts from "./screens/Accounts";
import AccountDetails from "./screens/Accounts/AccountDetails";
import Warehouses from "./screens/Warehouses";
import DepartmentView from "./screens/Departments/DepartmentView";
import Reports from "./screens/Reports";
import Settings from "./screens/Settings";
import NewWorkPeriod from "./screens/WorkPeriod/NewWorkPeriod";
import Notifications from "./screens/Notifications";
import appDb from "./redux/dataBase";
import Drawer from "@material-ui/core/Drawer";
import Dep_Notifications from "./screens/Departments/Dep_Notifications";
import Backup from "./redux/dataBase/updater";
import { ToastContainer, toast } from "react-toastify";   

import { remote } from "electron";
const electron = require("electron");
const mainWindow = remote.getCurrentWindow();

const socketIOClient = require("socket.io-client");
const moment = require("moment");    
// const socketUrl = "http://localhost:3200";
const socketUrl = "https://switch-smart.herokuapp.com/";

// Moment valz
var date = new Date();
var check = moment(date);  
var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
var month = check.format("MMMM"); // => ('January','February ----)
var year = check.format("YYYY");


// Theme layout
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

// Tool tip
const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const Accapp = (props) => {
  const [conn, setConn] = React.useState({ Connected: false });
  const [iSConnecting, setiSConnecting] = React.useState(true);
  const [LoadingBackUp, setLoadingBackUp] = React.useState(false);
  const [Drawerstate, setDrawerState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    bottom2: false,
    right: false,
  });

  const history = useHistory();

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...Drawerstate, [side]: open });
  };

  React.useEffect(() => {
    mainWindow.maximize();

    setTimeout(() => {
      initiSocket();
    }, 3000);

    appDb.HandleTheme({ _type: "getTheme" }, (callback) => {
      props.dispatchEvent({ type: "Theme", theme: 'light' });
    });

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

      props.dispatchEvent({
        type: "SETWORKPERIOD",
        data: recivedCallback,
      });
    });
  }, []);

  const initiSocket = () => {
    appDb.CheckConfig();
    setConn({ ...conn, Connected: false });

    const socket = socketIOClient(socketUrl);
    socket.on("connect", () => {
      setConn({ ...conn, Connected: true });
      props.dispatchEvent({ type: "CONNECTED", socket: socket });
      Backup.isOnline();
    });

    // socket.emit("GETSALESTICKETS", (callback) => {
    //   // console.log(callback);
    // });

    socket.on("SALESREPORTLIST", (callback) => {
      // console.log(callback);
    });
    
    socket.on("disconnect", () => {
      props.dispatchEvent({ type: "CONNCETIONFAILED" });
    });

    socket.on("BACKUPFILES", (data) => {
      setLoadingBackUp(false);
      // console.log(data);
      appDb.HandelProducts({ _type: "backUp", data }, (callback) => {});
    });

    socket.on("TRANSFER_NOTIFICATION", (data) => {
      // console.log(data);
      var datalist = {
        _type: "tranfer",
        value: data.value,
        selected: data.selected,
        state: "recived",
        isCleared: true,
        data: data,
      };

      appDb.HandelProducts(datalist, (callback) => {
        toast(
          `You Have Recived Product(s) ${data.selected.ItemName} ${data.value}`,
          {
            position: "top-right",
            autoClose: 5000,
            type: "success",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
    });

    socket.on("DELIVERY_NOTIFICATION", (data) => {
      var datalist = {
        _type: "tranfer",
        value: data.value,
        selected: data.selected,
        state: "delivery",
        isCleared: true,
        data: data,
      };

      appDb.HandelProducts(datalist, (callback) => {
        toast(
          `Product(s) ${callback.name} (${data.value}) have been successfuly delivered to ${data.to} `,
          {
            position: "top-right",
            autoClose: 5000,
            type: "success",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
    });

    socket.on("DEP_LOGGEDIN", (callback) => {
      // if (props.Dep.dep !== callback.name) {
      //   console.log(props.Dep.dep);
      // }

      props.dispatchEvent({
        type: "UserLoggedIn",
        users: callback.users,
      });
    });

    setTimeout(() => {
      setiSConnecting(false);
    }, 300);
  };

  return (
    <ThemeProvider
      theme={props.Theme.theme === "light" ? lightTheme : darkTheme}
    >
      <ToastContainer />
      <Notifications />
      <Paper
        square
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden !important",
        }}
      >
        {/* Top tool bar */}
        <AppBar elevation={1} position="static" color="default">
          <div
            style={{
              width: "100vw",
              paddingLeft: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", marginTop: 10 }}>
              <div>
                <img
                  style={{ width: 30, marginTop: -2, marginRight: 10 }}
                  src={"./assets/icons/logo.png"}
                />
              </div>
              <div>
                <Typography
                  variant="h6"
                  style={{ color: "#AAAAAA", marginTop: -5 }}
                  color="inherit"
                >
                  Switch Smart
                </Typography>
              </div>
            </div>

            <div style={{ marginRight: 26, display: "flex" }}>
              <div style={{ display: "flex", color: "#888080" }}>
                <div style={{ marginTop: 5, marginRight: 10 }}>
                  <Typography variant="h6">{day},</Typography>
                </div>
                <div style={{ marginTop: 5, marginRight: 10 }}>
                  <Typography variant="h6">
                    {month} {date.getDate()},
                  </Typography>
                </div>
                <div style={{ marginTop: 5, marginRight: 10 }}>
                  <Typography variant="h6">{year}</Typography>
                </div>
                <div style={{ marginTop: 9, marginRight: 20 }}>
                  <Typography variant="h6">
                    <Clock style={{ color: "#888080" }} type="digital" />
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </AppBar>

        {/* Main View */}
        <Paper
          style={{
            width: "100vw",
            height: "90.5vh", 
          }}
        >
          <Route path="/" exact component={LoginPage} />
          <Route path="/home" component={SelectionPan} />
          <Route path="/workperiod/list-file" component={WorkPeriod} />
          <Route path="/workperiod/new-file" component={NewWorkPeriod} />
          <Route path="/pos" component={Pos} />
          <Route path="/tickets" component={Tickets} />
          <Route path="/accounts" component={Accouts} />
          <Route path="/accounts_details" component={AccountDetails} />
          <Route path="/warehouses" component={Warehouses} />
          <Route path="/departments" component={DepartmentView} />
          <Route path="/reports" component={Reports} />
          <Route path="/settings" component={Settings} />
        </Paper>
        {/* Footer */}

        {/* <div>
          <Paper
            elevation={4}
            style={{
              width: 220,
              height: 200,
              position: "absolute",
              bottom: 10,
              right: 5,
              backgroundColor: "red",
              transition: "transform 400ms ease-in",
              transform: checked ? "translateY(0)" : "translateY(220px)",
            }}
          >
            dddd
          </Paper>
        </div> */}
        <AppBar
          style={{
            borderStyle: "solid",
            height: 50,
            borderWidth: 1,
            zIndex: 20000,
            overflow: "hidden",
            borderColor: "transparent",
            borderTopColor:
              props.Theme.theme === "light" ? "#C6C6C6" : "transparent",
          }}
          position="static"
          color="default"
        >
          <div
            style={{
              marginTop: 5,
              marginRight: 15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginLeft: 20, display: "flex" }}>
              {iSConnecting ? (
                <div style={{ marginTop: 2, display: "flex" }}>
                  <Icon name="refresh" loading />
                  <Typography style={{ marginTop: -4 }}>
                    Connecting...
                  </Typography>
                </div>
              ) : (
                <div>
                  {props.SocketConn.isConn ? (
                    <div style={{ marginTop: 5, display: "flex" }}>
                      <Icon name="server" color="green" />
                      <Typography style={{ marginTop: -1 }}>
                        Connected*
                      </Typography>
                    </div>
                  ) : (
                    <div style={{ marginTop: 5, display: "flex" }}>
                      <Icon name="server" />
                      <Typography style={{ marginTop: -1 }}>
                        Connection Failed
                      </Typography>
                    </div>
                  )}
                </div>
              )}

              {props.Dep.dep ? (
                <div style={{ display: "flex", marginLeft: 10, marginTop: 5 }}>
                  <Icon name="building" />
                  <Typography>{props.Dep.dep}</Typography>
                  <div style={{ marginLeft: 10 }} />
                </div>
              ) : null}

              {/* {props.User.isLoggedIn &&
              props.User.userLogged.prevarges === "1" ? (
                <div>
                  <Button
                    onClick={() => {
                      if (props.SocketConn.isConn) {
                        props.SocketConn.socket.emit("GETBACKUP", {
                          dep: props.Dep.dep,
                          _type: "getPOSList",
                          layoutType: "all_P",
                        });
                        setLoadingBackUp(true);
                      }
                    }}
                    disabled={LoadingBackUp}
                    style={{ marginTop: 1 }}
                    startIcon={<SyncIcon />}
                  >
                    Restore BackUp
                  </Button>
                  {LoadingBackUp ? (
                    <div style={{ display: "flex" }}>
                      <Icon loading name="sync" />
                      <Typography
                        style={{ marginLeft: 3, marginTop: 1 }}
                        variant="caption"
                      >
                        Loading BackUp from server...
                      </Typography>
                    </div>
                  ) : null}
                </div>
              ) : null} */}
            </div>

            <div style={{ display: "flex" }}>
              {props.User.isLoggedIn ? (
                <div style={{ display: "flex" }}>
                  <div style={{ marginTop: 3, marginRight: 10 }}>
                    <Typography>{props.User.userLogged.userName}</Typography>
                  </div>
                  <div style={{ marginTop: -15 }}>
                    {/* <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Notifications</Typography>
                        </React.Fragment>
                      }
                    >
                      <IconButton
                        onClick={toggleDrawer("bottom", true)}
                        style={{ height: 40, width: 40, marginTop: -3 }}
                      >
                        <Icon style={{ marginTop: -5 }} name="bell outline" />
                      </IconButton>
                    </HtmlTooltip> */}

                    {/* Drawer notify */}
                    <Drawer
                      anchor="bottom"
                      open={Drawerstate.bottom}
                      onClose={toggleDrawer("bottom", false)}
                    >
                      <Dep_Notifications />
                    </Drawer>
                  </div>
                  {/* Menu Button */}
                  <div style={{ marginRight: 10, marginTop: -1 }}>
                    <Button
                      onClick={() => {
                        history.push("/home");
                      }}
                    >
                      <Typography>Main Menu</Typography>
                    </Button>
                  </div>
                </div>
              ) : null}

              {/* To remove ONLY FOR DEVELOPMENT */}
              <Button
                onClick={() => {
                  history.push("/home");
                }}
              >
                <Typography>Main Menu</Typography>
              </Button>

              <div>
                <div style={{ display: "flex" }}>
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit">
                          Change Theme Color
                        </Typography>
                        {`default theme:${props.Theme.theme}`}
                      </React.Fragment>
                    }
                  >
                    <IconButton
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor:
                          props.Theme.theme === "light" ? "#212121" : "#ccc",
                      }}
                      onClick={() => {
                        props.dispatchEvent({
                          type: "setTheme",
                          setTheme:
                            props.Theme.theme === "light" ? "dark" : "light",
                        });
                      }}
                    />
                  </HtmlTooltip>
                </div>
              </div>
            </div>
          </div>
        </AppBar>
      </Paper>
    </ThemeProvider>
  );
};

function mapStateToProps(state) {
  return {
    NetiveNotify: state.NetiveNotify,
    Theme: state.Theme,
    SocketConn: state.SocketConn,
    User: state.User,
    Dep: state.Dep,
    WorkPeriod: state.WorkPeriod,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accapp);
