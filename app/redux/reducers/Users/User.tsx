import Backup from "../../dataBase/updater";
import configureStore from "../../store";

const uuidv4 = require("uuid/v4");

function CreateId() {
  return uuidv4();
}

function int(dbhook, sendCallback) {
  dbhook
    .select()
    .from("users")
    .then(function (config) {
      if (config.length === 0)
        dbhook("users")
          .insert({
            id: CreateId(),
            userName: "Administrator",
            pin: "1234",
            department: "all",
            prevarges: "1",
            notifications: JSON.stringify({ id: CreateId(), list: [] }),
          })
          .then(function () {
            sendCallback({ done: true });
          });
      else sendCallback({ done: true });
    });
}

export const UserLogIn = (props, dbhook, sendCallback) => {
  int(dbhook, (callback) => {
    if (callback.done) {
      dbhook
        .select()
        .where("pin", props.pin)
        .from("users")
        .then(function (config) {
          if (config.length !== 0) sendCallback({ isLoggedIn: true, config });
          else sendCallback({ isLoggedIn: false });
        });
    }
  });
};

export const GetUsers = (dbhook, sendCallback) => {
  dbhook
    .select()
    .from("users")
    .then(function (config) {
      sendCallback(config);
    });
};

export const NewUser = (props, dbhook, sendCallback) => {
  var data = {
    id: CreateId(),
    userName: props.userName,
    pin: props.pin,
    department: configureStore.getState().Dep.dep,
    prevarges: props.prevarges,
    notifications: JSON.stringify({ id: CreateId(), list: [] }),
  };

  dbhook("users")
    .insert(data)
    .then(function () {
      sendCallback({ done: true });
    });

  Backup._UpdateUsers(data, (reciveCallback) => {});
};

export const EditUser = (props, dbhook, sendCallback) => {
  dbhook("users")
    .where({ id: props.id })
    .update({
      userName: props.userName,
      pin: props.pin,
      department: props.department,
      prevarges: props.prevarges,
    })
    .then(function () {
      sendCallback({ done: true });
    });
};

export const DeleteUser = (props, dbhook, sendCallback) => {
  console.log(props);
  dbhook("users")
    .where({ id: props.id })
    .del()
    .then(function () {
      sendCallback({ done: true });
    });
};
