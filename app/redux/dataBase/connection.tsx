import { getDatafilePath } from "./store/path";

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

let defaultPath = getDatafilePath + "/" + "db.json";

const adapter = new FileSync(defaultPath)
const db = low(adapter)

export default db;
