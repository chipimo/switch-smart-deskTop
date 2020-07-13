import React = require("react");
import ReactDataGrid from "react-data-grid";
import createRowData from "./createRowData";
import { Data } from "react-data-grid-addons";


const defaultColumnProperties = {
  width: 160,
};

const columns = [
  {
    key: "id",
    name: "ID",
  },
  {
    key: "firstName",
    name: "First Name",
  },
  {
    key: "lastName",
    name: "Last Name",
  },
  {
    key: "jobTitle",
    name: "Job Title",
  },
  {
    key: "jobArea",
    name: "Job Area",
  },
  {
    key: "jobType",
    name: "Job Type",
  },
  {
    key: "email",
    name: "Email",
  },
  {
    key: "street",
    name: "Street",
  },
  {
    key: "zipCode",
    name: "ZipCode",
  },
  {
    key: "date",
    name: "Date",
  },
  {
    key: "catchPhrase",
    name: "Catch Phrase",
  },
].map((c) => ({ ...c, ...defaultColumnProperties }));

const ROW_COUNT = 50;

const groupBy = ["jobType"];

const getSubRowDetails = (expandedRows) => (rowItem) => {
  const isExpanded = expandedRows[rowItem.id]
    ? expandedRows[rowItem.id]
    : false;
  return {
    group: rowItem.teamMembers && rowItem.teamMembers.length > 0,
    expanded: isExpanded,
    children: rowItem.teamMembers,
    field: "firstName",
    treeDepth: rowItem.treeDepth || 0,
    siblingIndex: rowItem.siblingIndex,
    numberSiblings: rowItem.numberSiblings,
  };
};

function updateSubRowDetails(subRows, parentTreeDepth) {
  const treeDepth = parentTreeDepth || 0;
  subRows.forEach((sr, i) => {
    sr.treeDepth = treeDepth + 1;
    sr.siblingIndex = i;
    sr.numberSiblings = subRows.length;
  });
}

const onCellExpand = (args) => ({ rows, expandedRows }) => {
  const rowKey = args.rowData.id;
  const rowIndex = rows.indexOf(args.rowData);
  const subRows = args.expandArgs.children;
  if (expandedRows && !expandedRows[rowKey]) {
    expandedRows[rowKey] = true;
    updateSubRowDetails(subRows, args.rowData.treeDepth);
    rows.splice(rowIndex + 1, 0, ...subRows);
  } else if (expandedRows[rowKey]) {
    expandedRows[rowKey] = false;
    rows.splice(rowIndex + 1, subRows.length);
  }
  return { expandedRows, rows };
};

const DataTable = () => {
  const [state, setState] = React.useState({
    expandedRows: {},
    rows: createRowData(ROW_COUNT),
  });
  const visibleRows = Data.Selectors.getRows(state);
  return (
    <div>
      <ReactDataGrid
        columns={columns}
        rowGetter={(i) => visibleRows[i]}
        rowsCount={visibleRows.length}
        minHeight={550}
        getSubRowDetails={getSubRowDetails(state.expandedRows)}
        onCellExpand={(args) => setState(onCellExpand(args))}
      />
    </div>
  );
};

export default DataTable;
