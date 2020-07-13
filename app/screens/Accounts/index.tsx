const React = require("react");
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Typography, AppBar, Button, Menu } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";

const columns = [
  { id: "name", label: "Account Name", minWidth: 170 },
  {
    id: "population",
    label: "Debit",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "size",
    label: "Credit",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "density",
    label: "Balance",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [];

const initialState = {
  mouseX: null,
  mouseY: null,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    maxHeight: 380,
  },
  table: {
    width: "100%",
  },
});

const index = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [state, setState] = React.useState(initialState);
  const [selectedId, setSelectedId] = React.useState();
  const [selected, setSelected] = React.useState();

  const history = useHistory();

  const handleClose = () => {
    setState(initialState);
  };

  const handleClick = (event, data) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <div>
        <AppBar
          elevation={0}
          position="static"
          color="default"
          style={{
            padding: 15,
            borderRadius: 5,
            textAlign: "center",
            marginBottom: 10,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#ccc",
          }}
        >
          <Typography variant="h5">General</Typography>
        </AppBar>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "87%" }}>
          <Paper
            elevation={0}
            className={classes.table}
            style={{
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
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
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          onContextMenu={(event) => {
                            handleClick(event, row);
                            setSelectedId(row.code);
                            setSelected(row);
                          }}
                          style={{ cursor: "context-menu" }}
                          onClick={() => {
                            setSelectedId(row.code);
                            setSelected(row);
                            console.log(row);
                          }}
                          selected={selectedId === row.code}
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Typography>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </Typography>
                              </TableCell>
                            );
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
        <div style={{ width: "13%", padding: 3 }}>
          <Button
            onClick={() => history.push("/accounts_details")}
            variant="outlined"
            style={{ width: "100%" }}
          >
            <Typography>Account details</Typography>
          </Button>
          <div style={{ marginTop: 20 }} />
          <Button variant="outlined" style={{ width: "100%" }}>
            <Typography>Print</Typography>
          </Button>
        </div>
      </div>
      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={() => {
            // handleOpenTicket();
            handleClose();
            history.push("/home/accounts_details");
          }}
        >
          Account Details
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
