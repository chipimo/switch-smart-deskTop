import React = require("react");
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import OpenIcon from "@material-ui/icons/OpenWithOutlined";
import {
  Paper,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Checkbox,
  IconButton,
  Button,
  Divider,
} from "@material-ui/core";
import NewProduct from "./NewProduct";
import appDb from "../../redux/dataBase";
import { toast } from "react-toastify";
import CheckIcon from "@material-ui/icons/CheckCircle";
import UploadIcon from "@material-ui/icons/CloudUploadOutlined";
import { Icon, Loader } from "semantic-ui-react";
import Backup from "../../redux/dataBase/updater";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Currency = require("react-currency-formatter");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "73vh",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 600,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3),
  },
  inline: {
    display: "inline",
  },
  list: {
    maxHeight: 400,
    overflow: "auto",
  },
  listHeader: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const columns = [
  {
    id: "checkBox",
    label: "",
    minWidth: 30,
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  { id: "ItemName", label: "Product", minWidth: 90 },
  {
    id: "group",
    label: "Group",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "sallingprice",
    label: "Price",
    minWidth: 70,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "sync",
    label: "Server",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
];

const initialState = {
  mouseX: null,
  mouseY: null,
};

const initialState2 = {
  mouseX: null,
  mouseY: null,
};

const ProductListTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [selectedId, setSelectedId] = React.useState();
  const [selected, setSelected] = React.useState();

  const [openNewProduct, setopenNewProduct] = React.useState(false);
  const [state, setState] = React.useState({
    rows: [],
  });
  const [Syncstate, setSyncState] = React.useState({});
  const [menustate, setMenuState] = React.useState(initialState);
  const [menustate2, setMenuState2] = React.useState(initialState2);

  const [multi, SetMulti] = React.useState([]);
  const [isMulti, setisMulti] = React.useState(false);
  const [OpenProductList, setOpenProductList] = React.useState(false);
  const [LoadOnceOff, setLoadOnceOff] = React.useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [open, setOpen] = React.useState(false);
  const [LoadingData, setLoadingData] = React.useState(false);

  const handleDailogClickOpen = () => {
    setOpen(true);
  };

  const handleDailogClose = () => {
    setOpen(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    if (props.Model.toClose === "edit_product") {
      props.dispatchEvent({ type: "HANDELCLEAR" });
      CloseOpenNewProduct();
    } else if (props.LoadTabel.load) {
      props.dispatchEvent({ type: "CLEARLOADTABEL" });

    } else if (props.Model.toClose === "LoadServer_all_products") {
      props.dispatchEvent({ type: "HANDELCLEAR" });
      appDb.HandelProducts(
        { _type: "getServerProducts" },
        (receiveCallback) => {
          setTimeout(() => {
            // console.log(receiveCallback);
            // if (receiveCallback.productsList.length > 15) setRowsPerPage(25);
            // setState({ ...state, rows: receiveCallback.productsList });
          }, 100);
        }
      );
    }
    if (LoadOnceOff) {
      setLoadOnceOff(false);
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "getGrouped" },
        (receiveCallback) => {
          setTimeout(() => {
            if (receiveCallback.productResult[0]) {

              if (receiveCallback.productResult[0].length > 50) setRowsPerPage(100);
              // setState({ ...state, rows: receiveCallback.productsList });
              props.dispatchEvent({
                type: "ProductList",
                list: receiveCallback.productResult[0],
              });

            }
            // console.log(receiveCallback);
          }, 100);
        }
      );

    }
  }, [props]);

  const handleClick = (event, data) => {
    event.preventDefault();
    setMenuState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClick2 = (event, data) => {
    event.preventDefault();
    setMenuState2({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setMenuState(initialState);
  };

  const handleCloseSync = () => {
    setMenuState2(initialState2);
  };

  const handleOpenMulti = () => {
    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "mulitList", name: selected.ItemName },
      (receiveCallback) => {
        setTimeout(() => {
          SetMulti(receiveCallback.data);
        }, 100);
      }
    );
    handleClose();
    HandelOpenProductList();
  };

  const CloseProductList = () => {
    setOpenProductList(false);
  };

  const CloseOpenNewProduct = () => {
    setopenNewProduct(false);
    handleClose();
  };

  const HandelOpenProductList = () => {
    setOpenProductList(true);
  };

  const HandelAddToInventory = () => {
    var purchaseSelected = [selected];
    var data = {
      _type: "add_to_store",
      purchaseSelected,
      dep: props.Dep.dep,
    };

    appDb.HandelProducts(data, (reciveCallback) => {
      toast(
        `Successfully Purchased ${
        reciveCallback.data.number === 1
          ? reciveCallback.data.name
          : reciveCallback.data.number + " Products"
        } `,
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
  };

  const HandelDelete = (serverdelete) => {
    handleDailogClose();
    appDb.HandelProducts(
      { _type: "delete", serverdelete, selected },
      (callback) => {
        props.dispatchEvent({ type: "LOADTABEL" });

        toast(`Successfully Purchased Successfully Deleted ${callback.name}`, {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleClose();
      }
    );
  };

  const UploadProduct = () => {
    // console.log(Syncstate);
    
    Backup._SyncProduct(Syncstate,callback=>{

    })
  };

  const DeleteProductServer = (data) => {
    // console.log(data);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "85vh",
        overflow: "auto",
      }}
    >
      <Dialog
        open={open}
        onClose={handleDailogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${
            selected ? selected.ItemName : "product"
            } from server also?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If deleted from server, product will not be averable in serever
            backup but this won't be deleted from other departments
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              HandelDelete(false);
            }}
            color="primary"
            variant="contained"
            autoFocus
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              HandelDelete(true);
            }}
            variant="contained"
            color="secondary"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Paper className={classes.root}>
        <Loader active={LoadingData}>Loading Data From Server...</Loader>
        <TableContainer className={classes.container}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, id) => (
                  <TableCell
                    key={id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <Typography variant="h6">{column.label}</Typography>
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.ProductList.list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (

                    <TableRow
                      onContextMenu={(event) => {
                        handleClick(event, row);
                        setSelectedId(row.productKey);
                        setSelected(row);
                        setisMulti(row.isMulity);
                      }}
                      style={{ cursor: "context-menu" }}
                      onClick={() => {
                        setSelectedId(row.productKey);
                        setSelected(row);
                        setisMulti(row.isMulity);
                        // console.log(row);
                      }}
                      hover
                      selected={selectedId === row.productKey}
                      role="checkbox"
                      tabIndex={-1}
                      key={index + row.productKey}
                    >

                      {columns.map((column, Innerindex) => {
                        const value = row[column.id];
                        const labelId = `enhanced-table-checkbox-${Innerindex}`;

                        if (column.id === "checkBox") {
                          return (
                            <TableCell key={labelId} padding="checkbox">
                              <Checkbox
                                checked={selectedId === row.productKey}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                          );
                        } else if (column.id === "sync") {
                          return (
                            <TableCell key={labelId} padding="checkbox">
                              <div style={{ display: "flex" }}>
                                {props.ProductSync.load ? (
                                  row.ItemName === props.ProductSync.item ? (
                                    <div style={{ display: "flex" }}>
                                      <Icon name="sync" loading />
                                      <span style={{ marginLeft: 2 }}>
                                        Syncing...
                                      </span>
                                    </div>
                                  ) : (
                                      <div>
                                        {row.sync ? (
                                          <div style={{ display: "flex" }}>
                                            <IconButton
                                              onClick={() => {
                                                handleClick2(event, row);
                                                setSyncState(row);
                                              }}
                                              size="small"
                                            >
                                              <CheckIcon
                                                style={{ color: "#2FB543" }}
                                              />
                                            </IconButton>
                                            <span
                                              style={{
                                                marginLeft: 2,
                                                marginTop: 5,
                                              }}
                                            >
                                              Synced
                                          </span>
                                          </div>
                                        ) : (
                                            <div style={{ display: "flex" }}>
                                              <IconButton
                                                onClick={() => {
                                                  handleClick2(event, row);
                                                  setSyncState(row);
                                                }}
                                                size="small"
                                              >
                                                <UploadIcon />
                                              </IconButton>
                                              <span
                                                style={{
                                                  marginLeft: 2,
                                                  marginTop: 5,
                                                }}
                                              >
                                                Sync
                                          </span>
                                            </div>
                                          )}
                                      </div>
                                    )
                                ) : (
                                    <div>
                                      {row.sync ? (
                                        <div style={{ display: "flex" }}>
                                          <IconButton
                                            // onClick={() => {
                                            //   handleClick2(event, row);
                                            //   setSyncState(row);
                                            // }}
                                            size="small"
                                          >
                                            <CheckIcon
                                              style={{ color: "#2FB543" }}
                                            />
                                          </IconButton>
                                          <span
                                            style={{
                                              marginLeft: 2,
                                              marginTop: 5,
                                            }}
                                          >
                                            Synced
                                        </span>
                                        </div>
                                      ) : (
                                          <div style={{ display: "flex" }}>
                                            <IconButton
                                              onClick={() => {
                                                handleClick2(event, row);
                                                setSyncState(row);
                                              }}
                                              size="small"
                                            >
                                              <UploadIcon />
                                            </IconButton>
                                            <span
                                              style={{
                                                marginLeft: 2,
                                                marginTop: 5,
                                              }}
                                            >
                                              Sync
                                        </span>
                                          </div>
                                        )}
                                    </div>
                                  )}
                              </div>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number" ? (
                                <Currency
                                  locale="en"
                                  quantity={value}
                                  symbol="K"
                                />
                              ) : (
                                  value
                                )}
                            </TableCell>
                          );
                        }
                      })}
                      <TableCell>
                        {row.isMulity ? (
                          <img
                            style={{ width: 25, height: 25 }}
                            src={
                              props.Theme.theme === "light"
                                ? "./assets/icons/icons8_check_all_240px_1.png"
                                : "./assets/icons/icons8_check_all_240px.png"
                            }
                            alt="multi Price"
                          />
                        ) : (
                            <img
                              style={{ width: 20, height: 20 }}
                              src={
                                props.Theme.theme === "light"
                                  ? "./assets/icons/icons8_unchecked_checkbox_100px_2.png"
                                  : "./assets/icons/icons8_unchecked_checkbox_100px_3.png"
                              }
                              alt="multi Price"
                            />
                          )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100, 150, 200]}
          component="div"
          count={state.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        <Menu
          keepMounted
          open={menustate.mouseY !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            menustate.mouseY !== null && menustate.mouseX !== null
              ? { top: menustate.mouseY, left: menustate.mouseX }
              : undefined
          }
        >
          {isMulti ? (
            <MenuItem onClick={() => handleOpenMulti()}>
              <ListItemIcon>
                <OpenIcon fontSize="small" />
              </ListItemIcon>
              <Typography>Open Price List</Typography>
            </MenuItem>
          ) : null}

          <MenuItem onClick={() => setopenNewProduct(true)}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <Typography>Edit Product</Typography>
          </MenuItem>
          {/* <MenuItem onClick={() => HandelAddToInventory()}>
            <ListItemIcon>
              <AddIcon fontSize="small" />
            </ListItemIcon>
            <Typography>Add Product To Inventory</Typography>
          </MenuItem> */}
          <MenuItem onClick={() => handleDailogClickOpen()}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <Typography>Delete Product</Typography>
          </MenuItem>
        </Menu>
      </Paper>

      <Menu
        keepMounted
        open={menustate2.mouseY !== null}
        onClose={handleCloseSync}
        anchorReference="anchorPosition"
        anchorPosition={
          menustate2.mouseY !== null && menustate2.mouseX !== null
            ? { top: menustate2.mouseY, left: menustate2.mouseX }
            : undefined
        }
      >
        {Syncstate.sync ? (
          <MenuItem
            onClick={() => {
              DeleteProductServer(Syncstate);
              handleCloseSync();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <Typography>Delete Product from server</Typography>
          </MenuItem>
        ) : (
            <MenuItem
              onClick={() => {
                UploadProduct();
                handleCloseSync();
              }}
            >
              <ListItemIcon>
                <UploadIcon fontSize="small" />
              </ListItemIcon>
              <Typography>Upload Product to server</Typography>
            </MenuItem>
          )}
      </Menu>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={OpenProductList}
        className={classes.modal}
        onClose={CloseProductList}
      >
        <div className={classes.paper}>
          {selected ? (
            <div>
              <div>
                <Typography color="textPrimary">{selected.ItemName}</Typography>
              </div>
              <div>
                <List
                  subheader={
                    <ListSubheader className={classes.listHeader}>
                      Price List
                    </ListSubheader>
                  }
                  className={classes.list}
                >
                  {multi.map((data, sInnerIndex) => (
                    <ListItem key={sInnerIndex + data.sallingprice}>
                      <ListItemText
                        style={{ color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff" }}
                        primary={
                          <Typography>
                            <Currency
                              locale="en"
                              quantity={parseInt(data.sallingprice)}
                              symbol="K"
                            />
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              barcode:{" "}
                              {data.barcode !== ""
                                ? data.barcode
                                : "no barcode"}
                              ,{` qnt: ${data.qnt}, alertOut: ${data.alertOut}`}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openNewProduct}
        className={classes.modal}
        onClose={CloseOpenNewProduct}
      >
        <NewProduct type="edit" data={{ selected }} />
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    Model: state.Model,
    Dep: state.Dep,
    ProductsMainList: state.ProductsMainList,
    LoadTabel: state.LoadTabel,
    ProductSync: state.ProductSync,
    SocketConn: state.SocketConn,
    ProductList: state.ProductList,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListTable);
