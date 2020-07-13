import React = require("react");
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography, Grid, Modal, Paper } from "@material-ui/core";
import { toast } from "react-toastify";
import appDb from "../../redux/dataBase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "68%",
    padding: 15,
    height: "83vh",
    overflow: "auto",
  },
  table: {
    width: "100%",
    borderColor: "#aaaaaa",
    borderStyle: "solid",
    borderWidth: 1,
    borderCollapse: "collapse",
  },
  tableCol: {
    width: 200,
    borderColor: "#aaaaaa",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableRow: {
    width: 200,
    borderColor: "#aaaaaa",
    borderStyle: "solid",
    borderWidth: 1,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Product_Groups = (props) => {
  const classes = useStyles();
  const [portionInputs, setPortionInputs] = React.useState({
    data: [],
  });
  const [colors, setColor] = React.useState({
    backgroundColor: "#3b3b3b",
    textColor: "#fff",
  });

  const [values, setValues] = React.useState({
    GroupName: "",
  });
  const [errors, setErrors] = React.useState({
    groupError: "",
  });
  const [mainGroups, setMainGroups] = React.useState([]);
  const [mainRecipes, setMainRecipes] = React.useState([]);
  const [OpenProductList, setOpenProductList] = React.useState(false);

  React.useEffect(() => {
    appDb.HandelGroup({ _type: "get" }, (reciveCallback) => {      
      setMainGroups(reciveCallback.data);
    });
  }, [props]);

  const CloseProductList = () => {
    setOpenProductList(false);
  };

  const OpenRecipesList = (data) => {
    setMainRecipes(data.data);
    setOpenProductList(true);
  };

  const handleTextChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop === "GroupName") setErrors({ ...errors, groupError: "" });
  };

  const handelColorChange = (type, InputColor) => {
    setColor({ ...colors, [type]: InputColor });
  };

  const handelOnTextPartonChage = (value, id, index) => {
    portionInputs.data[index].recipe = value;

    setPortionInputs({
      ...portionInputs,
      data: portionInputs.data,
    });
  };

  const handelDelete = () => {
    var arr = portionInputs.data;

    const filter = arr.findIndex((x) => x.id === 1);
    arr.splice(filter, 1);

    setPortionInputs({
      ...portionInputs,
      data: arr,
    });
  };

  const handelSubmit = () => {
    if (values.GroupName === "")
      return setErrors({ ...errors, groupError: "Name Should not be empty" });

    var Data = {
      _type: "set",
      group: values.GroupName,
      recipes: portionInputs.data,
      colors,
    };

    appDb.HandelGroup(Data, (callback) => {
      if (callback.isSet) {
        setValues({ ...values, GroupName: "" });
        setPortionInputs({
          ...portionInputs,
          data: [],
        });

        appDb.HandelGroup({ _type: "get" }, (reciveCallback) => {
          setMainGroups(reciveCallback.data);
        });

        toast(`Successfully Added ${values.GroupName} `, {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast(`"${values.GroupName}" group already exit`, {
          position: "top-right",
          autoClose: 5000,
          type: "error",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const handelPortion = () => {
    var newArr = [];

    newArr = portionInputs.data;
    var input = `input_${newArr.length}`;
    var id = 0;

    if (newArr.length === 0) {
      newArr.push({
        recipe: "",
      });
    } else {
      id = newArr.length;
      newArr.push({
        recipe: "",
      });
    }
    setPortionInputs({ ...portionInputs, data: newArr });
  };

  return (
    <div
      className={classes.paper}
      style={{
        backgroundColor: props.Theme.theme === "light" ? "#F8F8F8" : "#212121",
        color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
      }}
    >
      <div style={{ paddingBottom: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="GroupName"
              name="GroupName"
              variant="outlined"
              required
              fullWidth
              value={values.GroupName}
              onChange={handleTextChange("GroupName")}
              id="GroupName"
              label="Group Name"
              color="secondary"
              error={errors.groupError === "" ? false : true}
              helperText={errors.groupError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div style={{ display: "flex" }}>
              <div>
                <Typography>Button Color</Typography>
                <input
                  onChange={(e) => {
                    handelColorChange("backgroundColor", e.target.value);
                  }}
                  type="color"
                />
              </div>
              <div style={{ marginLeft: 15 }}>
                <Typography>Button Text Color</Typography>
                <input
                  onChange={(e) => {
                    handelColorChange("textColor", e.target.value);
                  }}
                  type="color"
                />
              </div>

              <div
                style={{
                  marginLeft: 15,
                  borderColor: "#aaaaaa",
                  borderStyle: "solid",
                  borderWidth: 1,
                  padding: 15,
                }}
              >
                Button Preview
                <div>
                  <Button
                    style={{
                      // width: 150,
                      backgroundColor: colors.backgroundColor,
                      color: colors.textColor,
                    }}
                  >
                    <Typography style={{ width: "100%" }}>
                      {values.GroupName}
                    </Typography>
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>

        {/* <div style={{ marginTop: 30 }}>
          <div
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                width: "80%",
                borderColor: "#aaaaaa",
                borderStyle: "solid",
                height: 230,
                borderWidth: 1,
                borderRadius: 3,
                marginTop: 20,
              }}
            >
              <div
                style={{
                  marginTop: -10,
                  backgroundColor:
                    props.Theme.theme === "light" ? "#F8F8F8" : "#212121",
                  marginLeft: 10,
                  width: 97,
                  paddingLeft: 5,
                }}
              >
                <Typography variant="body2">Recipes</Typography>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    padding: 10,
                    width: "62%",
                    maxHeight: 210,
                    overflow: "hidden",
                    overflowY: "auto",
                  }}
                >
                  <table className={classes.table}>
                    <thead>
                      <tr>
                        <th className={classes.tableCol}>Recipes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portionInputs.data.map((tablelist, index) => (
                        <tr
                          key={index}
                          // onClick={() => console.log(tablelist)}
                        >
                          <td className={classes.tableRow}>
                            <input
                              style={{
                                border: "none",
                                outline: "none",
                                width: 150,
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "recipes",
                                  index
                                );
                              }}
                              type="text"
                              placeholder="recipes"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ width: "20%" }}>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handelPortion()}
                    >
                      Add Portion
                    </Button>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handelDelete()}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 10,
        }}
      >
        <div>
          <Button
            style={{ marginLeft: 10 }}
            variant="contained"
            color="primary"
            onClick={() => handelSubmit()}
          >
            Save
          </Button>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <table
          style={{
            width: "70%",
            borderColor: "#ccc",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          <thead>
            <tr>
              <th className={classes.tableCol}>Action</th>
              <th className={classes.tableCol}>Group</th>
              {/* <th className={classes.tableCol}>Recipes</th> */}
            </tr>
          </thead>
          <tbody>
            {mainGroups.map((list, index) => (
              <tr key={index}>
                <td className={classes.tableRow}>
                  <button
                    onClick={() => {
                      appDb.HandelGroup(
                        { _type: "deleteGroup", group: list },
                        (callback) => {
                          toast("Successfully deleted !", {
                            position: "top-right",
                            autoClose: 5000,
                            type: "success",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                          appDb.HandelGroup(
                            { _type: "get" },
                            (reciveCallback) => {
                              setMainGroups(reciveCallback.data);
                            }
                          );
                        }
                      );
                    }}
                  >
                    delete
                  </button>
                </td>
                <td className={classes.tableRow}>{list.group}</td>
                {/* <td className={classes.tableRow}>
                  <button
                    onClick={() => OpenRecipesList({ data: list.recipes })}
                  >
                    Open Recipes
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={OpenProductList}
          className={classes.modal}
          onClose={CloseProductList}
        >
          <Paper elevation={12} style={{ padding: 15 }}>
            {mainRecipes.map((list, index) => (
              <tr key={index}>
                <td className={classes.tableRow}>
                  <button>delete</button>
                </td>
                <td className={classes.tableRow}>{list.recipe}</td>
              </tr>
            ))}
          </Paper>
        </Modal>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Cart: state.Cart,
    Theme: state.Theme,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product_Groups);
