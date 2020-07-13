import React = require("react");
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";
import RideSideMenu from "./RideSideMenu";

const index = (props) => {
  const [panes, setPanes] = React.useState({ screens: [] });

  React.useEffect(() => {
    var tempArr = [];
    tempArr.push(
      {
        menuItem: {
          key: "inventory",
          icon: "box",
          content: "New Entery Reports",
        },
        render: () => (
          <Tab.Pane>
            <RideSideMenu />
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: "stocktaking",
          icon: "book",
          content: "Stock Taking Reports",
        },
        render: () => <Tab.Pane>stock</Tab.Pane>,
      }
    );
    setPanes({ ...panes, screens: tempArr });
  }, []);

  return (
    <div style={{ width: 830, height: "70vh" }}>
      <Tab panes={panes.screens} />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
