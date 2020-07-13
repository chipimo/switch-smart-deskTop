"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("./store/path");
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var defaultPath = path_1.getDatafilePath + "/" + "db.json";
var adapter = new FileSync(defaultPath);
var db = low(adapter);
exports.default = db;
//# sourceMappingURL=connection.js.map