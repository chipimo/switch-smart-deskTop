import React = require("react");
import { connect } from "react-redux";
import {
  Paper,
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
  Menu,
  ListItemIcon,
  Modal,
  DialogActions,
  Button,
  InputLabel,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeItem from "@material-ui/lab/TreeItem";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import appDb from "../../../redux/dataBase";
import TableCell from "@material-ui/core/TableCell";
import EventNoteIcon from "@material-ui/icons/EventNote";
import DatePicker from "react-datepicker";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Calendar from "ciqu-react-calendar";

const Currency = require("react-currency-formatter");
const moment = require("moment");

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

var check = moment(new Date());
var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
var month = check.format("MMMM"); // => ('January','February.....)
var year = check.format("YYYY");
var time = check.format("LT");

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const initialState = {
  mouseX: null,
  mouseY: null,
};

const index = (props) => {
  const classes = useStyles();

  const [SetList, setSetList] = React.useState([]);
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Product",
        field: "name",
      },
      { 
        title: "Date",
        field: "date",
      },
      {
        title: "Number",
        field: "quantity",
      },
      {
        title: "From",
        field: "from",
      },
      {
        title: "To",
        field: "to",
      },
      {
        title: "State",
        field: "state",
      },
    ],
  });

  React.useEffect(() => {
    appDb.HandleInventoryTransfer((callback) => {
      setSetList(callback.department);
    });
  }, []);

  return (
    <div style={{ width: "80vw", display: "flex" }}>
      <div
        style={{
          width: "98%",
          height: "84vh",
          padding: 7,
          marginTop: 4,
          overflow: "auto",
        }}
      >
        
        <MaterialTable
          icons={tableIcons}
          title="Transfer List"
          columns={state.columns}
          data={SetList}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Dep: state.Dep,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
