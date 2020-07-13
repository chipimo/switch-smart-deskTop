"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("../../dataBase/store/path");
var moment = require("moment");
var uuidv4 = require("uuid/v4");
var low = require("lowdb");
var FileAsync = require("lowdb/adapters/FileAsync");
var defaultPath = path_1.getDatafilePath;
var folderPath = defaultPath + "/dataFiles/Warehouse/";
// const ConfigPath = defaultPath + "/dataFiles/Warehouse/config.json";
var path = require("path");
var ConfigPath = path.join(__dirname, "groups.json");
var check = moment(new Date());
var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
var month = check.format("MMMM"); // => ('January','February.....)
var year = check.format("YYYY");
var time = check.format("LT");
exports.Purchases = function (props, dbhook, sendCallback) {
    console.log(props);
    // low(ConfigAdapter).then((tempdb) => {
    //   const isWriten = tempdb.get("Inventory").value();
    //   props.selected.map((groups) => {
    //     var skeleton = {
    //       tabname: groups.skeleton.tabname,
    //       background: groups.skeleton.background,
    //       color: groups.skeleton.color,
    //       index: groups.skeleton.index,
    //       id: groups.skeleton.id,
    //       category: [
    //         {
    //           cartname: groups.recipes,
    //           subcart: [groups.data],
    //         },
    //       ],
    //     };
    //     if (isWriten.length !== 0) {
    //       // console.log("added");
    //       var isInvSet = tempdb
    //         .get("Inventory")
    //         .find({ tabname: groups.group })
    //         .value();
    //       if (isInvSet) {
    //         // console.log(isInvSet);
    //         var is_set = false;
    //         var categoryList = null;
    //         categoryList = tempdb
    //           .get("Inventory")
    //           .find({
    //             category: [
    //               {
    //                 cartname: groups.recipes,
    //               },
    //             ],
    //           })
    //           .value();
    //         // is_set = true;
    //         // console.log(groups);
    //         if (categoryList) {
    //           categoryList.category.map((category) => {
    //             if (category.cartname === groups.recipes) {
    //               category.subcart.push(groups.data);
    //               tempdb
    //                 .get("Inventory")
    //                 .find({ id: categoryList.id })
    //                 .assign({ category: [categoryList.category] })
    //                 .value();
    //               tempdb.write().then(() => {
    //                 return sendCallback({ isSet: true, type: "update" });
    //               });
    //             }
    //           });
    //         } else {
    //           isInvSet.category.push({
    //             cartname: groups.recipes,
    //             subcart: [groups.data],
    //           });
    //           tempdb
    //             .get("Inventory")
    //             .find({ id: isWriten.id })
    //             .assign({ category: isInvSet.category })
    //             .value();
    //           tempdb.write().then(() => {
    //             return sendCallback({ isSet: true, type: "update" });
    //           });
    //         }
    //       } else {
    //         tempdb.get("Inventory").push(skeleton).write();
    //         // sendCallback({ isSet: true, type: "add" });
    //       }
    //     } else {
    //       tempdb
    //         .get("Inventory")
    //         .push(skeleton)
    //         .write()
    //         .then(() => {
    //           sendCallback({ isSet: true, type: "add" });
    //         });
    //     }
    //   });
    // });
};
//# sourceMappingURL=Inventoery.js.map