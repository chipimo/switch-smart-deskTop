import React = require("react");
import { connect } from "react-redux";
import { Label, Menu, Tab } from "semantic-ui-react";
import { Button } from "@material-ui/core";
import DepTable from "./DepTable";
import Users from "./Users";
import Dep_Notifications from "./Dep_Notifications";

const DepartmentView = props => {
  const panes = [
    {
      menuItem: { key: "department", icon: "sitemap", content: "Departments" },
      render: () => (
        <Tab.Pane>
          <DepTable />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: "users", icon: "users", content: "Users" },
      render: () => (
        <Tab.Pane>
          <Users />
        </Tab.Pane>
      )
    }
    // {
    //   menuItem: (
    //     <Menu.Item key="messages">
    //       Notifications<Label>15</Label>
    //     </Menu.Item>
    //   ),
    //   render: () => (
    //     <Tab.Pane>
    //       <Dep_Notifications />
    //     </Tab.Pane>
    //   )
    // }
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: "85vh",
        backgroundColor:
          props.Theme.theme === "light" ? "#E5E5E5" : "transparent"
      }}
    >
      <div
        style={{
          width: "100%",
          padding: 10
        }}
      >
        <Tab panes={panes} />
      </div>
     
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: data => dispatch(data)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentView);
