import React = require("react");
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  Input,
  InputAdornment,
  FormHelperText,
  Button,
  NativeSelect,
  MenuItem,
  Select,
  Paper,
} from "@material-ui/core";
import appDb from "../../redux/dataBase";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import MaterialTable from "material-table";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { toast } from "react-toastify";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox />),
  Check: forwardRef((props, ref) => <Check />),
  Clear: forwardRef((props, ref) => <Clear />),
  Delete: forwardRef((props, ref) => <DeleteOutline />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight />),
  Edit: forwardRef((props, ref) => <Edit />),
  Export: forwardRef((props, ref) => <SaveAlt />),
  Filter: forwardRef((props, ref) => <FilterList />),
  FirstPage: forwardRef((props, ref) => <FirstPage />),
  LastPage: forwardRef((props, ref) => <LastPage />),
  NextPage: forwardRef((props, ref) => <ChevronRight />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft />),
  ResetSearch: forwardRef((props, ref) => <Clear />),
  Search: forwardRef((props, ref) => <Search />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn />),
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  Treeroot: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "84vh",
  },
  tableroot: {
    width: "60vw",
    height: "65vh",
    overflow: "auto",
    marginTop: 10,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
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
  _buttonLinks: {
    color: "#5FA3F6",
    textDecoration: "underline",
    "&:hover": {
      color: "red",
    },
    cursor: "pointer",
    marginLeft: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: 180,
  },
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Tax_Template = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [selected, setSelected] = React.useState(0);
  const [values, setValues] = React.useState({
    ProductName: "",
    tax: "",
    tpin: "",
  });
  const [errors, setErrors] = React.useState({
    nameError: "",
    taxError: "",
  });
  const [taxMapping, setTaxMapping] = React.useState([]);
  const [TaxMappingOut, setTaxMappingOut] = React.useState([]);
  const [Taxedproducts, setTaxedproducts] = React.useState({
    data: [],
    columns: [
      {
        title: "Product Name",
        field: "tabname",
      },
      
    ],
  });
  const [products, setProducts] = React.useState({
    data: [],
    columns: [
      {
        title: "Product Name",
        field: "tabname",
      }
      
    ],
  });
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Product Name",
        field: "ItemName",
      },
    ],
    data: [],
  });
  const [MainCategory, setMainCategory] = React.useState([]);
  var NodeId = 0;

  React.useEffect(() => {
    LoadList();

    setTimeout(() => {
      setValues({
        ...values,
        tax: props.Config.config.config[0].taxRat,
        ProductName: props.Config.config.config[0].taxType,
        tpin: props.Config.config.config[0].tpin,
      });
    }, 700);
  }, []);

  const LoadList = () => {
    appDb.HandelProducts(
      {
        _type: "getPOSList",
        layoutType: "all_P",
      },
      (reciveCallback) => {
        var arr = [];
        var arrOut = [];

        reciveCallback.tabs.map((list) => {
          // console.log(list);
          if (list.isTaxEnabled) {
            arr.push(list);
          } else {
            arrOut.push(list);
          }
        });
        setProducts({ ...products, data: arr });
        setTaxedproducts({ ...Taxedproducts, data: arrOut });
      }
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelected(newValue);
  };

  const handleTextChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop === "ProductName") setErrors({ ...errors, nameError: "" });
    if (prop === "alertOut") setErrors({ ...errors, taxError: "" });
  };

  const handleSave = () => {
    // console.log(taxMapping);
    if (
      values.ProductName !== props.Config.config.config[0].taxType ||
      values.tpin !== props.Config.config.config[0].tpin ||
      values.tax !== props.Config.config.config[0].taxRat
    )
      appDb.HandleTaxUpdate(values, (callback) => {
        toast(`Successfully Updated tax`, {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        LoadList();
      });

    if (taxMapping.length !== 0)
      appDb.HandelProducts(
        { _type: "Add_filter", taxMapping },
        (reciveCallback) => {
          toast(`Successfully Added to filtered List`, {
            position: "top-right",
            autoClose: 5000,
            type: "success",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          LoadList();
        }
      );
  };

  const HandleFilterdDelete = () => {
    // console.log(data);
    appDb.HandelProducts(
      { _type: "remove_filter", TaxMappingOut },
      (reciveCallback) => {
        toast(`Successfully Removed from filtered List`, {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        LoadList();
      }
    );
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          height: "70vh",
          backgroundColor: props.Theme.theme === "light" ? "#fff" : "#",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab
            label="General Settings"
            {...a11yProps(0)}
            style={{
              backgroundColor: selected === 0 ? "#0A56D9" : "transparent",
              color:
                selected === 0
                  ? "#fff"
                  : props.Theme.theme === "light"
                  ? "#3b3b3b"
                  : "#ccc",
            }}
          />
          <Tab
            label="Product list"
            {...a11yProps(1)}
            style={{
              backgroundColor: selected === 1 ? "#0A56D9" : "transparent",
              color:
                selected === 1
                  ? "#fff"
                  : props.Theme.theme === "light"
                  ? "#3b3b3b"
                  : "#ccc",
            }}
          />
          <Tab
            label="Trx List"
            {...a11yProps(2)}
            style={{
              backgroundColor: selected === 2 ? "#0A56D9" : "transparent",
              color:
                selected === 2
                  ? "#fff"
                  : props.Theme.theme === "light"
                  ? "#3b3b3b"
                  : "#ccc",
            }}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div style={{ width: 600 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ marginTop: props.type === "edit" ? 20 : 0 }}
                autoComplete="Name"
                name="ProductName"
                variant="outlined"
                fullWidth
                value={values.ProductName}
                onChange={handleTextChange("ProductName")}
                id="ProductName"
                label="Name"
                autoFocus
                error={errors.nameError === "" ? false : true}
                helperText={errors.nameError}
              />
            </Grid>
            <Grid style={{ marginTop: 20 }} item xs={12} sm={6}>
              <TextField
                style={{ marginTop: props.type === "edit" ? 20 : 0 }}
                autoComplete="tpin"
                name="tpin"
                variant="outlined"
                fullWidth
                value={values.tpin}
                onChange={handleTextChange("tpin")}
                id="tpin"
                label="T Pin"
                autoFocus
                error={errors.nameError === "" ? false : true}
                helperText={errors.nameError}
              />
            </Grid>
            <div style={{ marginTop: 25 }}>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <Input
                    id="standard-adornment-percent"
                    value={values.tax}
                    onChange={handleTextChange("tax")}
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                    aria-describedby="standard-percent-helper-text"
                    inputProps={{
                      "aria-label": "percent",
                    }}
                  />
                  <FormHelperText id="standard-percent-helper-text">
                    Tax Percent
                  </FormHelperText>
                </FormControl>
              </Grid>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className={classes.tableroot}>
            <MaterialTable
              icons={tableIcons}
              title="Product list"
              columns={products.columns}
              data={products.data}
              options={{
                selection: true,
              }}
              onSelectionChange={(rows) => {
                setTaxMapping(rows);
              }}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className={classes.tableroot}>
            <MaterialTable
              icons={tableIcons}
              title="Product list"
              columns={Taxedproducts.columns}
              data={Taxedproducts.data}
              options={{
                selection: true,
              }}
              onSelectionChange={(rows) => {
                setTaxMappingOut(rows);
              }}
            />
          </div>
        </TabPanel>
      </div>
      <div
        style={{
          height: "13.5vh",
        }}
      >
        {value === 2 ? (
          <Button
            variant="contained"
            color="primary"
            disabled={TaxMappingOut.length === 0 ? true : false}
            onClick={HandleFilterdDelete}
            style={{ marginLeft: 20, marginTop: 11 }}
          >
            Delete
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            disabled={taxMapping.length === 0 ? true : false}
            onClick={handleSave}
            style={{ marginLeft: 20, marginTop: 11 }}
          >
            Save
          </Button>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Tax_Template);
