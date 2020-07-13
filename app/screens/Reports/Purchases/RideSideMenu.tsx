import React = require("react");
import { connect } from "react-redux";
import { Typography, Paper } from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import appDb from "../../../redux/dataBase";
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

const RideSideMenu = (props) => {
  const [purchaseList, setPurchaseList] = React.useState({ data: [] });
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Product Name ",
        field: "name",
      },
      {
        title: "Group",
        field: "group",
      },
      {
        title: "Recipes",
        field: "recipes",
      },
      {
        title: "Time",
        field: "time",
      },
      {
        title: "Quantity",
        field: "quantity",
      },
    ],
    data: [],
  });
  var NodeId = 0;

  React.useEffect(() => {
    appDb.HandelReports({ _type: "get_purchases" }, (reciveCallback) => {
      setTimeout(() => {
        setPurchaseList({ ...purchaseList, data: reciveCallback });
      }, 300);
    });
  }, []);

  return (
    <div style={{ width: 800, display: "flex", height: "70vh" }}>
      <div
        style={{ width: "80%", padding: 10, height: "66vh", overflow: "auto" }}
      >
        <MaterialTable
          icons={tableIcons}
          title="Inventory List "
          columns={state.columns}
          data={state.data}
        />
      </div>
      <Paper style={{ width: "25%", padding: 10 }}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {purchaseList.data.map((mainNode, index) => (
            <TreeItem
              key={index}
              nodeId={`${NodeId++}`}
              label={`Year-${mainNode.year}`}
            >
              {mainNode.months.map((subNode, innerIndex) => (
                <TreeItem
                  key={innerIndex}
                  nodeId={`${NodeId++}`}
                  label={subNode.month}
                >
                  {subNode.days.map((list, daysIndex) => (
                    <TreeItem
                      key={daysIndex}
                      nodeId={`${NodeId++}`}
                      label={`${list.day} ${list.list.length}`}
                      onClick={() => {
                        setState({ ...state, data: list.list });
                      }}
                    />
                  ))}
                </TreeItem>
              ))}
            </TreeItem>
          ))}
        </TreeView>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RideSideMenu);
