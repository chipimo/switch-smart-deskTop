import React = require("react");
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

// let audio = new Audio("../../assets/audios/insight.mp3");

const AlertUi = props => {
  return <div></div>;
};

const Notifications = props => {
  React.useEffect(() => {
    if (props.StackNotify) {
      if (props.StackNotify.open) {
        // audio.play();
        
        const message = props.StackNotify.message;
        props.enqueueSnackbar(message, {
          anchorOrigin: {
            vertical: props.StackNotify.vertical,
            horizontal: props.StackNotify.horizontal
          },
          variant: props.StackNotify.variant
          //   content={(key, message) => (
          //     <MyCustomChildren id={key} message={message} />
          // )}
        });
        props.dispatchEvent({ type: "DISMISS" });
      }
    }
  }, [props]);

  return <div />;
};

const mapStateToProps = state => {
  return {
    StackNotify: state.StackNotify
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: data => dispatch(data)
  };
};

export default withSnackbar(
  connect(mapStateToProps, mapDispatchToProps)(Notifications)
);