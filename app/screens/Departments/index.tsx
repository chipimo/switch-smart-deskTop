import React = require("react");
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Divider,
  Button,
  Paper,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Select from "react-select";
import LinearProgress from "@material-ui/core/LinearProgress";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import appDb from "../../redux/dataBase";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    fontSize: 22,
  }),
};

const index = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const [isLoading, setisLoading] = React.useState(true);
  const [SelectDep, setSelectDep] = React.useState(true);
  const [IsSettingDb, setIsSettingDb] = React.useState(false);
  const [IsnewSetup, setIsnewSetup] = React.useState(false);
  const [TempData, setTempData] = React.useState([]);

  const [DepSelected, setDepSelected] = React.useState(null);
  const [DepName, setDepName] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    depName: "",
  });
  const [errors, setErrors] = React.useState({
    nameError: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);

  const getData = () => {
    appDb.HandleDepartments({ type: "check" }, (reciveCallback) => {
      if (reciveCallback.exist) {
        setisLoading(false);
        setSelectDep(true);

        let data = [];

        reciveCallback.deps.map((items) => {
          data.push({
            value: items.dep_name,
            label: items.dep_name,
            color: "#3b3b3",
            data: items,
          });
        });

        setTempData(data);
      } else {
        setSelectDep(false);
        setisLoading(false);
      }
    });
  };

  const handleTextChange = (event, prop) => {
    setValues({ ...values, [prop]: event.target.value });
    setErrors({ ...errors, nameError: "" });
  };

  const OnSubmitForm = () => {
    setIsSettingDb(true);
    if (values.depName === "") {
      setErrors({ ...errors, nameError: "Department name is required" });
    } else {
      appDb.HandleDepartments(
        {
          type: "set",
          data: {
            department: values.depName,
            id: "auto",
            phone: "",
            shopNo: "",
            road: "",
            state: "",
            country: "",
            tpin: "",
            taxType: "",
            taxRat: "",
          },
        },
        (reciveCallback) => {
          if (reciveCallback.isSet) {
            props.dispatchEvent({
              type: "SETDEP",
              dep: reciveCallback.department,
            });

            props.dispatchEvent({
              type: "SETCONFIG",
              isSet: true,
              config: reciveCallback.department,
            });
          }
        }
      );
    }
  };

  const handleDepSelected = () => {
    setisLoading(true);
    setSelectDep(false);

    appDb.HandleDepartments(
      {
        type: "setSelected",
        DepSelected,
      },
      (reciveCallback) => {
        setTimeout(() => {
          props.dispatchEvent({
            type: "SETCONFIG",
            isSet: true,
            config: reciveCallback,
          });
        }, 1000);
      }
    );
  };

  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ paddingTop: 100 }}>
        <Typography variant="h4">Welcome To Switch Smart</Typography>
        <Typography>Switch to a Smart world</Typography>

        <div style={{ width: "50%", margin: "auto", marginTop: 30 }}>
          <Divider />
          {isLoading ? (
            <div style={{ width: "30%", paddingTop: 40, margin: "auto" }}>
              <LinearProgress color="secondary" />
              <div>
                <Typography variant="overline">Please wait...</Typography>
              </div>
            </div>
          ) : (
            <div>
              {SelectDep === false ? (
                <div>
                  <div>
                    <Typography>No Department found</Typography>

                    <div style={{ marginTop: 20 }}>
                      <Button
                        onClick={handleOpen}
                        variant="contained"
                        color="primary"
                      >
                        Creat new Department
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* <Select
                    styles={customStyles}
                    onChange={(data) => {
                      setDepName(data.label);
                      setDepSelected(data);
                    }}
                    options={TempData}
                  /> */}

                  <Autocomplete
                    id="combo-box-demo"
                    options={TempData}
                    getOptionLabel={(option) => option.label}
                    style={{ width: "100%", marginTop: 15 }}
                    onChange={(event, newValue) => {
                      setDepName(newValue.label);
                      setDepSelected(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Department"
                        variant="outlined"
                      />
                    )}
                  />
                  <div style={{ marginTop: 20 }}>
                    <Button
                      disabled={DepSelected ? false : true}
                      onClick={handleDepSelected}
                      variant="contained"
                      color="primary"
                    >
                      Set The Department Selected
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        className={classes.modal}
        // onClose={handleClose}
      >
        <Paper
          style={{
            padding: 20,
            height: "40vh",
            width: "50%",
            paddingTop: 20,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <Typography variant="h6">Start A New Department</Typography>
          </div>

          <div style={{ marginTop: 20 }}>
            <TextField
              autoComplete="depName"
              name="depName"
              variant="outlined"
              required
              fullWidth
              value={values.depName}
              onChange={(e) => handleTextChange(e, "depName")}
              id="depName"
              label="Department Name"
              autoFocus
              error={errors.nameError === "" ? false : true}
              helperText={errors.nameError}
              disabled={IsSettingDb ? true : false}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <Button
              disabled={IsSettingDb ? true : false}
              onClick={OnSubmitForm}
              variant="contained"
              color="primary"
              style={{ width: 200, marginRight: 10 }}
            >
              Start Department
            </Button>
            <Button
              disabled={IsSettingDb ? true : false}
              onClick={handleClose}
              variant="contained"
              color="secondary"
              style={{ width: 200, marginLeft: 10 }}
            >
              Cancel
            </Button>

            {IsSettingDb ? (
              <div style={{ width: "30%", paddingTop: 15, margin: "auto" }}>
                <LinearProgress color="secondary" />
                <div>
                  <Typography variant="overline">Please wait...</Typography>
                </div>
              </div>
            ) : null}
          </div>
        </Paper>
      </Modal>
    </div>
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
