import React = require("react");
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import appDb from "../../redux/dataBase";
import Row from "./Row";
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Calendar from "ciqu-react-calendar";

const Currency = require("react-currency-formatter");
const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: 8000,
    backgroundColor: "#fff",
    color:'#3b3b3b'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const index = (props) => {
  const [state, setState] = React.useState({
    columns: [],
    data: [],
  });
  const [TotalSales, setTotalSales] = React.useState(0);
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState({ value: moment() });

  const onChange = (value, inputValue) => {
    // console.log(value.format("MM/DD/YYYY"));
    appDb.HandelReports(
      { _type: "get_sales_tickets", date: value.format("MM/DD/YYYY") },
      (reciveCallback) => {
        // console.log(reciveCallback.data);
        setState({
          ...state,
          data: reciveCallback.data,
        });
        var totals = 0;
        reciveCallback.data.map((items) => {
          totals = items.AmountPaid + totals;
        });
        setTotalSales(totals);
      }
    );
    setSelectedDate({ ...selectedDate, value: value });
  };

  const onOpenChange = (status) => {
    // console.log("open status: " + status);
  };

  const disabledDate = (currentDate, inputValue) => {
    return false;
  };

  React.useEffect(() => {
    appDb.HandelReports(
      { _type: "get_sales_tickets", date: moment().format("MM/DD/YYYY") },
      (reciveCallback) => {
        // console.log(reciveCallback.data);
        setState({
          ...state,
          data: reciveCallback.data,
        });
        var totals = 0;
        reciveCallback.data.map((items) => {
          totals = items.AmountPaid + totals;
        });
        setTotalSales(totals);
      }
    );
  }, []);

  return (
    <div
      style={{
        padding: 6,
        paddingLeft: 27,
        paddingRight: 27,
        height: "84vh",
        overflow: "auto",
      }}
    >
      <div style={{ height: 30, width: 220 }}>
        <Calendar
          onChange={onChange}
          value={selectedDate.value}
          allowClear={true}
          disabled={false}
          placeholder={"please input date"}
          format={"MM/DD/YYYY"}
          className={classes.container}
          onOpenChange={onOpenChange}
          disabledDate={disabledDate}
        />
      </div>
      <TableContainer style={{ maxHeight: "80vh" }} component={Paper}>
        <Table stickyHeader size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Print</Typography>
              </TableCell>
              <TableCell>
                <Typography>Date</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>Cash Sale No</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>Customer</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>Description</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>Payment</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Cash sale</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>More</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.data.map((row) => (
              <Row key={row.id} row={row} />
            ))}
            <TableRow style={{ backgroundColor: "#303030" }}>
              <TableCell align="right">
                <Divider />
              </TableCell>
              <TableCell align="right">
                <Divider />
              </TableCell>
              <TableCell align="right">
                <Divider />
              </TableCell>
              <TableCell align="right">
                <Divider />
              </TableCell>
              <TableCell align="right">
                <Divider />
              </TableCell>
              <TableCell align="left">
                <Divider />
                <Typography variant="h6">Total sales</Typography>
              </TableCell>
              <TableCell align="right">
                <Divider />
                <Typography variant="h6">
                  <Currency locale="en" quantity={TotalSales} symbol="K" />
                </Typography>
                <Divider />
                <Divider />
                <Divider />
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default index;
