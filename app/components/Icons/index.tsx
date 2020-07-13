import React = require("react");
import { connect } from "react-redux";

const index = (props) => {
    const Tempicon = props.iconType
    const icon = Tempicon.toLowerCase()
switch (icon) {
    case "value":
        
        break;

    default:
        break;
}
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
