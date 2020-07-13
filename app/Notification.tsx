import React = require("react");
import { connect } from "react-redux";
import ReactAudioPlayer from "react-audio-player";

const Notification = (props) => {
  return (
    <div>
      <ReactAudioPlayer src={'./assets/audios/long-expected.mp3'} />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
