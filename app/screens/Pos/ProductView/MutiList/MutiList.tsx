import React = require("react");
import { connect } from "react-redux";
import { Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
const Currency = require("react-currency-formatter");

const uuidv4 = require("uuid/v4");

function CreatId() {
  return uuidv4();
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    paddingBottom: 10,
  },
  gridList: {
    width: "100%",
    height: 350,
  },
}));

const MutiList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={110} className={classes.gridList} cols={3}>
        {props.multi.map((prices, index) => {
          if (prices.isInstore)
            return (
              <GridListTile key={index} cols={1}>
                <Button
                  variant="contained"
                  disabled={prices.amountInstore === 0 ? true : false}
                  onClick={() => {
                    // console.log(props.multi);
                    var itemData = {
                      ItemName: prices.productName,
                      productKey: CreatId(),
                      id: prices.id,
                      sallingprice: prices.sallingprice,
                      initalPrice: prices.sallingprice,
                      quantity: 1,
                      amountInstore: prices.amountInstore,
                      qnt: prices.qnt,
                      isMulity: true,
                      isAddedToCart: false,
                      istaxed: "yes",
                      isTaxEnabled: prices.isTaxEnabled,
                    };

                    props.dispatchEvent({
                      type: "ADDTOCART",
                      payload: {
                        items: itemData,
                      },
                    });

                    props.dispatchEvent({
                      type: "HANDELCLOSE",
                      toClose: "mulit",
                    });
                  }}
                  style={{
                    height: 100,
                    width: "15vw",
                    cursor: "pointer",
                    color: prices.amountInstore === 0 ? "#6E6E6E" : "#fff",
                    backgroundColor:
                      props.Theme.theme === "light" ? "#E0E1E3" : "#212121",
                    margin: 7,
                    textAlign: "center",
                    justifyContent: "center",
                    paddingTop: 10,
                  }}
                >
                  <div style={{ display: "block" }}>
                    <Typography variant="h5">
                      <Currency
                        locale="en"
                        quantity={prices.sallingprice}
                        symbol="K "
                      />
                    </Typography>
                    {prices.amountInstore === 0 ? (
                      <Typography variant="caption">Out of stock</Typography>
                    ) : null}
                  </div>
                </Button>
              </GridListTile>
            );
        })}
      </GridList>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MutiList);
