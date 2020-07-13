import React = require("react");
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Icon } from "semantic-ui-react";
import SideList from "../Products/SideList";
import ProductList from "../Products/List";
import InvSideView from "../Inventory/InvSideView";
import Price_List_Editor from "../Products/Price_List_Editor";
import Product_Groups from "../Products/Product_Groups";
import Tax_Template from "../Products/Tax_Template";
import Inventory from "../Inventory";
import EndOfDayRecords from "../Inventory/EndOfDayRecords";
import AccountsSideList from "../Accounts/LeftSide";
import Users from "../Users";
import UsersSideList from "../Users/UsersSideList";
import InvReduction from "../Inventory/InvReduction";
import PrinterSetting from "../Printer";
import PrinterSideView from "../Printer/SideView";
import BackUpSideView from "../BackUp/SideView";
import BackUpSettings from "../BackUp";

const SideSwitchView = (props) => {
  switch (props.view) {
    case "products":
      return <SideList />;
      break;
    case "inventory":
      return <InvSideView />;
      break;
    case "accounts":
      return <AccountsSideList />;
      break;
    case "users":
      return <UsersSideList />;
      break;
    case "printer":
      return <PrinterSideView />;
      break;
    case "backup":
      return <BackUpSideView />;
      break;

    default:
      return null;
      break;
  }
};

const MainSwitchView = (props) => {
  switch (props.view) {
    case "product_list":
      return <ProductList />;
      break;
    case "Price_List_Editor":
      return <Price_List_Editor />;
      break;
    case "Product_Groups":
      return <Product_Groups />;
      break;
    case "Tax_Template":
      return <Tax_Template />;
      break;
    case "inventory_list":
      return <Inventory />;
    case "inventory_reduction":
      return <InvReduction />;
      break;
    case "end_of_day_records":
      return <EndOfDayRecords />;
      break;
    case "users_list":
      return <Users />;
      break;
    case "printer":
      return <PrinterSetting />;
      break;
    case "backup":
      return <BackUpSettings />;
      break;

    default:
      return null;
      break;
  }
};

const index = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(10);
  const [view, setView] = React.useState("");

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 0) {
      setView("products");
    } else if (index === 1) {
      setView("inventory");
    } else if (index === 2) {
      setView("accounts");
    } else if (index === 3) {
      setView("users");
    } else if (index === 4) {
      setView("printer");
    } else if (index === 5) {
      setView("backup");
    }
  };

  return (
    <div
      style={{
        width: "99.5%",
        height: "85vh",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "15%",
          borderWidth: 1,
          borderColor: props.Theme.theme === "light" ? "#929292" : "#CECECE",
          borderStyle: "solid",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: 5,
          }}
        >
          <Typography>{props.SettingViews.title}</Typography>
        </div>
        <Divider />
        <div style={{ height: "45vh" }}>
          <SideSwitchView view={view} />
        </div>
        <div>
          <List component="nav" aria-label="main mailbox folders">
            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 0
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="box"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 0
                        ? "#F78A09"
                        : "#040302"
                      : "#fff",
                }}
                primary="Products"
              />
            </ListItem>
            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 1
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="clone"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 1
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Inventory"
              />
            </ListItem>
            {/* <Divider />

            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 2
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="settings"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 2
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Settings"
              />
            </ListItem> */}
            <Divider />

            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 3
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="users"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 3
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Users"
              />
            </ListItem>

            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 4
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="print"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 4
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Printer"
              />
            </ListItem>
            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 5
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="sync"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 5
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="BackUp"
              />
            </ListItem>

            <Divider />
          </List>
        </div>
      </div>
      <div
        style={{
          width: "84.5%",
          borderWidth: 1,
          borderColor: props.Theme.theme === "light" ? "#929292" : "#CECECE",
          borderStyle: "solid",
        }}
      >
        <MainSwitchView view={props.SettingViews.view} />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    SettingViews: state.SettingViews,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
