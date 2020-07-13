import configureStore from "../store";
import appDb from ".";

const uuidv4 = require("uuid/v4");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

function CreateId() {
  return uuidv4();
}
// let defaultPath = getDatafilePath;
// const ConfigPath = defaultPath + "/dataFiles/Products/config.json";
// const FolderPath = defaultPath + "/dataFiles/Products/

const ConfigAdapter = new FileAsync("backup.json");
class Updater {
  private _is_Conn() {
    var conn = configureStore.getState().SocketConn.isConn;
    return { conn, socket: configureStore.getState().SocketConn.socket };
  }

  private _setToUpdate(props, sendCallback) {
    // console.log(props);
    switch (props.type) {
      case "products":
        low(ConfigAdapter).then((tempdb) => {
          const isWriten = tempdb.get("UpDates").value();
          var initalData = {
            id: props.props.id,
            type: "products",
            props: props.props.props,
          };
          if (!isWriten) {
            tempdb.defaults({ UpDates: [initalData] }).write();
          } else {
            tempdb.get("UpDates").push(initalData).write();
          }
        });
        break;

      default:
        break;
    }
  }

  public _runUpates(data, callback) {
    low(ConfigAdapter).then((tempdb) => {
      const isWriten = tempdb.get("UpDates").value();
      var product = tempdb.get("UpDates").find({ id: data.productKey }).value();
      // console.log(product.props);
      if (this._is_Conn().conn)
        this._UpdateProducts(product, (reciveCallback) => {
          tempdb
            .get("UpDates")
            .remove({ id: data.productKey })
            .write()
            .then(function () {
              callback({
                isDeleted: true,
              });
            });
        });
    });
  }

  public isOnline() {
    // if (this._is_Conn().conn) this._runUpates();
  }

  public _UpdateWorkPeriod(props, sendCallback) {
    if (this._is_Conn().conn) {
      this._is_Conn().socket.emit("HANDEL_WORKPERIODS", props);
    } else {
    }
  }

  public _UpdateProducts(props, sendCallback) {
    if (this._is_Conn().conn) {
      // console.log(props.props);

      this._is_Conn().socket.emit("UPDATENEWPROUDCT", {
        from: configureStore.getState().Dep.dep,
        data: props.props,
      });

      this._is_Conn().socket.on("UPDATEPRODUSTS", (callback) => {
        setTimeout(() => {
          sendCallback(callback);
          // console.log(callback);
          configureStore.dispatch({
            type: "SYNC",
            item: callback.data.name,
          });

          appDb.HandelProducts(
            { _type: "sync", name: callback.data.name },
            (serverCallback) => {
              configureStore.dispatch({
                type: "STOPSYNC",
              });
              sendCallback(serverCallback);
            }
          );
        }, 500);

        setTimeout(() => {
          configureStore.dispatch({
            type: "STOPSYNC",
          });
        }, 2000);

        if (callback.from !== configureStore.getState().Dep.dep)
          appDb.HandelProducts(callback.data, (serverCallback) => {
            sendCallback(serverCallback);
          });
      });
    } else {
      this._setToUpdate({ type: "products", props }, (callback) => {});
    }
  }

  public _UpdateInventory(props, sendCallback) {
    if (this._is_Conn().conn) {
      this._is_Conn().socket.emit("UPDATEINVENTORTY", {
        dep: configureStore.getState().Dep.dep,
        data: props,
      });
    }
  }

  public _UpdateUsers(props, sendCallback) {
    if (this._is_Conn().conn) {
      this._is_Conn().socket.emit("UPDATEUSERS", props);
    }
  }

  public _UpdateSalesRports(props, sendCallback) {
    if (configureStore.getState().SocketConn.isConn) {     
      this._is_Conn().socket.emit("SALESREPORT", props);
      this._is_Conn().socket.on("SALESREPORTLIST", (callbackProps) => {
        sendCallback(callbackProps);
      });
    }
  }
}

const Backup = new Updater();
export default Backup;
