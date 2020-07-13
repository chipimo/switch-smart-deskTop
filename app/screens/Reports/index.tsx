import React = require("react");
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import Sales from "./Sales";
import Inventory from "./Inventory";
import Cost from "./Cost";
import Purchases from "./Purchases";
import RB from "./RB";
import WorkPeriod from "./WorkPeriod";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "84vh",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 170,
  },
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const index = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [selected, setSelected] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelected(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs "
        className={classes.tabs}
      >
        <Tab
          label="Work Period Report"
          {...a11yProps(0)}
          style={{
            backgroundColor: selected === 0 ? "#0A56D9" : "transparent",
            color:
              selected === 0
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        {/* <Tab
          label="Item Sales Report"
          {...a11yProps(1)}
          style={{
            backgroundColor: selected === 1 ? "#0A56D9" : "transparent",
            color:
              selected === 1
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        /> */}
        {/* <Tab
          label="Inventory Transaction"
          {...a11yProps(2)}
          style={{
            backgroundColor: selected === 2 ? "#0A56D9" : "transparent",
            color:
              selected === 2
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        /> */}
        {/* <Tab
          label="Cost Report"
          {...a11yProps(3)}
          style={{
            backgroundColor: selected === 3 ? "#0A56D9" : "transparent",
            color:
              selected === 3
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        /> */}
        <Tab
          label="Inventory Report"
          {...a11yProps(1)}
          style={{
            backgroundColor: selected === 1 ? "#0A56D9" : "transparent",
            color:
              selected === 1
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        <Tab
          label="RB Report"
          {...a11yProps(2)}
          style={{
            backgroundColor: selected === 2 ? "#0A56D9" : "transparent",
            color:
              selected === 2
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <WorkPeriod />
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        <Sales />
      </TabPanel> */}
      <TabPanel value={value} index={1}>
        <Inventory />
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <Purchases />
      </TabPanel> */}
      {/* <TabPanel value={value} index={2}>
      </TabPanel> */}
      <TabPanel value={value} index={2}>
        <RB />
      </TabPanel>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    SalesReports: state.SalesReports,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
