import React = require("react");
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AddIcon from "@material-ui/icons/PersonAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import appDb from "../../redux/dataBase";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Fade } from "@material-ui/core";

import { Button, Checkbox, Form } from "semantic-ui-react";
// const PropTypes = require("prop-types");

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setmodalOpen] = React.useState(false);
  const [text, setText] = React.useState({ name: "", pin: "", dep: "" });
  const [state, setState] = React.useState("0");
  const classes = useRowStyles();

  const handleCloseAlert = () => {
    setmodalOpen(false);
  };

  const handleChange = (event) => {
    setText({ ...text, [event.target.name]: event.target.value });
  };

  const handleCheckChange = (e, { value }) => setState(value);

  const handleSubmit = () => {
    var data = {
      userName: text.name,
      pin: text.pin,
      department: text.dep,
      prevarges: state,
    };

    appDb.HandleNewUser(data,callback=>{

    })

    // console.log(data);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.dep_name}
        </TableCell>
        <TableCell align="right">{row.shopNo}</TableCell>
        <TableCell align="right">{row.road}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div style={{ display: "flex" }}>
                <Typography variant="h6" gutterBottom component="div">
                  {`Users - (${row.dep_name})`}
                </Typography>
                <IconButton
                  onClick={() => {
                    setmodalOpen(true);
                    setText({ ...text, dep: row.dep_name });
                  }}
                  style={{ marginTop: -6, marginLeft: 10 }}
                  aria-label="add"
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </div>

              <Table size="small" aria-label="users">
                <TableHead>
                  <TableRow>
                    <TableCell>Delete</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Prevarges</TableCell>
                    <TableCell align="right">id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.user.Users.map((usersRow) => (
                    <TableRow key={usersRow.id}>
                      <TableCell>
                        <IconButton
                          disabled={usersRow.prevarges === "1" ? true : false}
                          aria-label="delete"
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                      <TableCell>{usersRow.userName}</TableCell>
                      <TableCell component="th" scope="row">
                        {usersRow.prevarges === "1" ? "Admin" : "Worker"}
                      </TableCell>
                      <TableCell align="right">{usersRow.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        // onClose={handleCloseAlert}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Paper square elevation={10} style={{ padding: 20, width: 300 }}>
            <Form>
              <Form.Field>
                <label>User Name</label>
                <input
                  value={text.name}
                  onChange={handleChange}
                  name="name"
                  placeholder="User Name"
                />
              </Form.Field>
              <Form.Field>
                <label>Pin</label>
                <input
                  type="password"
                  value={text.pin}
                  onChange={handleChange}
                  name="pin"
                  placeholder="PIN"
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  onChange={handleCheckChange}
                  label="Is Adminstrator"
                  value="1"
                  name="isAdmin"
                  checked={state === "1"}
                />
                <Checkbox
                  style={{ marginLeft: 10 }}
                  onChange={handleCheckChange}
                  label="Is User"
                  name="isAdmin"
                  value="0"
                  checked={state === "0"}
                />
              </Form.Field>
              <Button onClick={() => handleSubmit()}>Submit</Button>
              <Button onClick={() => handleCloseAlert()}>Cancel</Button>
            </Form>
          </Paper>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}

const Users = (props) => {
  const [depList, setDepList] = React.useState({ data: [] });

  React.useEffect(() => {
    appDb.HandleDepartments({ type: "getAll" }, (callback) => {
      setDepList({ ...depList, data: callback.departments });
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Deparment Name</TableCell>
            <TableCell align="right">ShopNo</TableCell>
            <TableCell align="right">Road</TableCell>
            <TableCell align="right">Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {depList.data.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state) => ({
  Customers: state.Customers,
  Transactions: state.Transactions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
