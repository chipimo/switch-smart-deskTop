import React = require("react");
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function index(props) {
  const [isSet, setIsste] = React.useState(false);
  const [note, setNote] = React.useState({ note: "" });
  const classes = useStyles();

  React.useEffect(() => {
    if (props.Cart.isItemInCart) {
      setIsste(true);
    }
  }, [props]);

  const handleChangePrice = (prop) => (event) => {
    setNote({ ...note, [prop]: event.target.value });
  };

  return (
    <div className={classes.paper}>
      {isSet ? null : <div>No Ticket to add note</div>}
      <TextField
        id="outlined-multiline-static"
        label="Ticket note"
        multiline
        fullWidth
        value={note.note}
        onChange={handleChangePrice("note")}
        variant="outlined"
      />
      <div style={{ display: "flex", marginTop: 30 }}>
        <Button
          onClick={() => {
            props.dispatchEvent({ type: "SetNote", note });
            setNote({ ...note, note: "" });
          }}
          disabled={isSet ? false : true}
          variant="contained"
          color="secondary"
        >
          Add Note
        </Button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    Cart: state.Cart,
    TicketNote: state.TicketNote,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
