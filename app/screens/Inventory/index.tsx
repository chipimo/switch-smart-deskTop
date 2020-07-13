import React = require("react");
import { connect } from "react-redux";
import PaneRender from "./PaneRender";

export const index = () => {
  return (
    <div style={{ marginTop: 10 }}>
      <PaneRender />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
