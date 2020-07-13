import React = require("react");
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const NumberFormat = require("react-number-format");

const uuidv4 = require("uuid/v4");

function CreatId() {
  return uuidv4();
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="K"
    />
  );
}

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

const index = (props) => {
  const [values, setValues] = React.useState({
    ticketNote: "",
    amount: "",
  });
  const [errors, setErrors] = React.useState({
    ticketNote: "",
    amount: "",
  });
  const classes = useStyles();

  const handleChangePrice = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop === "amount") setErrors({ ...errors, amount: "" });
  };

  const sendTranstion = () => {
    if (values.amount === "") {
      setErrors({ ...errors, amount: "Amount charged is required" });
    } else if (values.ticketNote === "") {
      setErrors({ ...errors, ticketNote: "Transaction note is required" });
    } else {
      var itemData = {
        id: CreatId(),
        ItemName: values.ticketNote,
        productKey: CreatId(),
        sallingprice: values.amount,
        initalPrice: values.amount,
        isTaxEnabled: false,
        quantity: 1,
        amountInstore: 1,
        qnt: 1,
        isAddedToCart: false,
        istaxed: "no",
      };

      props.dispatchEvent({
        type: "ADDTOCART",
        payload: {
          items: itemData,
        },
      });
    }
  };

  return (
    <div className={classes.paper}>
      <div style={{ marginBottom: 10 }}>
        <Typography variant="h5" style={{ color: "#AAAAAA" }}>
          Repair
        </Typography>
      </div>
      <div style={{ height: 170, paddingTop: 10, overflow: "auto" }}>
        <TextField
          id="ticket note"
          name="ticketNote"
          label="Ticket note"
          value={values.ticketNote}
          onChange={handleChangePrice("ticketNote")}
          error={errors.ticketNote === "" ? false : true}
          multiline
          fullWidth
          variant="outlined"
          helperText={errors.ticketNote}
        />
        <div style={{ marginTop: 10 }} />
        <TextField
          label="Repair Charge"
          value={values.amount}
          onChange={handleChangePrice("amount")}
          error={errors.amount === "" ? false : true}
          variant="outlined"
          required
          fullWidth
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          helperText={errors.amount}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <div>
          <Button onClick={sendTranstion} variant="contained" color="primary">
            Add To Ticket
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            variant="contained"
            color="primary"
            onClick={() => {
              props.dispatchEvent({ type: "HANDELCLOSE", toClose: "repair" });
            }}
          >
            done
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              props.dispatchEvent({ type: "HANDELCLOSE", toClose: "repair" });
            }}
            style={{ marginLeft: 10 }}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Cart: state.Cart,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
