"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var material_table_1 = require("material-table");
var react_1 = require("react");
var AddBox_1 = require("@material-ui/icons/AddBox");
var ArrowDownward_1 = require("@material-ui/icons/ArrowDownward");
var Check_1 = require("@material-ui/icons/Check");
var ChevronLeft_1 = require("@material-ui/icons/ChevronLeft");
var ChevronRight_1 = require("@material-ui/icons/ChevronRight");
var Clear_1 = require("@material-ui/icons/Clear");
var DeleteOutline_1 = require("@material-ui/icons/DeleteOutline");
var Edit_1 = require("@material-ui/icons/Edit");
var FilterList_1 = require("@material-ui/icons/FilterList");
var FirstPage_1 = require("@material-ui/icons/FirstPage");
var LastPage_1 = require("@material-ui/icons/LastPage");
var Remove_1 = require("@material-ui/icons/Remove");
var SaveAlt_1 = require("@material-ui/icons/SaveAlt");
var Search_1 = require("@material-ui/icons/Search");
var ViewColumn_1 = require("@material-ui/icons/ViewColumn");
var dataBase_1 = require("../../redux/dataBase");
var tableIcons = {
    Add: react_1.forwardRef(function (props, ref) { return React.createElement(AddBox_1.default, null); }),
    Check: react_1.forwardRef(function (props, ref) { return React.createElement(Check_1.default, null); }),
    Clear: react_1.forwardRef(function (props, ref) { return React.createElement(Clear_1.default, null); }),
    Delete: react_1.forwardRef(function (props, ref) { return React.createElement(DeleteOutline_1.default, null); }),
    DetailPanel: react_1.forwardRef(function (props, ref) { return React.createElement(ChevronRight_1.default, null); }),
    Edit: react_1.forwardRef(function (props, ref) { return React.createElement(Edit_1.default, null); }),
    Export: react_1.forwardRef(function (props, ref) { return React.createElement(SaveAlt_1.default, null); }),
    Filter: react_1.forwardRef(function (props, ref) { return React.createElement(FilterList_1.default, null); }),
    FirstPage: react_1.forwardRef(function (props, ref) { return React.createElement(FirstPage_1.default, null); }),
    LastPage: react_1.forwardRef(function (props, ref) { return React.createElement(LastPage_1.default, null); }),
    NextPage: react_1.forwardRef(function (props, ref) { return React.createElement(ChevronRight_1.default, null); }),
    PreviousPage: react_1.forwardRef(function (props, ref) { return React.createElement(ChevronLeft_1.default, null); }),
    ResetSearch: react_1.forwardRef(function (props, ref) { return React.createElement(Clear_1.default, null); }),
    Search: react_1.forwardRef(function (props, ref) { return React.createElement(Search_1.default, null); }),
    SortArrow: react_1.forwardRef(function (props, ref) { return React.createElement(ArrowDownward_1.default, null); }),
    ThirdStateCheck: react_1.forwardRef(function (props, ref) { return React.createElement(Remove_1.default, null); }),
    ViewColumn: react_1.forwardRef(function (props, ref) { return React.createElement(ViewColumn_1.default, null); }),
};
var DepTable = function (props) {
    var _a = React.useState({
        columns: [
            { title: "Deparment Name", field: "dep_name" },
            { title: "Number", field: "phone" },
            { title: "ShopNo", field: "shopNo" },
            { title: "Road", field: "road" },
            { title: "TPIN", field: "tpin" },
            { title: "Tax Type", field: "taxType" },
            { title: "Tax Rate", field: "taxRat" },
        ],
        data: [],
    }), state = _a[0], setState = _a[1];
    React.useEffect(function () {
        dataBase_1.default.HandleDepartments({ type: "getAll" }, function (callback) {
            setState(__assign({}, state, { data: callback.departments }));
        });
    }, []);
    return (React.createElement("div", { style: { height: "70vh", overflow: "auto" } },
        React.createElement(material_table_1.default, { icons: tableIcons, title: "All Departments", columns: state.columns, data: state.data, editable: {
                onRowAdd: function (newData) {
                    return new Promise(function (resolve) {
                        if (!newData.dep_name) {
                            alert("Department Name Must Not Be Empty");
                            return resolve();
                        }
                        dataBase_1.default.HandleDepartments({
                            type: "create",
                            data: {
                                department: newData.dep_name,
                                id: "auto",
                                phone: newData.phone,
                                shopNo: newData.shopNo,
                                road: newData.road,
                                state: "Lusaka",
                                country: "Zambia",
                                tpin: newData.tpin,
                                taxType: newData.taxType,
                                taxRat: newData.taxRat,
                            },
                        }, function (callback) {
                            setTimeout(function () {
                                resolve();
                                setState(function (prevState) {
                                    var data = prevState.data.slice();
                                    data.push(newData);
                                    return __assign({}, prevState, { data: data });
                                });
                            }, 600);
                        });
                    });
                },
                onRowUpdate: function (newData, oldData) {
                    return new Promise(function (resolve) {
                        dataBase_1.default.HandleDepartments({ type: "edit", _type: 'EditLocal', data: { newData: newData, oldData: oldData } }, function (callback) {
                            setTimeout(function () {
                                resolve();
                                if (oldData) {
                                    setState(function (prevState) {
                                        var data = prevState.data.slice();
                                        data[data.indexOf(oldData)] = newData;
                                        return __assign({}, prevState, { data: data });
                                    });
                                }
                            }, 600);
                        });
                    });
                },
                onRowDelete: function (newData, oldData) {
                    return new Promise(function (resolve) {
                        dataBase_1.default.HandleDepartments({ type: "delete", data: { newData: newData, oldData: oldData } }, function (callback) {
                            setTimeout(function () {
                                resolve();
                                if (oldData) {
                                    setState(function (prevState) {
                                        var data = prevState.data.slice();
                                        data[data.indexOf(oldData)] = newData;
                                        return __assign({}, prevState, { data: data });
                                    });
                                }
                            }, 600);
                        });
                    });
                },
            } })));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DepTable);
//# sourceMappingURL=DepTable.js.map