import React = require("react");
import { connect } from "react-redux";
import { Paper, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useLocation, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const index = (props) => {
  const classes = useStyles();
  const [tab1, setTab1] = React.useState(false);
  const [tab2, setTab2] = React.useState(false);
  const [tab3, setTab3] = React.useState(false);
  const [tab4, setTab4] = React.useState(false);
  const [tab5, setTab5] = React.useState(false);
  const [tab6, setTab6] = React.useState(false);
  const [tab7, setTab7] = React.useState(false);
  const [tab8, setTab8] = React.useState(false);
  const [tab9, setTab9] = React.useState(false);

  // const [LoadingBackUp, setLoadingBackUp] = React.useState(false);

  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        paddingTop: 25,
        paddingLeft: 20,
        paddingRight: 20,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex" }}>
        <Paper
          square
          onClick={() => {
            history.push("/workperiod/list-file");
          }}
          onMouseEnter={() => {
            setTab1(true);
          }}
          onMouseLeave={() => {
            setTab1(false);
          }}
          elevation={tab1 ? 20 : 2}
          style={{
            backgroundColor:
              props.Theme.theme === "light" ? "#00AEDB" : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 20,
          }}
        >
          <img
            src={"./assets/icons/timetable.png"}
            style={{ width: 60, height: 60, margin: "auto" }}
          />
          <Typography style={{ color: "#fff", marginTop: 13 }} variant="h4">
            Work Periods
          </Typography>
        </Paper>
        <Paper
          square
          onClick={() => {
            props.WorkPeriod.isStarted ? history.push("/pos") : handleOpen();
          }}
          onMouseEnter={() => {
            setTab2(true);
          }}
          onMouseLeave={() => {
            setTab2(false);
          }}
          elevation={tab2 ? 20 : 2}
          style={{
            backgroundColor:
              props.Theme.theme === "light" ? "#00AEDB" : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 20,
            marginLeft: 15,
          }}
        >
          <img
            src={
              props.WorkPeriod.isStarted
                ? "./assets/icons/icons8_cash_register_128px_1.png"
                : "./assets/icons/icons8_cash_register_128px.png"
            }
            style={{ width: 80, height: 80, margin: "auto" }}
          />
          <Typography
            style={{
              color: props.WorkPeriod.isStarted ? "#fff" : "#575757",
              marginTop: 3,
            }}
            variant="h4"
          >
            POS
          </Typography>
        </Paper>
        <Paper
          square
          onClick={() => {
            history.push("/tickets");
          }}
          onMouseEnter={() => {
            setTab3(true);
          }}
          onMouseLeave={() => {
            setTab3(false);
          }}
          elevation={tab3 ? 20 : 2}
          style={{
            backgroundColor:
              props.Theme.theme === "light" ? "#00AEDB" : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 20,
            marginLeft: 15,
          }}
        >
          <img
            src={"./assets/icons/invoice.png"}
            style={{ width: 60, height: 60, margin: "auto" }}
          />
          <Typography style={{ color: "#fff", marginTop: 10 }} variant="h4">
            Tickets
          </Typography>
        </Paper>
      </div>

      <div style={{ display: "flex", marginTop: 10 }}>
        <Paper
          square
          onClick={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? history.push("/accounts")
              : null;
          }}
          onMouseEnter={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab4(true)
              : null;
          }}
          onMouseLeave={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab4(false)
              : null;
          }}
          elevation={tab4 ? 20 : 2}
          style={{
            backgroundColor:
              props.Theme.theme === "light" ? "#00AEDB" : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 20,
          }}
        >
          <img
            src={
              props.User.isLoggedIn === true &&
              props.User.userLogged.prevarges === "1"
                ? "./assets/icons/combo_chart.png"
                : "./assets/icons/icons8_combo_chart_128px_1.png"
            }
            style={{ width: 60, height: 60, margin: "auto" }}
          />
          <Typography
            style={{
              color:
                props.User.isLoggedIn === true &&
                props.User.userLogged.prevarges === "1"
                  ? "#fff"
                  : "#575757",
              marginTop: 13,
            }}
            variant="h4"
          >
            Accounts
          </Typography>
        </Paper>
        <Paper
          onClick={() => {
            history.push("/warehouses");
          }}
          square
          onMouseEnter={() => {
            setTab5(true);
          }}
          onMouseLeave={() => {
            setTab5(false);
          }}
          elevation={tab5 ? 20 : 2}
          style={{
            backgroundColor:
              props.Theme.theme === "light" ? "#00AEDB" : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 20,
            marginLeft: 15,
          }}
        >
          <img
            src={"./assets/icons/icons8_warehouse_240px.png"}
            style={{ width: 80, height: 80, margin: "auto" }}
          />
          <Typography style={{ color: "#fff", marginTop: 3 }} variant="h4">
            Warehouses
          </Typography>
        </Paper>
        <Paper
          square
          onClick={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? history.push("/departments")
              : null;
          }}
          onMouseEnter={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab6(true)
              : null;
          }}
          onMouseLeave={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab6(false)
              : null;
          }}
          elevation={tab6 ? 20 : 2}
          style={{
            backgroundColor:
              props.Theme.theme === "light" ? "#00AEDB" : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 20,
            marginLeft: 15,
          }}
        >
          <img
            src={
              props.User.isLoggedIn === true &&
              props.User.userLogged.prevarges === "1"
                ? "./assets/icons/icons8_unit_240px.png"
                : "./assets/icons/icons8_unit_240px_1.png"
            }
            style={{ width: 60, height: 60, margin: "auto" }}
          />
          <Typography
            style={{
              color:
                props.User.isLoggedIn === true &&
                props.User.userLogged.prevarges === "1"
                  ? "#fff"
                  : "#575757",
              marginTop: 10,
            }}
            variant="h4"
          >
            Departments
          </Typography>
        </Paper>
      </div>

      <div style={{ display: "flex", marginTop: 10 }}>
        <Paper
          square
          onClick={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? history.push("/reports")
              : null;
          }}
          onMouseEnter={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab7(true)
              : null;
          }}
          onMouseLeave={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab7(false)
              : null;
          }}
          elevation={tab7 ? 20 : 2}
          style={{
            backgroundColor:
              props.Theme.theme === "light" ? "#00AEDB" : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 20,
          }}
        >
          <img
            src={
              props.User.isLoggedIn === true &&
              props.User.userLogged.prevarges === "1"
                ? "./assets/icons/account.png"
                : "./assets/icons/icons8_account_200px_2.png"
            }
            style={{ width: 60, height: 60, margin: "auto" }}
          />
          <Typography
            style={{
              color:
                props.User.isLoggedIn === true &&
                props.User.userLogged.prevarges === "1"
                  ? "#fff"
                  : "#575757",
              marginTop: 13,
            }}
            variant="h4"
          >
            Reports
          </Typography>
        </Paper>
        <Paper
          onClick={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? history.push("/settings")
              : null;
          }}
          square
          onMouseEnter={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab8(true)
              : null;
          }}
          onMouseLeave={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab8(false)
              : null;
          }}
          elevation={tab8 ? 20 : 2}
          style={{
            backgroundColor:
              props.Theme.theme === "light" ? "#00AEDB" : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 20,
            marginLeft: 15,
          }}
        >
          <img
            src={
              props.User.isLoggedIn === true &&
              props.User.userLogged.prevarges === "1"
                ? "./assets/icons/icons8_settings_100px.png"
                : "./assets/icons/icons8_settings_100px_2.png"
            }
            style={{ width: 60, height: 60, margin: "auto" }}
          />
          <Typography
            style={{
              color:
                props.User.isLoggedIn === true &&
                props.User.userLogged.prevarges === "1"
                  ? "#fff"
                  : "#575757",
              marginTop: 11,
            }}
            variant="h4"
          >
            Settings
          </Typography>
        </Paper>
        <Paper
          square
          onClick={() => {
            props.dispatchEvent({
              type: "LOGOUT",
            });
            setTimeout(() => {
              history.push("/");
            }, 400);
          }}
          onMouseEnter={() => {
            setTab9(true);
          }}
          onMouseLeave={() => {
            setTab9(false);
          }}
          elevation={tab9 ? 20 : 2}
          style={{
            backgroundColor:
              props.Theme.theme === "light" ? "#00AEDB" : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 20,
            marginLeft: 15,
          }}
        >
          <img
            src={"./assets/icons/icons8_export_52px.png"}
            style={{ width: 60, height: 60, margin: "auto" }}
          />
          <Typography style={{ color: "#fff", marginTop: 10 }} variant="h4">
            Logout
          </Typography>
        </Paper>
      </div>
      {/* Work Period Modal */}
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          className={classes.modal}
          // onClose={handleClose}
        >
          <Paper style={{ padding: 20 }}>
            <div>
              <Typography variant="h6">Start work Period first</Typography>
            </div>
            <div style={{ marginTop: 20 }}>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
                style={{ width: 200 }}
              >
                Ok
              </Button>
            </div>
          </Paper>
        </Modal>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    WorkPeriod: state.WorkPeriod,
    User: state.User,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
