import React = require("react");
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import appDb from "../../redux/dataBase";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const Dep_Notifications = (props) => {
  const classes = useStyles();
  const [SetList, setSetList] = React.useState([]);

  React.useEffect(() => {
    appDb.HandleInventoryTransfer((callback) => {
      console.log(callback.department);
      setSetList(callback.department);
    });
  }, [props]);

  return (
    <Paper style={{ height: "70vh" }}>
      <List dense>
        {SetList.map((list, index) => {
          if (list.state !== "sent") {
            if (list.isCleared !== 1) {
              return (
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={list.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          Stock transfer
                        </Typography>
                        {`this stock is sent from ${list.department}`}
                      </React.Fragment>
                    }
                  />
                  <Divider variant="inset" component="li" />
                </ListItem>
              );
            }
          }
        })}
      </List>
    </Paper>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dep_Notifications);
