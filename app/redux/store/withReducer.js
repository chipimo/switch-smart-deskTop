import React from "react";
import { injectReducer } from "../../redux/store";

const withReducer = (key, reducer) => WrappedComponent =>
  class extends React.PureComponent {
    constructor(props) {
      super(props);
      injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withReducer;
