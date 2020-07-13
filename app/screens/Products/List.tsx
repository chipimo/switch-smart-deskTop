import React = require("react");
import { connect } from "react-redux";
import { Typography, Paper, Modal, Divider, Button } from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support

import NewProduct from "./NewProduct";
import ProductListTable from "./ProductList";
import appDb from "../../redux/dataBase";
import { Icon } from "semantic-ui-react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const PropTypes = require("prop-types");

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "97%",
    padding: 10,
    backgroundColor: theme.palette.background.paper,
    overflowX: "auto",
    maxHeight: "60vh",
    paddingBottom: 20,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  rootSearch: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 200,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  searchBar: {
    outline: "none",
    border: "none",
    width: 400,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    borderWidth: 1,
    width: "100%",
    borderStyle: "solid",
    borderColor: "transparent",
    borderBottomColor: "#0E2302",
    backgroundColor: "#2A6A08",
    color: "#ccc",
    padding: 5,
    transition: "all 1s",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0E2302",
      borderBottomColor: "#091701",
      color: "#fff",
    },
  },
  addButton2: {
    borderWidth: 1,
    width: "100%",
    borderStyle: "solid",
    borderColor: "transparent",
    borderBottomColor: "#0E2302",
    backgroundColor: "#00508F",
    color: "#ccc",
    padding: 5,
    transition: "all 1s",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#00233F",
      borderBottomColor: "#00233F",
      color: "#fff",
    },
  },
  paper: {
    position: "absolute",
    width: 900,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    //
  },
}));

var NodeId = 0;
var isCalled = false;

const ProductList = (props) => {
  const classes = useStyles();
  const [openNewProduct, setopenNewProduct] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [MainCategory, setMainCategory] = React.useState([]);
  const [LoadOnceOff, setLoadOnceOff] = React.useState(true);

  React.useEffect(() => {
    if (props.Model.toClose === "new_product") {
      props.dispatchEvent({ type: "HANDELCLEAR" });
      CloseOpenNewProduct();
    } else if (props.LoadTabel.load) {
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "all_P" },
        (receiveCallback) => {
          setTimeout(() => {
            // setState({ ...state, rows: receiveCallback.productsList });
            props.dispatchEvent({
              type: "ProductList",
              list: receiveCallback.productsList,
            });
          }, 100);
        }
      );
      props.dispatchEvent({ type: "CLEARLOADTABEL" });
    }
    if (LoadOnceOff) {
      setLoadOnceOff(false);
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "all_P" },
        (receiveCallback) => {
          setTimeout(() => {
            // console.log(receiveCallback);

            setMainCategory(receiveCallback.productsList);
            // console.log(receiveCallback);
            // setTabsList(receiveCallback.data);
            // setCategorylist(receiveCallback.categorylist);
          }, 100);
        }
      );
    }
  }, [props]);

  const handleOpenNewProduct = () => {
    setopenNewProduct(true);
  };

  const search = (event, item) => {
    if (item !== null)
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "searchedProduct", id: item },
        (receiveCallback) => {
          props.dispatchEvent({
            type: "ProductList",
            list: receiveCallback,
          });
        }
      );
    else
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "all_P" },
        (receiveCallback) => {
          props.dispatchEvent({
            type: "ProductList",
            list: receiveCallback.productsList,
          });
        }
      );
  };

  const CloseOpenNewProduct = () => {
    setopenNewProduct(false);
  };

  const HandelSelectedProduct = (data) => {
    props.dispatchEvent({ type: "SETPRODUCTS", products: data });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        padding: 4,
        backgroundColor: props.Theme.theme === "light" ? "#E5E5E5" : "#212121",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "84vh",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: props.Theme.theme === "light" ? "#929292" : "#CECECE",
          marginTop: 1,
        }}
      >
        <ProductListTable />
      </div>
      <div
        style={{
          width: "20%",
          height: "80vh",
          marginTop: 1,
          padding: 6,
        }}
      >
        <div>
          <div
            onClick={() => handleOpenNewProduct()}
            style={{ marginTop: 10, display: "flex" }}
          >
            <Typography className={classes.addButton}>
              <Icon name="plus cart" /> Add Product
            </Typography>
          </div>
        </div>

        <div>
          {isLoading ? (
            <div style={{ marginTop: 10, display: "flex" }}>
              <Typography className={classes.addButton2}>
                <Icon name="sync alternate" loading /> Please wait...
              </Typography>
            </div>
          ) : (
            <div
              onClick={() => {
                setIsLoading(true);
                props.dispatchEvent({
                  type: "HANDELCLOSE",
                  toClose: "LoadServer_all_products",
                });
                setTimeout(() => {
                  setIsLoading(false);
                }, 10000);
              }}
              style={{ marginTop: 10, display: "flex" }}
            >
              <Typography className={classes.addButton2}>
                <Icon name="plus cart" /> Get Server Products
              </Typography>
            </div>
          )}
        </div>

        <div style={{ marginTop: 10 }}>
          <Divider />
          <div>
            <Button
              onClick={() =>
                appDb.HandelProducts(
                  { _type: "getPOSList", layoutType: "all_P" },
                  (receiveCallback) => {
                    setTimeout(() => {
                      props.dispatchEvent({
                        type: "ProductList",
                        list: receiveCallback.productsList,
                      });
                    }, 100);
                  }
                )
              }
            >
              Load all products
            </Button>
          </div>
          <Divider />
          <div style={{ marginTop: 10 }}>
            <Autocomplete
              id="combo-box-demo"
              options={MainCategory}
              getOptionLabel={(option) => option.ItemName}
              onChange={search}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search products"
                  variant="outlined"
                />
              )}
            />
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openNewProduct}
        className={classes.modal}
        // onClose={handleCloseMulti}
      >
        <div className={classes.paper}>
          <NewProduct type="add" />
        </div>
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    Model: state.Model,
    LoadTabel: state.LoadTabel,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
