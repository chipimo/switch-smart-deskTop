import React = require("react");
import { connect } from "react-redux";
import { Button, TextField, Typography } from "@material-ui/core";
import { Icon } from "semantic-ui-react";

import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import appDb from "../../redux/dataBase";
import { useHistory } from "react-router-dom";

const electron = require("electron");
const remote = electron.remote;

const win = remote.getCurrentWindow();

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
}));

const DialPad = (props) => {
  const history = useHistory();
  const classes = useStyles();
  var [pin, setPin] = React.useState("");
  const [showPassword, setshowPassword] = React.useState(false);
  const inputRef = React.useRef();

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, []);

  const handleKeyDown = (event) => { 
  
    inputRef.current.focus();
    if (event.key === "Enter") {
      handleSubmit();
    } else if (
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].findIndex(
        (x) => x === event.key
      ) !== -1
    ) {
      pin = pin + event.key;
      setPin(pin);
    } else if (event.key === "Backspace") {
      pin = pin.slice(0, -1);
      setPin(pin);
    } else if (event.key === "Delete") {
      pin = "";
      setPin(pin);
    }
  };

  const handleClick = (value) => {
    pin = pin + value;
    setPin(pin);
  };

  // const clear = () => {
  //   pin = "";
  //   setPin(pin);
  // };

  const handleSubmit = () => {
    appDb.HandleLogIn({ pin }, (reciveCallback) => {
      if (reciveCallback.isLoggedIn) {
        props.dispatchEvent({
          type: "LOGIN",
          userLogged: reciveCallback.config[0],
        });
        setTimeout(() => {
          history.push("/home");
        }, 400);
      } else {
        props.dispatchEvent({
          type: "SHOW_NETIVE_NOTIFICATION",
          payload: {
            type: "error",
            title: "Invalid Pin",
            message:
              "User not found or Account does not exist. Please contact the Adminstrtor",
            state: "msgBox",
            detail: "",
            data: {},
          },
        });
        props.dispatchEvent({
          type: "DISMISS_NETIVE_NOTIFY",
        });
      }
    });
  };

  const handleChange = (event) => {
    // console.log(event);
    setPin(event.target.value);
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ width: "30vw", marginTop: 25 }}>
      <div>
        {/* <TextField
          inputRef={inputRef} 
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={pin}
          disabled={props.Config.isSet ? false : true}
          fullWidth
          label="ENTER PIN"
          color={props.Theme.theme === "light" ? "primary" : "secondary"}
          onChange={handleChange}
        /> */}
        <FormControl className={classes.textField} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            autoFocus
            inputRef={inputRef}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={pin}
            disabled={props.Config.isSet ? false : true}
            fullWidth
            label="ENTER PIN"
            color={props.Theme.theme === "light" ? "primary" : "secondary"}
            // onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </div>
      {/* row 1 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <Button
          disabled={props.Config.isSet ? false : true}
          onClick={(v) => handleClick("1")}
          style={{
            width: "12vw",
            backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
            height: "12vh",
            borderRadius: 0,
          }}
          variant="outlined"
        >
          <Typography variant="h5">1</Typography>
        </Button>
        <Button
          disabled={props.Config.isSet ? false : true}
          onClick={(v) => handleClick("2")}
          style={{
            width: "12vw",
            backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
            height: "12vh",
            borderRadius: 0,
          }}
          variant="outlined"
        >
          <Typography variant="h5">2</Typography>
        </Button>
        <Button
          disabled={props.Config.isSet ? false : true}
          onClick={(v) => handleClick("3")}
          style={{
            width: "12vw",
            backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
            height: "12vh",
            borderRadius: 0,
          }}
          variant="outlined"
        >
          <Typography variant="h5">3</Typography>
        </Button>
      </div>
      {/* row 2 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <Button
          disabled={props.Config.isSet ? false : true}
          onClick={(v) => handleClick("4")}
          style={{
            width: "12vw",
            backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
            height: "12vh",
            borderRadius: 0,
          }}
          variant="outlined"
        >
          <Typography variant="h5">4</Typography>
        </Button>
        <Button
          disabled={props.Config.isSet ? false : true}
          onClick={(v) => handleClick("5")}
          style={{
            width: "12vw",
            backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
            height: "12vh",
            borderRadius: 0,
          }}
          variant="outlined"
        >
          <Typography variant="h5">5</Typography>
        </Button>
        <Button
          disabled={props.Config.isSet ? false : true}
          onClick={(v) => handleClick("6")}
          style={{
            width: "12vw",
            backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
            height: "12vh",
            borderRadius: 0,
          }}
          variant="outlined"
        >
          <Typography variant="h5">6</Typography>
        </Button>
      </div>
      {/* row 3 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <Button
          disabled={props.Config.isSet ? false : true}
          onClick={(v) => handleClick("7")}
          style={{
            width: "12vw",
            backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
            height: "12vh",
            borderRadius: 0,
          }}
          variant="outlined"
        >
          <Typography variant="h5">7</Typography>
        </Button>
        <Button
          disabled={props.Config.isSet ? false : true}
          onClick={(v) => handleClick("8")}
          style={{
            width: "12vw",
            backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
            height: "12vh",
            borderRadius: 0,
          }}
          variant="outlined"
        >
          <Typography variant="h5">8</Typography>
        </Button>
        <Button
          disabled={props.Config.isSet ? false : true}
          onClick={(v) => handleClick("9")}
          style={{
            width: "12vw",
            backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
            height: "12vh",
            borderRadius: 0,
          }}
          variant="outlined"
        >
          <Typography variant="h5">9</Typography>
        </Button>
      </div>
      {/* row 4 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <Button
          disabled={props.Config.isSet ? false : true}
          onClick={() => {
            handleKeyDown({ key: "Delete" });
            // clear();
          }}
          style={{
            width: "12vw",
            backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
            height: "12vh",
            borderRadius: 0,
          }}
          variant="outlined"
        >
          <Typography variant="h5">X</Typography>
        </Button>
        <Button
          disabled={props.Config.isSet ? false : true}
          onClick={(v) => handleClick("0")}
          style={{
            width: "12vw",
            backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
            height: "12vh",
            borderRadius: 0,
          }}
          variant="outlined"
        >
          <Typography variant="h5">0</Typography>
        </Button>
        <Button
          disabled={props.Config.isSet ? false : true}
          onClick={() => handleSubmit()}
          style={{
            width: "12vw",
            backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
            height: "12vh",
            borderRadius: 0,
          }}
          variant="outlined"
        >
          <Typography variant="h5">></Typography>
        </Button>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: 10,
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        {/* <div>
          <Typography>Admin PIN 1234</Typography>
          <Typography>Change PIN will hide this hint</Typography>
        </div> */}
        <div style={{ marginTop: 6 }}>
          <Button
            onClick={() => win.close()}
            disabled={props.Config.isSet ? false : true}
            style={{
              width: "10vw",
              backgroundColor:
                props.Theme.theme === "light" ? "#fff" : "#212121",
              height: "12vh",
              borderRadius: 0,
            }}
            variant="outlined"
          >
            <Typography variant="h5">
              <Icon name="power off" />
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    Config: state.Config,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialPad);
