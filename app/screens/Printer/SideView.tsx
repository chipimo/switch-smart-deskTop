import React = require("react");
import { connect } from "react-redux";

const PrinterSideView = (props) => {
  React.useEffect(() => {
    props.dispatchEvent({
      type: "CHANGEVIEW",
      view: "printer",
      title: "printer settings",
    });
  }, []);
  return <div></div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(PrinterSideView);
