import React = require("react");
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

export const index = (props) => {
  return (
    <div style={{ width: "100%", height: "84vh" }}>
      <Button
        variant="text"
        style={{
          width: "100%",
          height: 70,
          backgroundColor: "#1DA261",
          color: "#fff"
        }}
      >
        soup sole
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
