import React = require("react");
import { connect } from "react-redux";
import { Typography, Paper, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { socketStream, restoreDB } from "../../backupFunc";
import { Icon } from "semantic-ui-react";
import Backup from "../../redux/dataBase/updater";

const dirTree = require("directory-tree");
let List = [];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const index = (props) => {
  const [FiLeist, setList] = React.useState({ data: [] });
  const [Backedup, setBackedup] = React.useState(true);

  React.useEffect(() => {
    const filteredTree = dirTree("C:/Switch-Smart/backups", {
      extensions: /\.tar/,
    });
     
    if (filteredTree) setList({ ...FiLeist, data: filteredTree.children });
  }, []);

  return (
    <div style={{ padding: 15 }}>
      <div>
        <Typography>MANUAL BACKUPS & DATA EXPORTS</Typography>
      </div>
      <div style={{ marginTop: 10 }}>
        <TableContainer style={{ height: "76vh" }} component={Paper}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography style={{ marginTop: 5, marginBottom: 5 }}>
              back-up list
            </Typography>

            {Backedup ? null : (
              <Typography style={{ marginTop: 5, marginBottom: 5 }}>
                Backing up please wait...
              </Typography>
            )}

            <Button
              onClick={() => {
                setBackedup(false);

                socketStream((BackupCallback) => {
                  setBackedup(true);
                  const filteredTree = dirTree("C:/Switch-Smart/backups", {
                    extensions: /\.tar/,
                  });
                  setList({ ...FiLeist, data: filteredTree.children });
                });
              }}
              disabled={Backedup ? false : true}
              variant="contained"
              color="primary"
            >
              Create backup
            </Button>
          </div>
          <Table stickyHeader size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Size</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {FiLeist.data.map((list, index) => {
                return (
                  <StyledTableRow key={index}>
                    <TableCell align="left">
                      <Typography>{list.name} </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography>{list.size} </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        startIcon={<Icon size="small" name="refresh" />}
                        variant="contained"
                        size="small"
                        onClick={() => {
                          setBackedup(false);

                          restoreDB({ backup_file: list.name }, (callback) => {
                            setBackedup(true);
                          });
                        }}
                      >
                        Restore Backup
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                      >
                        Delete Backup
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
