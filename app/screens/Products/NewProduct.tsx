import React = require("react");
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography, Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import appDb from "../../redux/dataBase";
import { Message } from "semantic-ui-react";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3, 4, 3),
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
  link: {
    color: "#0078D7",
    textDecoration: "underline",
    marginTop: 20,
    cursor: "pointer",
    "&:hover, &$focusVisible": {
      color: "#002847",
    },
  },
}));

const NewProduct = (props) => {
  const classes = useStyles();
  const [portionInputs, setPortionInputs] = React.useState({
    data: [],
  });
  const [values, setValues] = React.useState({
    ProductName: "",
    BarCode1: "",
    BarCode2: "",
    BarCode3: "",
    BarCode4: "",
    BarCode5: "",
    alertOut: "",
    amount: "",
    Groupname: "",
  });
  const [errors, setErrors] = React.useState({
    nameError: "",
    barCodeError: "",
    alertOutError: "",
    groupError: "",
    amount: "",
  });

  const [mainGroups, setMainGroups] = React.useState([]);
  const [Recipes, setRecipes] = React.useState([]);
  const [selectedRecipe, setSelectedRecipe] = React.useState("");
  const [Loading, setLoading] = React.useState(false);

  const [SelectedMainGroups, setSelectedMainGroups] = React.useState({
    group: "",
    colors: {},
  });

  React.useEffect(() => {
    if (props.type === "edit") {
      setLoading(true);
      // console.log(props.data);
      setValues({ ...values, ProductName: props.data.selected.ItemName });
      if (props.data.selected.isMulity) {
        appDb.HandelProducts(
          {
            _type: "getPOSList",
            layoutType: "mulitList",
            name: props.data.selected.ItemName,
          },
          async (receiveCallback) => {
            var loopEnd = 0;
            const dataOutput = receiveCallback.data.map(
              async (datalist, index) => {
                // console.log(datalist);
                loopEnd++;
                handelPortion(datalist.id);
                handelOnTextPartonChage(datalist.barcode1, "barcode1", index);
                handelOnTextPartonChage(datalist.barcode2, "barcode2", index);
                handelOnTextPartonChage(datalist.barcode3, "barcode3", index);
                handelOnTextPartonChage(datalist.barcode4, "barcode4", index);
                handelOnTextPartonChage(datalist.barcode5, "barcode5", index);
                handelOnTextPartonChage(datalist.qnt, "multiplier", index);
                handelOnTextPartonChage(datalist.alertOut, "alertOut", index);
                handelOnTextPartonChage(datalist.sallingprice, "price", index);

                if (loopEnd === receiveCallback.data.length) {
                  return true;
                }
              }
            );

            const reslut = await Promise.all(dataOutput);
            if (reslut) setLoading(false);
          }
        );
      } else {
        handelPortion(false);
        setTimeout(() => {
          handelOnTextPartonChage(props.data.selected.barcode1, "barcode1", 0);
          handelOnTextPartonChage(props.data.selected.barcode2, "barcode2", 0);
          handelOnTextPartonChage(props.data.selected.barcode3, "barcode3", 0);
          handelOnTextPartonChage(props.data.selected.barcode4, "barcode4", 0);
          handelOnTextPartonChage(props.data.selected.barcode5, "barcode5", 0);
          handelOnTextPartonChage(
            props.data.selected.multiplier,
            "multiplier",
            0
          );
          handelOnTextPartonChage(
            parseInt(props.data.selected.alertOut),
            "alertOut",
            0
          );
          handelOnTextPartonChage(props.data.selected.sallingprice, "price", 0);
        }, 300);
      }
    }
    appDb.HandelGroup({ _type: "get" }, (reciveCallback) => {
      var arr = [];
      reciveCallback.data.map((data) => {
        arr.push({
          title: data.group,
          recipes: data.recipes,
          colors: data.colors,
        });
      });
      setMainGroups(arr);
    });
  }, []);

  const handleTextChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop === "ProductName") setErrors({ ...errors, nameError: "" });
    if (prop === "alertOut") setErrors({ ...errors, alertOutError: "" });
    if (prop === "Groupname") setErrors({ ...errors, groupError: "" });
  };

  const handelOnTextPartonChage = async (value, id, index) => {
    switch (id) {
      case "barcode1":
        portionInputs.data[index].barcode1 = value;
        break;
      case "barcode2":
        portionInputs.data[index].barcode2 = value;
        break;
      case "barcode3":
        portionInputs.data[index].barcode3 = value;
        break;
      case "barcode4":
        portionInputs.data[index].barcode4 = value;
        break;
      case "barcode5":
        portionInputs.data[index].barcode5 = value;
        break;
      case "multiplier":
        portionInputs.data[index].multiplier = value;
        break;
      case "alertOut":
        portionInputs.data[index].alertOut = value;
        break;
      case "price":
        portionInputs.data[index].price = value;
        break;

      default:
        break;
    }

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
    if (values.ProductName === "")
      return setErrors({ ...errors, nameError: "Name Should not be empty" });
    else if (portionInputs.data.length === 0) return;

    var data = {
      name: values.ProductName,
      group: SelectedMainGroups,
      recipe: selectedRecipe,
      portion: portionInputs.data,
      _type: props.type === "edit" ? "edit" : "set",
      data: props.type === "edit" ? props.data.selected : null,
    };

    appDb.HandelProducts(data, (reciveCallback) => {
      toast(`Successfully Updeted`, {
        position: "top-right",
        autoClose: 5000,
        type: "success",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      if (props.type === "edit")
        props.dispatchEvent({
          type: "HANDELCLOSE",
          toClose: "edit_product",
        });
      else {
        props.dispatchEvent({
          type: "HANDELCLOSE",
          toClose: "new_product",
        });
      }

      props.dispatchEvent({
        type: "LOADTABEL",
      });
    });
  };

  const handelPortion = (propId) => {
    var newArr = [];

    newArr = portionInputs.data;
    var input = propId ? propId : `input_${newArr.length}`;
    var id = 0;

    if (newArr.length === 0) {
      newArr.push({
        id: input,
        barcode1: "",
        barcode2: "",
        barcode3: "",
        barcode4: "",
        barcode5: "",
        multiplier: "",
        alertOut: 1,
        price: "",
      });
    } else {
      id = newArr.length;
      newArr.push({
        id: input,
        barcode1: "",
        barcode2: "",
        barcode3: "",
        barcode4: "",
        barcode5: "",
        multiplier: "",
        alertOut: 1,
        price: "",
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
        height: props.type === "edit" ? 550 : 500,
      }}
    >
      <div style={{ height: 400 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {props.type === "edit" ? (
              <label>
                Defailt Product Name:{" "}
                <span style={{ color: "red", textDecoration: "underline" }}>
                  {props.data.selected.name}
                </span>{" "}
              </label>
            ) : null}
            <TextField
              style={{ marginTop: props.type === "edit" ? 20 : 0 }}
              autoComplete="ProductName"
              name="ProductName"
              variant="outlined"
              required
              fullWidth
              onChange={handleTextChange("ProductName")}
              value={values.ProductName}
              id="ProductName"
              label="Product Name"
              error={errors.nameError === "" ? false : true}
              helperText={errors.nameError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {props.type === "edit" ? (
              <label>
                Defailt Product Group:{" "}
                <span style={{ color: "red", textDecoration: "underline" }}>
                  {props.data.selected.group}
                </span>
              </label>
            ) : null}
            <Autocomplete
              disabled={props.type === "edit" ? true : false}
              id="combo-box-demo"
              options={mainGroups}
              onChange={(event, newValue) => {
                var arr = [];
                // if (newValue.recipes.length !== 0) {
                //   newValue.recipes.map((data) => {
                //     arr.push({ title: data.recipe });
                //   });
                // }
                setRecipes(arr);
                setSelectedMainGroups({
                  ...SelectedMainGroups,
                  group: newValue.title,
                  colors: newValue.colors,
                });
              }}
              getOptionLabel={(option) => option.title}
              style={{ width: 300, marginTop: props.type === "edit" ? 20 : 0 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Group Code"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: 10 }} />
        <Grid item xs={12} sm={6}>
          {props.type === "edit" ? (
            <label>
              Defailt Product Group:{" "}
              <span style={{ color: "red", textDecoration: "underline" }}>
                {props.data.selected.recipes}
              </span>
            </label>
          ) : null}
          {/* <Autocomplete
            disabled={props.type === "edit" ? true : false}
            id="combo-box-demo"
            options={Recipes}
            getOptionLabel={(option) => option.title}
            style={{ width: 300, marginTop: props.type === "edit" ? 20 : 0 }}
            onChange={(event, newValue) => {
              setSelectedRecipe(newValue.title);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Recipes"
                variant="outlined"
                fullWidth
              />
            )}
          /> */}
        </Grid>
        <div style={{ marginTop: 30 }}>
          <div
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
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
                <Typography variant="body2">Portion Prices</Typography>
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
                    width: "82%",
                    maxHeight: 210,
                    overflow: "hidden",
                    overflowY: "auto",
                  }}
                >
                  <table className={classes.table}>
                    <thead>
                      <tr>
                        <th className={classes.tableCol}>BarCode</th>
                        <th className={classes.tableCol}>Alert Out</th>
                        <th className={classes.tableCol}>Price</th>
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
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                outline: "none",
                                width: 200,
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "barcode1",
                                  index
                                );
                              }}
                              type="text"
                              defaultValue={tablelist.barcode1}
                              name={tablelist.barcode}
                              placeholder="barcode 1"
                            />
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                outline: "none",
                                width: 200,
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "barcode2",
                                  index
                                );
                              }}
                              type="text"
                              defaultValue={tablelist.barcode2}
                              name={tablelist.barcode}
                              placeholder="barcode 2"
                            />
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                outline: "none",
                                width: 200,
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "barcode3",
                                  index
                                );
                              }}
                              type="text"
                              defaultValue={tablelist.barcode}
                              name={tablelist.barcode3}
                              placeholder="barcode 3"
                            />
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                outline: "none",
                                width: 200,
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "barcode4",
                                  index
                                );
                              }}
                              type="text"
                              defaultValue={tablelist.barcode}
                              name={tablelist.barcode4}
                              placeholder="barcode 4"
                            />
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                outline: "none",
                                width: 200,
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "barcode5",
                                  index
                                );
                              }}
                              type="text"
                              defaultValue={tablelist.barcode}
                              name={tablelist.barcode5}
                              placeholder="barcode 5"
                            />
                          </td>
                          {/* <td className={classes.tableRow}>
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                width: 230,
                                outline: "none",
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "multiplier",
                                  index
                                );
                              }}
                              type="number"
                              defaultValue={tablelist.multiplier}
                              name={tablelist.multiplier}
                              placeholder="multiplier"
                            />
                          </td> */}

                          <td className={classes.tableRow}>
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                width: 230,
                                outline: "none",
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "alertOut",
                                  index
                                );
                              }}
                              type="number"
                              defaultValue={tablelist.alertOut}
                              name={tablelist.alertOut}
                              placeholder="alert out"
                            />
                          </td>
                          <td className={classes.tableRow}>
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                width: 230,
                                outline: "none",
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "price",
                                  index
                                );
                              }}
                              type="number"
                              defaultValue={tablelist.price}
                              name={tablelist.price}
                              placeholder="price"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {props.type !== "edit" ? (
                    <div>
                      {portionInputs.data.length === 0 ? (
                        <div style={{ marginTop: 10 }}>
                          <Message warning>
                            <Message.Header>
                              Atlest add one row in the Portion Table
                            </Message.Header>

                            <Typography>
                              We have to get the Price of the Product this must
                              not be empty. If the Multiplier or Alert Out is
                              left blank it will be set to defult which is 1.
                              Barcode is optional
                            </Typography>
                          </Message>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {Loading ? (
                    <div style={{ marginTop: 10 }}>
                      <Message warning>
                        <Message.Header>Loading product</Message.Header>

                        <Typography>Please Wait...</Typography>
                      </Message>
                    </div>
                  ) : null}
                </div>
                <div
                  style={{
                    width: "15%",
                  }}
                >
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handelPortion(false)}
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
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: props.type === "edit" ? 70 : 20,
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
        <div>
          <Button
            onClick={() => {
              if (props.type === "edit")
                props.dispatchEvent({
                  type: "HANDELCLOSE",
                  toClose: "edit_product",
                });
              else {
                props.dispatchEvent({
                  type: "HANDELCLOSE",
                  toClose: "new_product",
                });
              }
            }}
            style={{ marginLeft: 10 }}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
