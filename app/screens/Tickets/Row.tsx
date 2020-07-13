import React = require("react");
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import PrintIcon from "@material-ui/icons/PrintOutlined";
import MoreIcon from "@material-ui/icons/More";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Modal } from "@material-ui/core";

const Currency = require("react-currency-formatter");

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

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Row(props) {
  const { row } = props;
  const classes = useRowStyles();
  const history = useHistory();

  const [openNewProduct, setopenNewProduct] = React.useState(false);

  React.useEffect(() => {
    // console.log(props.row);
  }, []);

  const CloseOpenProduct = () => {
    setopenNewProduct(false);
  };

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="print row"
            size="small"
            onClick={() => {
              var itemData = [];

              row.TicketList.list.map((list) => {
                props.dispatchEvent({
                  type: "RESTATECART",
                });

                setTimeout(() => {
                  props.dispatchEvent({
                    type: "ADDTOCART",

                    payload: {
                      items: {
                        id: list.productKey,
                        ItemName: list.ItemName,
                        productKey: list.productKey,
                        sallingprice: list.sallingprice,
                        initalPrice: list.initalPrice,
                        isTaxEnabled: list.isTaxEnabled,
                        quantity: 1,
                        amountInstore: 1,
                        qnt: 1,
                        isAddedToCart: false,
                        istaxed: "copy",
                      },
                    },
                  });
                });

                props.dispatchEvent({
                  type: "PRINTHISTORY",
                  invoiceNumber: row.InvoiceNumber,
                  user: row.User,
                  PaymentType: row.PaymentType,
                  Date: row.Date,
                  time: row.time,
                });
              }, 300);
              setTimeout(() => {
                history.push("/pos");
              }, 100);
            }}
          >
            <PrintIcon />
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.Date}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.InvoiceNumber}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Customer.name}
        </TableCell>
        <TableCell align="left">
          {row.TicketList.list.map((productRow, index) => (
            <div key={index}>{productRow.ItemName}</div>
          ))}
        </TableCell>
        <TableCell align="left">{row.PaymentType}</TableCell>
        <TableCell align="right">
          <Typography variant="h6">
            <Currency locale="en" quantity={row.RtxAmountPaid} symbol="K" />
          </Typography>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => {
            console.log(row);

            setopenNewProduct(true)
          }}>
            <MoreIcon />
          </IconButton>
        </TableCell>
      </StyledTableRow>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openNewProduct}
        className={classes.modal}
        onClose={CloseOpenProduct}
      >
        <div className={classes.paper}>
          <div style={{ display: '' }}>
            <div>
              <Typography style={{color:'#fff'}} variant='h6'>
                Day: {row.Day}
              </Typography>
            </div>
            <div>
              <Typography style={{color:'#fff'}} variant='h6'>
                Day: {row.time}
              </Typography>
            </div>
            <div>
              <Typography style={{color:'#fff'}} variant='h6'>
                Customer Name: {row.Customer.name}
              </Typography>
            </div>

            <div>
              <Typography style={{color:'#fff'}} variant='h6'>
                Customer Phone Number: {row.Customer.number}
              </Typography>
            </div>
          </div>
          <div>
            <div>
              <Typography style={{color:'#fff'}} variant='h6'>
                GrandTotal : <Currency locale="en" quantity={row.RtxGrandTotal} symbol="K" />
              </Typography>
            </div>
            <div>
              <Typography style={{color:'#fff'}} variant='h6'>
                Casher : {row.User}
              </Typography>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    SocketConn: state.SocketConn,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);
