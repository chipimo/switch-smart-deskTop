import configureStore from "../../store";
import appDb from "../../dataBase";
const moment = require("moment");

export const CheckDepartments = (props, callback) => {
  if (configureStore.getState().SocketConn.isConn) {
    configureStore.getState().SocketConn.socket.emit("GETDEPARTMENTS");
    configureStore.getState().SocketConn.socket.on("DEP_RESULT", (result) => {
      if (result.exist) {
        callback({ exist: true, deps: result.departments });
      } else {
        callback({ exist: false });
      }
    });
  }
};

export const SetDepartments = (props, sendCallback) => {
  appDb.HandleGetUser((callback) => {
    var data = {
      department: props.department,
      id: "auto",
      phone: props.phone ? props.phone : "+260 975 30 30 30",
      shopNo: props.shopNo ? props.shopNo : "Shop No C3",
      road: props.road ? props.road : "Great East Road",
      state: "Lusaka",
      country: "Zambia",
      tpin: props.tpin ? props.tpin : "1003938315",
      taxType: props.taxType ? props.taxType : "VAT",
      taxRat: props.taxRat ? parseInt(props.taxRat) : 16,
      date: {
        date: moment().format("ddd MMM Do, YYYY"),
        time: moment().format("LTS"),
      },
      user: { Users: callback },
    };

    if (configureStore.getState().SocketConn.isConn) {
      configureStore.getState().SocketConn.socket.emit("SETDEPARTMENTS", data);
      configureStore.getState().SocketConn.socket.on("DEP_SET", (result) => {
        if (!result.alreadyExist) {
          sendCallback({ set: true, result });
        } else {
          sendCallback({ set: false });
        }
      });
    }
  });
  // const dep = db.get("department").value();
  // callback(dep);
};

export const EditDepartment = (props, sendCallback) => {
  if (configureStore.getState().SocketConn.isConn) {
    configureStore
      .getState()
      .SocketConn.socket.emit("EDITDEPARTMENTCOFIG", props.data.newData);
      configureStore.getState().SocketConn.socket.on("DEP_SET", (result) => {
        if (!result.alreadyExist) {
          sendCallback({ set: true, result });
        } else {
          sendCallback({ set: false });
        }
      });
    }
    appDb.HandleDepartments(props,sendCallback=>{
      sendCallback({ set: true });
  })
};

export const GetDepartment = (props, callback) => {
  if (configureStore.getState().SocketConn.isConn)
    configureStore
      .getState()
      .SocketConn.socket.emit("GETDEPARTMENTCOFIG", props.DepSelected.data);
};

export const GetDepartmentsList = (props, callback) => {
  if (configureStore.getState().SocketConn.isConn) {
    configureStore.getState().SocketConn.socket.emit("GETDEPARTMENTS", props);
    configureStore
      .getState()
      .SocketConn.socket.on("DEP_RESULT", (callback_props) => {
        callback(callback_props);
      });
  }
};
