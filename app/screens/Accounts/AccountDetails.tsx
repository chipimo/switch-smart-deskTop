import React = require("react");
import { connect } from "react-redux";
import {
  AppBar,
  MenuItem,
  TextField,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  Checkbox
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import PrintIcon from "@material-ui/icons/Print";
import { useHistory } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    width: 200
  },
  root: {
    width: "100%",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  container: {
    maxHeight: 380
  },
  table: {
    width: "100%"
  }
}));

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    width: 100,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const columns = [
  {
    id: "checkBox",
    label: "",
    minWidth: 30,
    align: "left",
    format: value => value.toLocaleString()
  },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "left",
    format: value => value.toLocaleString()
  },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "left",
    format: value => value.toLocaleString()
  },
  {
    id: "debit",
    label: "Debit",
    minWidth: 170,
    align: "right",
    format: value => value.toFixed(2)
  },
  {
    id: "credit",
    label: "Credit",
    minWidth: 170,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "balance",
    label: "Balance",
    minWidth: 170,
    align: "right",
    format: value => value.toLocaleString()
  }
];

function createData(id, date, description, debit, credit, balance) {
  return { id, date, description, debit, credit, balance };
}

const rows = [
  createData(
    "t1",
    "3/31/2020 1:02",
    "Sales Transations [#1]",
    "-",
    "K 200.00",
    "(98.90)"
  ),
  createData(
    "t2",
    "3/3/2020 1:02",
    "Sales Transations [#2]",
    "-",
    "K 200.00",
    "(98.90)"
  )
];

const initialState = {
  mouseX: null,
  mouseY: null
};

const AccountDetails = props => {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [state, setState] = React.useState(initialState);
  const [selectedId, setSelectedId] = React.useState();
  const [selected, setSelected] = React.useState();
  const [startDate, setStartDate] = React.useState(new Date());

  const history = useHistory();

  const handleChange = event => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setState(initialState);
  };

  const handleClick = (event, data) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFindTicket = () => {
    if (selected) {
    } else {
      alert("Select an item from the list first");
    }
  };

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ padding: 20, width: "87%" }}>
        <AppBar
          elevation={0}
          color="default"
          position="static"
          style={{
            padding: 5,
            backgroundColor:
              props.Theme.theme === "light" ? "#007FAA" : "#212121"
          }}
        >
          <div style={{ display: "flex", width: "100%" }}>
            <div>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={age}
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>
            <ThemeProvider theme={darkTheme}>
              <div style={{ marginLeft: 40 }}>
                {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> */}
                <TextField
                  id="date"
                  fullWidth
                  type="date"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
              <div style={{ marginLeft: 40 }}>
                <TextField
                  id="date"
                  fullWidth
                  type="date"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
            </ThemeProvider>
            <div style={{ marginLeft: 10 }}>
              <Button
                color="primary"
                variant="contained"
                startIcon={<PrintIcon />}
              >
                Printer
              </Button>
            </div>
            <div style={{ display: "flex", marginLeft: 20 }}>
              <Typography style={{ marginTop: 10, color: "#fff" }}>
                sales
              </Typography>
              <Typography style={{ color: "#fff" }} variant="h4">
                (79.00)
              </Typography>
            </div>
          </div>
        </AppBar>
        <Paper>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <Typography variant="h6">{column.label}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    return (
                      <TableRow
                        hover
                        onContextMenu={event => {
                          handleClick(event, row);
                          setSelectedId(row.id);
                          setSelected(row);
                        }}
                        style={{ cursor: "context-menu" }}
                        onClick={() => {
                          setSelectedId(row.id);
                          setSelected(row);
                          console.log(row);
                        }}
                        selected={selectedId === row.id}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column, index) => {
                          const value = row[column.id];
                          const labelId = `enhanced-table-checkbox-${index}`;

                          if (column.id === "checkBox") {
                            return (
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={selectedId === row.id}
                                  inputProps={{
                                    "aria-labelledby": labelId
                                  }}
                                />
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Typography>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </Typography>
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <div style={{ width: "13%", padding: 2, marginTop: 10 }}>
        <Button
          onClick={() => history.push("/home/accounts")}
          variant="contained"
          color="secondary"
          style={{ width: "90%", height: 70 }}
        >
          <Typography>Close</Typography>
        </Button>

        <Button
          onClick={() => handleFindTicket()}
          variant="contained"
          color="default"
          style={{ width: "90%", height: 70, marginTop: 20 }}
        >
          <Typography>Find Ticket</Typography>
        </Button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: data => dispatch(data)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
