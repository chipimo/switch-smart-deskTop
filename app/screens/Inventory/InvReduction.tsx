import React = require("react");
import { connect } from "react-redux";
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
import appDb from "../../redux/dataBase";
import { Modal, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

const Currency = require("react-currency-formatter");

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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 380,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3),
  },
}));

const InvReduction = (props) => {
  const classes = useStyles();
  const [loadOnce, setLoadOnce] = React.useState(true);
  const [OpenTrans, setOpenTrans] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});
  const [multi, setMulti] = React.useState({ data: [] });
  var [selectedGood, setSelectedGood] = React.useState({});

  const [state, setState] = React.useState({
    columns: [
      {
        title: "Product Name ",
        field: "ItemName",
      },
      {
        title: "Group",
        field: "group",
      },
      {
        title: "In Store",
        field: "amountInstore",
      },
    ],
    data: [],
  });

  React.useEffect(() => {
    if (loadOnce) {
      props.dispatchEvent({ type: "LOADTABEL" });
      setLoadOnce(false);
    }

    if (props.LoadTabel.load) {
      LoadData();
      props.dispatchEvent({ type: "CLEARLOADTABEL" });
    }
  }, [props]);

  const LoadData = () => {
    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "all_purcheased" },
      (receiveCallback) => {
        setTimeout(() => {
          setState({ ...state, data: receiveCallback });
        }, 100);
      }
    );

    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "all_P" },
      (receiveCallback) => {
        setMulti({ ...multi, data: receiveCallback.mulitList });
      }
    );
  };

  const HandleQutChange = (value, data) => {
    var dataSelected = {
      value,
      selectedItem,
    };

    setSelectedGood(dataSelected);
  };

  const done = () => {
    // console.log(selectedGood.data)
    setOpenTrans(false);
    appDb.HandelProducts(
      { _type: "invReduction", data: selectedGood },
      (receiveCallback) => {
        toast(`Successfully Purchased ${receiveCallback.name} `, {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    );
  };

  return (
    <div>
      <div
        style={{
          width: "79%",
          height: "80vh",
          overflow: "auto",
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        <MaterialTable
          icons={tableIcons}
          title="Inventory Reduction "
          columns={state.columns}
          actions={[
            {
              icon: "send",
              tooltip: "Reduce",
              onClick: (event, rowData) => {
                setSelectedItem(rowData);
                setTimeout(() => {
                  setOpenTrans(true);
                }, 300);
              },
            },
          ]}
          data={state.data}
        />
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={OpenTrans}
        onClose={() => setOpenTrans(false)}
        className={classes.modal}
      >
        <div className={classes.paper}>
          <div
            style={{
              height: 150,
              overflow: "auto",
              paddingLeft: 3,
              paddingRight: 3,
              paddingTop: 3,
              color: "#fff",
            }}
          >
            {selectedItem.ItemName}

            <div style={{ marginTop: 10 }}>
              <Divider />
              <div style={{ marginTop: 5, height: 110, overflow: "auto" }}>
                <li
                  style={{
                    borderColor: "transparent",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderBottomColor: "#ccc",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Currency
                      locale="en"
                      quantity={selectedItem.sallingprice}
                      symbol="K"
                    />
                    <div>{selectedItem.amountInstore}</div>
                    -
                    <input
                      disabled={selectedItem.amountInstore === 0 ? true : false}
                      style={{ width: 50 }}
                      defaultValue={0}
                      onInput={(e) => {
                        HandleQutChange(e.target.value, selectedItem);
                      }}
                      type="text"
                    />
                  </div>
                </li>
              </div>
            </div>
          </div>
          <Button onClick={done} style={{ marginTop: 10 }} variant="contained">
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    LoadTabel: state.LoadTabel,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvReduction);
