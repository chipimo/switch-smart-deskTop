import React = require("react");
import { connect } from "react-redux";
import {
  Paper,
  Typography,
  Divider,
  Button,
  NativeSelect,
} from "@material-ui/core";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles"; // web.cjs is required for IE 11 support
import appDb from "../../../redux/dataBase";
import TableCell from "@material-ui/core/TableCell";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Calendar from "ciqu-react-calendar";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SaveIcon from "@material-ui/icons/PictureAsPdf";

const Currency = require("react-currency-formatter");
const moment = require("moment");
const { ipcRenderer } = require("electron");

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
    if (props.SocketConn.isConn) {
      appDb.HandleDepartments({ type: "getAll" }, (callback) => {
        SetDepartments(callback.departments);
        handleGetSaleData({
          date: month,
          Datetype: "Month",
          dep: props.Dep.dep,
        });
      });
    } else {
      // SetDepartments(props.Dep.dep);
      handleGetSaleData({
        date: month,
        Datetype: "Month",
        dep: props.Dep.dep,
      });
    }
  }, [props]);

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
    setDep(event.target.value);
    // console.log(event.target.value);
    handleGetSaleData({
      date: month,
      Datetype: "Month",
      dep: event.target.value,
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
    // console.log(value.format("MM/DD/YYYY"));
    setSelectedDate({ ...selectedDate, value: value });

    handleGetSaleData({
      date: value.format("MM/DD/YYYY"),
      Datetype: "Datetrack",
      dep: Dep,
    });
  };

  const savePdf = () => {
    ipcRenderer.send("save_pdf", { type: "workPeriod", SalesList });
  };

  const onOpenChange = (status) => {
    // console.log("open status: " + status);
  };

  const disabledDate = (currentDate, inputValue) => {
    return false;
  };

  return (
    <div style={{ width: "84vw", display: "flex" }}>
      <div
        style={{
          width: "100%",
          height: "84vh",
          backgroundColor: "#424242",
          padding: 7,
          marginTop: 4,
          overflow: "auto",
        }}
      >
        <div style={{ overflow: "auto", display: "flex" }}>
          <div style={{ width: "20vw" }}>
            <NativeSelect
              value={Dep}
              onChange={handleDepChange}
              inputProps={{ "aria-label": "age" }}
            >
              {Departments.map((list, index) => (
                <option value={list.dep_name}>{list.dep_name}</option>
              ))}
            </NativeSelect>
          </div>
          <div style={{ width: "20vw", marginLeft: 30 }}>
            <NativeSelect
              value={defaultMonth}
              onChange={handleMonthChange}
              inputProps={{ "aria-label": "age" }}
            >
              {Months.map((list, index) => (
                <option value={list}>{list}</option>
              ))}
            </NativeSelect>
          </div>

          <Divider style={{ marginTop: 3, marginBottom: 5 }} />

          <Calendar
            onChange={onChange}
            value={selectedDate.value}
            allowClear={true}
            disabled={false}
            placeholder={"please input date"}
            format={"MM/DD/YYYY"}
            onOpenChange={onOpenChange}
            disabledDate={disabledDate}
          />
        </div>
        <Divider />

        <TableContainer component={Paper}>
          <Typography style={{ marginTop: 5, marginBottom: 5 }}>
            Sales Invoice
          </Typography>

          <Button
            style={{ marginLeft: 10 }}
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={() => savePdf()}
          >
            Save As Pdf
          </Button>
          <Table stickyHeader size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Invoice No</TableCell>
                <TableCell align="left">Department</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="right">Cash sales</TableCell>
                <TableCell align="right">Discount</TableCell>
                <TableCell align="right">Credit</TableCell>
                <TableCell align="right">Tax</TableCell>
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
                    <Typography>{row.Department}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography>{row.Date}</Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography>
                      <Currency
                        locale="en"
                        quantity={row.RtxGrandTotal}
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
                      <Currency
                        locale="en"
                        quantity={row.RtxBalance}
                        symbol="K"
                      />
                    </Typography>
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
                  <TableCell align="right">
                    <Typography>
                      <Currency
                        locale="en"
                        quantity={
                          row.RtxGrandTotal - row.Discount - row.RtxBalance
                        }
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
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Dep: state.Dep,
    SocketConn: state.SocketConn,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
