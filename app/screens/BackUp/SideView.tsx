import React = require("react");
import { connect } from "react-redux";

const BackUpSideView = (props) => {
  React.useEffect(() => {
    props.dispatchEvent({
      type: "CHANGEVIEW",
      view: "backup",
      title: "BackUp settings",
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

export default connect(mapStateToProps, mapDispatchToProps)(BackUpSideView);
