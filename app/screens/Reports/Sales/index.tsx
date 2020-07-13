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
  NativeSelect,
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

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PrinterIcon from "@material-ui/icons/PrintOutlined";
import SaveIcon from "@material-ui/icons/PictureAsPdf";

const Currency = require("react-currency-formatter");
const moment = require("moment");

const _ = require("lodash");
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

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const initialState = {
  mouseX: null,
  mouseY: null,
};

const index = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState({ value: moment() });

  const [SalesList, setSalesList] = React.useState({ data: [] });
  const [Dep, setDep] = React.useState("Deparment");
  const [Header, setHeader] = React.useState({
    date: "",
    day: "",
    totalInvoices: "",
  });

  const [Totals, setTotals] = React.useState({
    GrandTotal: 0,
    Discount: 0,
    Balance: 0,
    Taxtotal: 0,
  });

  const [Departments, SetDepartments] = React.useState([]);
  const [Months, SetMonths] = React.useState([]);
  const [defaultMonth, setdefaultMonth] = React.useState("");

  const [reportType, setReportType] = React.useState(2);

  React.useEffect(() => {
    setDep(props.Dep.dep);
    setdefaultMonth(month);

    handleGetSaleData({
      date: month,
      Datetype: "Month",
      dep: props.Dep.dep,
    });
    appDb.HandleDepartments({ type: "getAll" }, (callback) => {
      SetDepartments(callback.departments);
    });
  }, []);

  const handleGetSaleData = (prop) => {
    appDb.HandelReports(
      {
        _type: "get_sales",
        data: prop.dep,
        dateType: prop.Datetype,
        date: prop.date,
      },
      (callback) => {
        // console.log(callback);
        setHeader({
          ...Header,
          date: prop.date,
          totalInvoices: callback.data.length,
        });
        setSalesList({ ...SalesList, data: callback.data });

        var monthList = [];

        callback.data.map((list) => {
          var IsMonth = monthList.indexOf(list.Month);

          if (IsMonth === -1) {
            monthList.push(list.Month);
          }
        });
        SetMonths(monthList);
      }
    );
  };

  const handleDepChange = (event) => {
    setDep(event.target.value.dep_name);
    // console.log(event.target.value);
    handleGetSaleData({
      date: month,
      Datetype: "Month",
      dep: event.target.value.dep_name,
    });
  };

  const handleMonthChange = (event) => {
    setdefaultMonth(event.target.value);
    // console.log(event.target.value);
    handleGetSaleData({
      date: event.target.value,
      Datetype: "Month",
      dep: Dep,
    });
  };

  const onChange = (value, inputValue) => {
    console.log(value.format("DD-MM-YYYY"));
    setSelectedDate({ ...selectedDate, value: value });

    handleGetSaleData({
      date: value.format("DD-MM-YYYY"),
      Datetype: "ShortDate",
      dep: Dep,
    });
  };

  const onOpenChange = (status) => {
    console.log("open status: " + status);
  };

  const disabledDate = (currentDate, inputValue) => {
    return false;
  };

  return (
    <div style={{ width: 910, display: "flex" }}>
      <div
        style={{
          width: "75%",
          height: "84vh",
          backgroundColor: "#424242",
          padding: 7,
          marginTop: 4,
          overflow: "auto",
        }}
      >
        <Divider />

        <TableContainer component={Paper}>
          <Typography style={{ marginTop: 5, marginBottom: 5 }}>
            Sales Invoice
          </Typography>

          <Button
            style={{ marginLeft: 10 }}
            variant="outlined"
            startIcon={<SaveIcon />}
          >
            Save As Pdf
          </Button>
          <Table stickyHeader size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Sr No</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="right">Cash sales</TableCell>
                <TableCell align="right">Discount</TableCell>
                <TableCell align="right">Credit</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {SalesList.data.map((row) => (
                <StyledTableRow key={row.SrNo}>
                  <TableCell align="left">
                    <Typography>{row.SrNo}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography>{row.Date}</Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography>
                      <Currency
                        locale="en"
                        quantity={row.GrandTotal}
                        symbol="K"
                      />
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>
                      <Currency
                        locale="en"
                        quantity={row.Discount}
                        symbol="K"
                      />
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>
                      <Currency locale="en" quantity={row.Balance} symbol="K" />
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>
                      <Currency
                        locale="en"
                        quantity={row.GrandTotal - row.Discount - row.Balance}
                        symbol="K"
                      />
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider style={{ marginTop: 20 }} />

        <TableContainer style={{ marginTop: 20 }} component={Paper}>
          <Typography style={{ marginTop: 5, marginBottom: 5 }}>
            Tax Invoice
          </Typography>

          <Button
            style={{ marginLeft: 10 }}
            variant="outlined"
            startIcon={<SaveIcon />}
          >
            Save As Pdf
          </Button>
          <Table stickyHeader size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Sr No</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {SalesList.data.map((row) => (
                <StyledTableRow key={row.SrNo}>
                  <TableCell align="left">
                    <Typography>{row.SrNo}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography>{row.Date}</Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography>
                      <Currency
                        locale="en"
                        quantity={row.totalTax}
                        symbol="K"
                      />
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Paper style={{ width: "25%", padding: 5 }}>
        <FormControl style={{ width: "100%" }}>
          <NativeSelect
            value={Dep}
            onChange={handleDepChange}
            inputProps={{ "aria-label": "age" }}
          >
            {Departments.map((list, index) => (
              <option value={list}>{list.dep_name}</option>
            ))}
          </NativeSelect>
          {/* <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Dep}
            displayEmpty
            onChange={handleDepChange}
          >
            {Departments.map((list, index) => (
              <MenuItem value={list}>{list.dep_name}</MenuItem>
            ))}
          </Select> */}
        </FormControl>
        <div style={{ padding: 10 }}>
          <Typography style={{ color: "#ccc" }}>Sales History</Typography>
        </div>

        <Divider style={{ marginTop: 3, marginBottom: 5 }} />
        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Typography style={{ color: "#ccc" }} variant="caption">
            Month
          </Typography>
        </div>

        <NativeSelect
          value={defaultMonth}
          onChange={handleMonthChange}
          inputProps={{ "aria-label": "age" }}
        >
          {Months.map((list, index) => (
            <option value={list}>{list}</option>
          ))}
        </NativeSelect>

        <Divider style={{ marginTop: 3, marginBottom: 5 }} />

        <div style={{ height: "60vh", overflow: "auto" }}>
          <Typography>Pick Date</Typography>
          <Calendar
            onChange={onChange}
            value={selectedDate.value}
            allowClear={true}
            disabled={false}
            placeholder={"please input date"}
            format={"DD-MM-YYYY"}
            onOpenChange={onOpenChange}
            disabledDate={disabledDate}
          />
          <div style={{ padding: 15 }}>
            <Divider />
          </div>
          <List component="nav" aria-labelledby="nested-list-subheader">
            <ListItem
              selected={reportType === 2 ? true : false}
              onClick={() => {
                setReportType(2);
                handleGetSaleData({
                  date: month,
                  Datetype: "Month",
                  dep: Dep,
                });
              }}
              button
            >
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="This Month Reports" />
            </ListItem>
            <ListItem
              selected={reportType === 3 ? true : false}
              onClick={() => {
                setReportType(1);
                handleGetSaleData({
                  date: year,
                  Datetype: "Year",
                  dep: Dep,
                });
                setReportType(3);
              }}
              button
            >
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="This Year Reports" />
            </ListItem>
          </List>
        </div>
      </Paper>
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
