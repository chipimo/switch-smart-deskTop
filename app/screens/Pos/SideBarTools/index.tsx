import React = require("react");
import { connect } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TicketNote from "../TicketNote";
import Repair from "../Repair";
import Customers from "../../Customers";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 650,
  },
  bottom: {
    width: "auto",
    height: 680,
  },
  bottom2: {
    width: "auto",
    height: 680,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const index = (props) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    bottom2: false,
    bottom3: false,
    right: false,
  });

  const [open, setOpen] = React.useState(false);
  const [openRepair, setOpenRepair] = React.useState(false);

  React.useEffect(() => {
    if (props.Model.toClose === "repair") handleCloseRepair();
  });

  const handleOpenRepair = () => {
    setOpenRepair(true);
  };

  const handleCloseRepair = () => {
    setOpenRepair(false);
    if (props.Model.toClose === "repair")
      props.dispatchEvent({ type: "HANDELCLEAR" });
    
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  return (
    <div>
      <Button
        onClick={toggleDrawer("left", true)}
        style={{
          width: "100%",
        }}
        variant="contained"
        color="primary"
      >
        <Typography>Select Customer</Typography>
      </Button>
      <Button
        onClick={handleOpen}
        style={{
          width: "100%",
          marginTop: 10,
        }}
        variant="contained"
        color="primary"
      >
        <Typography>Ticket Note</Typography>
      </Button>

      <Button
        onClick={handleOpenRepair}
        style={{
          width: "100%",
          marginTop: 10,
        }}
        variant="contained"
        color="secondary"
      >
        <Typography>Repare Ticket</Typography>
      </Button>

      {/* Slide views */}

      {/* Customres */}
      <div>
        <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
          <div className={classes.list}><Customers /> </div>
        </Drawer>
      </div>

      {/* Ticket note */}
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          className={classes.modal}
          onClose={handleClose}
        >
          <TicketNote />
        </Modal>
      </div>

      {/* Repair */}
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openRepair}
          className={classes.modal}
          // onClose={handleCloseRepair}
        >
          <Repair />
        </Modal>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    SocketConn: state.SocketConn,
    Model: state.Model,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
