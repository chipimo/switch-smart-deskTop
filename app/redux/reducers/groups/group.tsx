import { getDatafilePath } from "../../dataBase/store/path";

const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const path = require("path");

let defaultPath = getDatafilePath;
// const folderPath = defaultPath + "/dataFiles/Groups/groups.json";
var folderPath = path.join(__dirname, "groups.json");

const ConfigAdapter = new FileAsync("groups.json");

const uuidv4 = require("uuid/v4");

function CreateId() {
  return uuidv4();
}

const GetData = (props, hook, callback) => {
  hook
    .select()
    .from(props.table)
    .where(props.id, props.value)
    .then(function (data) {
      callback({
        data,
      });
    });
};

export const SetGroups = (props, dbhook, sendCallback) => {
  
  GetData(
    { table: "group", id: "group", value: props.group },
    dbhook,
    (callback) => {
      if (callback.data.length === 0) { 
        dbhook("group")
          .insert({
            id: CreateId(),
            group: props.group,
            recipes: { data: [{ recipe: props.group }] },
            colors: props.colors,
          })
          .then(function () {
            sendCallback({ isSet: true });
          });
      } else {
        sendCallback({ isSet: false });
      }
    }
  );

  // low(ConfigAdapter).then((tempdb) => {
  //   var data = tempdb.get("initalData").value();
  //   if (data) {
  //     const initalData = {
  //       group: props.group,
  //       recipes:
  //         props.recipes.length === 0
  //           ? [{ recipe: props.group }]
  //           : props.recipes,
  //       color: props.colors,
  //     };

  //     tempdb.get("initalData").push(initalData).write();
  //     callback({ isSet: true });
  //   } else {
  //     const initalData = [
  //       {
  //         group: props.group,
  //         recipes:
  //           props.recipes.length === 0
  //             ? [{ recipe: props.group }]
  //             : props.recipes,
  //         color: props.colors,
  //       },
  //     ];

  //     // Create the config file
  //     low(ConfigAdapter).then((tempdb) => {
  //       tempdb.defaults({ initalData }).write();
  //     });
  //     callback({ isSet: true });
  //   }
  // });
};

export const GetGroups = (props, dbhook, sendCallback) => {
  dbhook
    .select()
    .from("group")
    .then(function (data) {
      sendCallback({
        data,
      });
    });
};

export const DeleteGroups = (props, dbhook, sendCallback) => {
  dbhook("group")
    .where({ group: props.group.group })
    .del()
    .then(function (data) {
      sendCallback({
        isDeleted: true,
      });
    });
};

// export const DeleteRecipe = (props, sendCallback) => {
//   low(ConfigAdapter).then((tempdb) => {
//     tempdb
//       .get("initalData")
//       .remove({ group: props.group.group })
//       .write()
//       .then(function () {
//         sendCallback({
//           isDeleted: true,
//         });
//       });
//   });
// };
