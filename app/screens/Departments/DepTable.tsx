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

const DepTable = (props) => {
  const [state, setState] = React.useState({
    columns: [
      { title: "Deparment Name", field: "dep_name" },
      { title: "Number", field: "phone" },
      { title: "ShopNo", field: "shopNo" },
      { title: "Road", field: "road" },
      { title: "TPIN", field: "tpin" },
      { title: "Tax Type", field: "taxType" },
      { title: "Tax Rate", field: "taxRat" },
    ],
    data: [],
  });

  React.useEffect(() => {
    appDb.HandleDepartments({ type: "getAll" }, (callback) => {
      setState({ ...state, data: callback.departments });
    });
  }, []);

  return (
    <div style={{ height: "70vh", overflow: "auto" }}>
      <MaterialTable
        icons={tableIcons}
        title="All Departments"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              if (!newData.dep_name) {
                alert("Department Name Must Not Be Empty");
                return resolve();
              }
              appDb.HandleDepartments(
                {
                  type: "create",
                  data: {
                    department: newData.dep_name,
                    id: "auto",
                    phone: newData.phone,
                    shopNo: newData.shopNo,
                    road: newData.road,
                    state: "Lusaka",
                    country: "Zambia",
                    tpin: newData.tpin,
                    taxType: newData.taxType,
                    taxRat: newData.taxRat,
                  },
                },
                (callback) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }
              );
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => { 
              appDb.HandleDepartments(
                { type: "edit",_type:'EditLocal', data: { newData, oldData } },
                (callback) => {
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
                }
              );
            }),
          onRowDelete: (newData, oldData) =>
            new Promise((resolve) => {
              appDb.HandleDepartments(
                { type: "delete", data: { newData, oldData } },
                (callback) => {
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
                }
              );
            }),
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DepTable);
