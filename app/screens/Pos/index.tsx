import React = require("react");
import { connect } from "react-redux";
import {  Paper, AppBar } from "@material-ui/core";
import SideBarTools from "./SideBarTools";
import TicketView from "./TicketView";
import ProductView from "./ProductView";

export const index = props => {
  return (
    <div
      style={{
        width: "100vw",
        height: "88vh",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <div
        style={{
          width: "8%",
          paddingTop: 20,
          backgroundColor:
            props.Theme.theme === "light" ? "#EEEEEE" : "#212121",
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "transparent",
          borderRightColor: props.Theme.theme === "light" ? "#ccc" : "#2C2C2C"
        }}
      >
        <SideBarTools />
      </div>
      <div
        style={{
          width: "35%",
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "transparent",
          borderRightColor: props.Theme.theme === "light" ? "#ccc" : "#2C2C2C",
          borderLeftColor: props.Theme.theme === "light" ? "#ccc" : "#2C2C2C"
        }}
      >
        <Paper
          square
          elevation={20}
          style={{
            height: "87vh"
          }}
        >
          <AppBar elevation={0} position="static" color="default">
            <TicketView />
          </AppBar>
        </Paper>
      </div>
      <div
        style={{
          width: "56%",
          backgroundColor: props.Theme.theme === "light" ? "#EEEEEE" : "#212121",
        }}
      >
        <ProductView />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    SocketConn: state.SocketConn
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: data => dispatch(data)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
