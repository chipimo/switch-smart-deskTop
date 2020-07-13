import React = require("react");
import { connect } from "react-redux";

import MaterialTable from "material-table";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Button, Modal } from "@material-ui/core";
import appDb from "../../redux/dataBase";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox />),
  Check: forwardRef((props, ref) => <Check />),
  Clear: forwardRef((props, ref) => <Clear />),
  Delete: forwardRef((props, ref) => <DeleteOutline />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight />),
  Edit: forwardRef((props, ref) => <Edit />),
  Export: forwardRef((props, ref) => <SaveAlt />),
  Filter: forwardRef((props, ref) => <FilterList />),
  FirstPage: forwardRef((props, ref) => <FirstPage />),
  LastPage: forwardRef((props, ref) => <LastPage />),
  NextPage: forwardRef((props, ref) => <ChevronRight />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft />),
  ResetSearch: forwardRef((props, ref) => <Clear />),
  Search: forwardRef((props, ref) => <Search />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn />),
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "Product" },
  { id: "group", numeric: false, disablePadding: false, label: "Group" },
  { id: "recipes", numeric: false, disablePadding: false, label: "Recipes" },
  { id: "quantity", numeric: true, disablePadding: false, label: "Quantity" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all products" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="h6">{headCell.label}</Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar className={numSelected > 0 ? classes.highlight : null}>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products List
        </Typography>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 900,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3),
  },
}));

const Inventory = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Product Name ",
        field: "ItemName",
      },
      {
        title: "Group",
        field: "group",
      },
      {
        title: "In Store",
        field: "amountInstore",
      },
    ],
    data: [],
  });
  const [purchase, setPurchase] = React.useState({
    data: [],
  });
  const [openPurchase, setopenPurchase] = React.useState(false);
  const [IsSelected, setIsSelected] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [purchaseSelected, setpurchaseSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loadOnce, setLoadOnce] = React.useState(true);

  const handleOpenPurchase = () => {
    setopenPurchase(true);
  };

  const handlePurchase = () => {
    var data = {
      _type: "add_to_store",
      purchaseSelected,
      dep: props.Dep.dep,
    };

    appDb.HandelProducts(data, (reciveCallback) => {
      props.dispatchEvent({
        type: "SHOWNOTIFICATION",
        message: `Successfully Purchased ${
          reciveCallback.data.number === 1
            ? reciveCallback.data.name
            : reciveCallback.data.number + " Products"
        } `,
        vertical: "bottom",
        horizontal: "right",
        variant: "success",
      });

      setSelected([]);
    });
  };

  const CloseOpenPurchase = () => {
    setopenPurchase(false);
  };

  const HandleQutChange = (value, data, index) => {
    const selectedIndex = purchaseSelected.indexOf(data);
    purchaseSelected[selectedIndex].quantity = parseInt(value);

    setpurchaseSelected(purchaseSelected);
  };

  React.useEffect(() => {
    if (loadOnce) {
      props.dispatchEvent({ type: "LOADTABEL" });
      setLoadOnce(false);
    }

    if (props.LoadTabel.load) {
      LoadData();
      props.dispatchEvent({ type: "CLEARLOADTABEL" });
    }
  }, [props]);

  const LoadData = () => {
    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "all_purcheased" },
      (receiveCallback) => {
        setTimeout(() => {
          setState({ ...state, data: receiveCallback });
        }, 100);
      }
    );
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = purchase.data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, data) => {
    const selectedIndex = selected.indexOf(data.name);
    let purchesSelected = [];
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, data.name);
      purchesSelected = purchesSelected.concat(purchaseSelected, data);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      purchesSelected = purchesSelected.concat(purchaseSelected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      purchesSelected = purchesSelected.concat(purchaseSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      purchesSelected = purchesSelected.concat(
        purchaseSelected.slice(0, selectedIndex),
        purchaseSelected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    setpurchaseSelected(purchesSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, purchase.data.length - page * rowsPerPage);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          width: "100%",
          height: "68vh",
          overflow: "auto",
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        <MaterialTable
          icons={tableIcons}
          title="Inventory List "
          columns={state.columns}
          data={state.data}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    Dep: state.Dep,
    LoadTabel: state.LoadTabel,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
