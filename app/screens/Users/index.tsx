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

const index = (props) => {
  const [state, setState] = React.useState({
    columns: [
      {
        title: "User Name",
        field: "userName",
      },
      {
        title: "Pin",
        field: "pin",
      },
      {
        title: "Department",
        field: "department",
        editable: "never",
      },
      {
        title: "Prevarges",
        field: "prevarges",
        lookup: { 1: "Admistrator", 0: "User" },
      },
    ],
    data: [],
  });

  React.useEffect(() => {
    appDb.HandleGetUser((callback) => {
      console.log(callback);

      var data = [];
      callback.map((list) => {
        data.push({
          id: list.id,
          userName: list.userName,
          pin: "***********",
          department: props.Dep.dep,
          prevarges: list.prevarges,
          notifications: list.notifications,
        });
      });
      setState({ ...state, data: data });
    });
  }, []);

  const upDateCategory = (data) => {};
  return (
    <div
      style={{ padding: 20, width: "100%", height: "77vh", overflow: "auto" }}
    >
      <MaterialTable
        icons={tableIcons}
        title="Inventory List "
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
          new Promise((resolve) => {
              appDb.HandleNewUser(newData, (callback) => {
                setTimeout(() => {
                  resolve();

                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              appDb.HandleEidtUser(newData, (callback) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              });
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              appDb.HandleDeleteUser(oldData, (callback) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              });
            }),
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({ Dep: state.Dep });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
