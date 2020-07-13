import React = require("react");
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { AppBar, IconButton, Paper, Modal, Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import MutiList from "./MutiList/MutiList";
import appDb from "../../../redux/dataBase";
import BarcodeReader from "react-barcode-reader";
import { toast } from "react-toastify";
import ArrowIcon from "@material-ui/icons/ArrowRight";

const uuidv4 = require("uuid/v4");

function CreatId() {
  return uuidv4();
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "43vw",
    minWidth: "43vw",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 140,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    height: 70,
    backgroundColor: "transparent",
    marginBottom: 10,
    border: "none",
    fontSize: 25,
    cursor: "pointer",
    outline: "none",
  },
  image: {
    position: "relative",
    height: 200,
    margin: 10,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 1,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.8,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    // padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
    //   6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
  rootSearch: {
    display: "flex",
    alignItems: "center",
    width: 400,
    margin: "auto",
    marginBottom: 2,
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
}));

export const index = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [tabsList, setTabsList] = React.useState([]);
  const [IsScanned, setIsScanned] = React.useState(false);
  const [productsList, setProductsList] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [openMulti, setOpenMulti] = React.useState(false);
  const [multi, setMulti] = React.useState([]);
  var [shotbarcode, setshotbarcode] = React.useState("");
  var [selectedTab, setselectedTab] = React.useState("");
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(event);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  React.useEffect(() => {
    if (props.Model.toClose === "mulit") {
      props.dispatchEvent({ type: "HANDELCLEAR" });
      handleCloseMulti();
    }

    if (props.Cart.refreshCart) handleTabChange(selectedTab);

    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "tabs" },
      (receiveCallback) => {
        setTimeout(() => {
          // console.log(receiveCallback);
          var data = [];
          receiveCallback.data.map((tablist) => {
            // console.log(tablist);
            if (tablist.isInstore) data.push(tablist);
          });
          setTabsList(data);
          // setCategorylist(receiveCallback.categorylist);
        }, 100);
      }
    );
  }, [props]);

  const handleTabChange = (event) => {
    setselectedTab(event);

    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "ProductsList", category: event },
      (receiveCallback) => {
        setTimeout(() => {
          var data = [];
          receiveCallback.data.map((list) => {
            if (list.isInstore) data.push(list);
          });
          setProductsList(data);
        }, 100);
      }
    );
  };

  const handleProducts = (event) => {
    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "ProductsList", category: event },
      (receiveCallback) => {
        setTimeout(() => {
          // console.log(receiveCallback.data);
          setProductsList(receiveCallback.data);
        }, 100);
      }
    );
    // setProductsList;
  };

  const handleSelect = (data) => {
    if (!data.isMulity) {
      props.dispatchEvent({
        type: "ADDTOCART",
        payload: {
          items: data,
        },
      });
    } else {
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "mulitList", name: data.ItemName },
        (callback) => {
          // console.log(callback.data.sort((a, b) => a - b));
          var data = callback.data.sort((a, b) => a - b);
          setMulti(data);
          handleOpenMulti();
        }
      );
    }
  };

  const handleError = (err) => {};

  const handleOnKeyPress = (key) => {
    // console.log(key.length);
    if (key !== "Enter") {
      shotbarcode = shotbarcode + key;
      setshotbarcode(shotbarcode);
    }

    if (key === "Enter") {
      handleScan(shotbarcode);
    }
    // console.log(key);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // console.log("enter press here! ");
    }
  };

  const handleScan = (data) => {
    if (!IsScanned) {
      setIsScanned(true);
      setTimeout(() => {
        setIsScanned(false);
      }, 100);
      appDb.HandelProducts(
        { _type: "barcodeScen", value: data },
        (callback) => { 
          if (callback.data.length !== 0) {
            if (callback.from === "main") {
              props.dispatchEvent({
                type: "ADDTOCART",
                payload: {
                  items: callback.data[0],
                },
              });
            } else {
              var itemData = {
                ItemName: callback.data[0].productName,
                productKey: CreatId(),
                sallingprice: callback.data[0].sallingprice,
                initalPrice: callback.data[0].sallingprice,
                isTaxEnabled: false,
                quantity: 1,
                amountInstore: callback.data[0].amountInstore,
                qnt: callback.data[0].qnt,
                isAddedToCart: false,
                istaxed: "yes",
              };

              props.dispatchEvent({
                type: "ADDTOCART",
                payload: {
                  items: itemData,
                },
              });
            }
          } else {
            toast(`No product found with this barcode "${shotbarcode}"`, {
              position: "top-right",
              autoClose: 5000,
              type: "error",
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // <Notification />
          }
          setshotbarcode("");

          // console.log(callback.data);
        }
      );
    }
    setshotbarcode("");
    // console.log(data);
  };

  const handleOpenMulti = () => {
    setOpenMulti(true);
  };

  const handleCloseMulti = () => {
    setOpenMulti(false);
  };

  return (
    <div
      style={{
        width: "89vw",
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
      }}
      onClick={handleKeyPress}
    >
      <div
        style={{
          width: "12vw",
          height: "100%",
          overflow: "auto",
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "transparent",
          borderRightColor:
            props.Theme.theme === "light" ? "#929292" : "#424242",
        }}
      >
        {tabsList.map((tabs, index) => (
          <Button
            key={tabs.key}
            disabled={props.TicketToPrint.active ? true : false}
            className={classes.tab}
            onClick={() => {
              handleTabChange(tabs.tabname);
            }}
            style={{
              width: "10.6vw",
              backgroundColor: tabs.background,
              color: tabs.color,
              cursor: props.TicketToPrint.active ? "default" : "pointer",
            }}
          >
            <Typography
              style={{
                width: "10.6vw",
                textOverflow: "ellipsis",
                fontSize: 11,
              }}
            >
              {tabs.tabname}
            </Typography>
          </Button>
        ))}
      </div>
      <BarcodeReader
        onError={handleError}
        onScan={handleScan}
        onKeyDetect={(event) => {
          handleOnKeyPress(event.key);
        }}
      />
      <div
        style={{
          width: "77vw",
          height: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "93%",
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "transparent",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className={classes.root}>
            {/* <AppBar position="static" color="default"> */}
            {/* <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              {categorylist.map((tablist, index) => (
                <Tab
                  key={tablist.id}
                  label={tablist}
                  onClick={() => handleProducts(tablist)}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs> */}
            {/* </AppBar> */}
            {/* <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          > */}
            {props.TicketToPrint.active ? null : (
              <div>
                {productsList.map((tabPanelList, index) => (
                  <Button
                    // disabled={tabPanelList.amountInstore === 0 ? true : false}
                    onClick={() => {
                      if (tabPanelList.amountInstore === 0) {
                        toast(`"${tabPanelList.ItemName} is out of stock"`, {
                          position: "top-right",
                          autoClose: 5000,
                          type: "error",
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                        return;
                      }

                      handleSelect(tabPanelList);
                    }}
                    style={{
                      width: "30%",
                      height: 85,
                      margin: 6,
                      overflow: "hidden",
                      textAlign: "center",
                      backgroundColor:
                        tabPanelList.amountInstore === 0
                          ? "#0E0205"
                          : "#0E0E0E",
                    }}
                  >
                    <Typography
                      style={{
                        width: "10.6vw",
                        textOverflow: "ellipsis",
                        fontSize: 11,
                        color:
                          tabPanelList.amountInstore === 0 ? "#6E7D79" : "#fff",
                      }}
                    >
                      {tabPanelList.ItemName}
                    </Typography>
                  </Button>
                ))}
              </div>
            )}

            {/* </SwipeableViews> */}
          </div>
        </div>
        <div style={{ padding: 10, display: "flex" }}>
          <Typography
            style={{
              color: props.Theme.theme === "light" ? "#3b3b3b" : "#AAAAAA",
            }}
            variant="caption"
          >
            Keyboad Event
          </Typography>
          <ArrowIcon
            style={{
              marginTop: -2,
              color: props.Theme.theme === "light" ? "#3b3b3b" : "#AAAAAA",
            }}
          />
          <Typography variant="caption" style={{ marginLeft: 10 }}>
            {shotbarcode}
          </Typography>
        </div>
      </div>

      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openMulti}
          className={classes.modal}
          onClose={handleCloseMulti}
        >
          <Paper style={{ height: "55vh", width: "50%" }}>
            <div
              style={{
                marginTop: 10,
                marginRight: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ marginLeft: 10 }}>
                <Typography variant="h5" style={{ color: "#aaaaaa" }}>
                  Select Price
                </Typography>
              </div>
              <IconButton onClick={handleCloseMulti}>
                <ClearIcon />
              </IconButton>
            </div>
            <div style={{ width: "100%" }}>
              <MutiList multi={multi} />
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
    SocketConn: state.SocketConn,
    Cart: state.Cart,
    Model: state.Model,
    TicketToPrint: state.TicketToPrint,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
