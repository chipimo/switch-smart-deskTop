import {
  ConfigFile,
  UpdateTax,
  UpdateTheme,
  UpdateDepartment,
} from "../reducers/config";
import configureStore from "../store";
import {
  CheckDepartments,
  SetDepartments,
  GetDepartment,
  GetDepartmentsList,
  EditDepartment,
} from "../reducers/departments";
import {
  UserLogIn,
  NewUser,
  GetUsers,
  DeleteUser,
  EditUser,
} from "../reducers/Users/User";
import {
  StartWorkPeriod,
  EndWorkPeriod,
  CheckWorkPeriod,
  WorkPeriodList,
} from "../reducers/WorkPeriod/workPeriod";
import Backup from "./updater";
import { SetGroups, GetGroups, DeleteGroups } from "../reducers/groups/group";
import { HandelNewProducts, GetData } from "../reducers/Products/Products";
import { Purchases } from "../reducers/inventory/Inventoery";
import { HandleReports } from "../reducers/reports/Reports";
import { CustomersConfig } from "../reducers/customers";
import { InvoiceNumber, quotationNumber } from "../reducers/Invoice";
import { InventoryTransfer } from "../reducers/inventory/InventoryTransfer";
import { financialNumber } from "../reducers/financialReport";

const knex = require("../../../knex");
var Called = false;

knex.schema.hasTable("products").then(function (exists) {
  if (!exists) {
    return (
      knex.schema
        .createTable("Tabs", function (table) {
          table.increments("key");
          table.string("id").notNullable();
          table.string("tabname").notNullable();
          table.string("background").notNullable();
          table.string("color").notNullable();
          table.string("buttonType").notNullable();
          table.boolean("isInstore").notNullable();
          table.boolean("isTaxEnabled").notNullable();
          table.timestamp("date").defaultTo(knex.fn.now());
          table.timestamp("modified").defaultTo(knex.fn.now());
        })
        .createTable("TabList", function (table) {
          table.increments("key");
          table.string("id").notNullable();
          table.string("name").notNullable();
          table.string("groupId").notNullable();
          table.timestamp("date").defaultTo(knex.fn.now());
          table.timestamp("modified").defaultTo(knex.fn.now());
        })
        .createTable("invNum", function (table) {
          table.string("id").notNullable();
          table.integer("invNumber").notNullable();
        })
        .createTable("qutNum", function (table) {
          table.string("id").notNullable();
          table.integer("qutNumber").notNullable();
        })
        .createTable("products", function (table) {
          table.increments("key");
          table.string("productKey").notNullable();
          table.string("group").notNullable();
          table.string("category").notNullable();
          table.string("ItemName").notNullable();
          table.string("barcode1").notNullable();
          table.string("barcode2").notNullable();
          table.string("barcode3").notNullable();
          table.string("barcode4").notNullable();
          table.string("barcode5").notNullable();
          table.integer("sallingprice").notNullable();
          table.integer("initalPrice").notNullable();
          table.integer("qnt").notNullable();
          table.integer("multiplier").notNullable();
          table.integer("alertOut").notNullable();
          table.integer("amountInstore").notNullable();
          table.boolean("sync").notNullable();
          table.boolean("isInstore").notNullable();
          table.boolean("isTaxEnabled").notNullable();
          table.boolean("isMulity").notNullable();
          table.timestamp("date").defaultTo(knex.fn.now());
          table.timestamp("modified").defaultTo(knex.fn.now());
        })
        .createTable("mulitProducts", function (table) {
          table.increments("key");
          table.string("id").notNullable();
          table.string("productName").notNullable();
          table.integer("sallingprice").notNullable();
          table.integer("initalPrice").notNullable();
          table.integer("qnt").notNullable();
          table.string("barcode1").notNullable();
          table.string("barcode2").notNullable();
          table.string("barcode3").notNullable();
          table.string("barcode4").notNullable();
          table.string("barcode5").notNullable();
          table.integer("alertOut").notNullable();
          table.integer("amountInstore").notNullable();
          table.boolean("isInstore").notNullable();
          table.boolean("isTaxEnabled").notNullable();
          table.timestamp("date").defaultTo(knex.fn.now());
          table.timestamp("modified").defaultTo(knex.fn.now());
        })
        // ===== End of products ======
        .createTable("inventory", function (table) {
          table.increments("key");
          table.string("name").notNullable();
          table.string("group").notNullable();
          table.string("backgroundColor").notNullable();
          table.string("textColor").notNullable();
          table.string("cartname").notNullable();
          table.string("barcode").notNullable();
          table.string("sallingprice").notNullable();
          table.string("initalPrice").notNullable();
          table.string("qnt").notNullable();
          table.string("alertOut").notNullable();
          table.string("amountInstore").notNullable();
          table.string("department").notNullable();
          table.boolean("isInstore").notNullable();
          table.boolean("isTaxEnabled").notNullable();
          table.boolean("isMulity").notNullable();
          table.timestamp("date").defaultTo(knex.fn.now());
          table.timestamp("modified").defaultTo(knex.fn.now());
        })

        .createTable("inventory_transfer", function (table) {
          table.increments("key");
          table.string("name").notNullable();
          table.string("quantity").notNullable();
          table.string("date").notNullable();
          table.string("time").notNullable();
          table.string("state").notNullable();
          table.string("from").notNullable();
          table.string("to").notNullable();
          table.timestamp("timestamp").defaultTo(knex.fn.now());
          table.timestamp("modified").defaultTo(knex.fn.now());
        })
        .createTable("sales_reports_tikets", function (table) {
          table.increments("key");
          table.string("id").notNullable();
          table.string("Year").notNullable();
          table.string("Day").notNullable();
          table.string("Month").notNullable();
          table.string("InvoiceNumber").notNullable();
          table.jsonb("TicketList").notNullable();
          table.jsonb("Customer").notNullable();
          table.integer("GrandTotal").notNullable();
          table.integer("AmountPaid").notNullable();
          table.integer("ChangeDue").notNullable();
          table.integer("Balance").notNullable();
          table.integer("RtxGrandTotal").notNullable();
          table.integer("RtxAmountPaid").notNullable();
          table.integer("RtxChangeDue").notNullable();
          table.integer("RtxBalance").notNullable();
          table.integer("Discount").notNullable();
          table.string("Date").notNullable();
          table.string("Datetrack").notNullable();
          table.string("Department").notNullable();
          table.string("User").notNullable();
          table.string("PaymentType").notNullable();
          table.boolean("isTaxInvoice").notNullable();
          table.text("Note").notNullable();
          table.decimal("totalTaxFinal").notNullable();
          table.decimal("totalTax").notNullable();
          table.string("time").notNullable();
          table.boolean("isBackedUp").notNullable();
          table.timestamp("timestamp").defaultTo(knex.fn.now());
          table.timestamp("modified").defaultTo(knex.fn.now());
        })
        .createTable("sales_reports_totals", function (table) {
          table.increments("key");
          table.string("id").notNullable();
          table.string("Year").notNullable();
          table.string("Day").notNullable();
          table.string("Month").notNullable();
          table.integer("SrNo").notNullable();
          table.integer("GrandTotal").notNullable();
          table.integer("AmountPaid").notNullable();
          table.integer("ChangeDue").notNullable();
          table.integer("Balance").notNullable();
          table.integer("Discount").notNullable();
          table.integer("RtxGrandTotal").notNullable();
          table.integer("RtxAmountPaid").notNullable();
          table.integer("RtxChangeDue").notNullable();
          table.integer("RtxBalance").notNullable();
          table.string("Date").notNullable();
          table.string("Datetrack").notNullable();
          table.string("Department").notNullable();
          table.string("totalTaxFinal").notNullable();
          table.string("totalTax").notNullable();
          table.string("time").notNullable();
          table.boolean("isBackedUp").notNullable();
          table.timestamp("timestamp").defaultTo(knex.fn.now());
          table.timestamp("modified").defaultTo(knex.fn.now());
        })
        .createTable("purchases_reports", function (table) {
          table.increments("key");
          table.string("id").notNullable();
          table.string("year").notNullable();
          table.string("month").notNullable();
          table.string("day").notNullable();
          table.jsonb("list").notNullable();
          table.timestamp("timestamp").defaultTo(knex.fn.now());
          table.timestamp("modified").defaultTo(knex.fn.now());
        })
        .createTable("work_period", function (table) {
          table.increments("key");
          table.string("id").notNullable();
          table.string("year").notNullable();
          table.string("month").notNullable();
          table.string("day").notNullable();
          table.string("week").notNullable();
          table.string("dateStarted").notNullable();
          table.string("dateStartedString").notNullable();
          table.string("dateEnded").notNullable();
          table.string("dateEndedString").notNullable();
          table.string("time").notNullable();
          table.string("timeEnded").notNullable();
          table.string("date").notNullable();
          table.string("note").notNullable();
          table.string("department").notNullable();
          table.string("workedFor").notNullable();
          table.integer("ticket_count").notNullable();
          table.integer("sales_total").notNullable();
          table.boolean("isOpen").notNullable();
          table.timestamp("timestamp").defaultTo(knex.fn.now());
          table.timestamp("modified").defaultTo(knex.fn.now());
        })
        .createTable("accounts", function (table) {
          table.increments("key");
          table.string("id").notNullable();
          table.string("Year").notNullable();
        })
        .createTable("customers", function (table) {
          table.increments("key");
          table.string("id").notNullable();
          table.string("name").notNullable();
          table.string("phone").notNullable();
        })
        .createTable("group", function (table) {
          table.increments("key");
          table.string("id").notNullable();
          table.string("group").notNullable();
          table.jsonb("recipes").notNullable();
          table.jsonb("colors").notNullable();
        })
        .createTable("invoice_number", function (table) {
          table.increments("key");
          table.string("id").notNullable();
          table.string("number").notNullable();
        })
        .createTable("users", function (table) {
          table.increments("key");
          table.string("id").notNullable();
          table.string("userName").notNullable();
          table.string("pin").notNullable();
          table.string("department").notNullable();
          table.string("prevarges").notNullable();
          table.jsonb("notifications").notNullable();
        })
        .createTable("department_config", function (table) {
          table.increments("key");
          table.string("id").notNullable();
          table.string("dep_name").notNullable();
          table.string("theme").notNullable();
          table.string("phone").notNullable();
          table.string("shopNo").notNullable();
          table.string("road").notNullable();
          table.string("state").notNullable();
          table.string("country").notNullable();
          table.string("tpin").notNullable();
          table.string("taxType").notNullable();
          table.integer("taxRat").notNullable();
          table.string("association").notNullable();
          table.json("notifications").notNullable();
        })
        .createTable("financial_Report_number", function (table) {
          table.increments("key");
          table.integer("number").notNullable();
        })
    );
  }
});

class AppDb {
  // handleUpdates
  private UpdateToServer(props, callback) {
    if (props._type === "set") {
      Backup._UpdateProducts(props, (recivecallback) => {});
    }
    switch (props._data_type) {
      case "sales_reports":
        Backup._UpdateSalesRports(props, (reciveCallback) => {
          callback(reciveCallback);
        });
        break;
      case "products":
        Backup._UpdateProducts(props, (reciveCallback) => {
          callback(reciveCallback);
        });

        break;
      case "add_to_store":
        Backup._UpdateProducts(props, (reciveCallback) => {
          callback(reciveCallback);
        });

        break;

      default:
        break;
    }
  }

  // Handel department
  public CheckConfig() {
    ConfigFile({ type: "checkConfig", id: "mainApp" }, knex, (callback) => {
      if (callback.config.length !== 0) {
        var data = callback.config;
        setTimeout(() => {
          if (configureStore.getState().SocketConn.isConn)
            configureStore
              .getState()
              .SocketConn.socket.emit("DEP_CONNECTED", data);
          configureStore.dispatch({
            type: "SETDEP",
            dep: data,
          });
          configureStore.dispatch({
            type: "SETCONFIG",
            isSet: true,
            config: callback,
          });
        }, 3500);
      } else {
        configureStore.dispatch({
          type: "SETCONFIG",
          isSet: false,
          config: {},
        });
      }
    });
  }

  public HandleDepartments(props, sendCallback) {
    if (props.type === "check") {
      CheckDepartments("", (callback) => {
        sendCallback(callback);
      });
    } else if (props.type === "set") {
      SetDepartments(props.data, (reciveCallback) => {
        sendCallback(reciveCallback);
        ConfigFile(
          { type: "set", dataType: "new", data: reciveCallback },
          knex,
          (callback) => {
            sendCallback(callback);
          }
        );
      });
    } else if (props.type === "create") {
      SetDepartments(props.data, (reciveCallback) => {
        sendCallback(reciveCallback);
      });
    } else if (props.type === "get") {
      GetDepartment(props.data, (reciveCallback) => {
        sendCallback(reciveCallback);
      });
    } else if (props.type === "getAll") {
      GetDepartmentsList(props.data, (reciveCallback) => {
        sendCallback(reciveCallback);
      });
    } else if (props.type === "setSelected") {
      ConfigFile(
        { type: "set", dataType: "selecte", props },
        knex,
        (callback) => {
          sendCallback(callback);
        }
      );
    } else if (props.type === "edit") {
      EditDepartment(props, (reciveCallback) => {
        sendCallback(reciveCallback);
      });
    } else if (props._type === "EditLocal") {
      UpdateDepartment(props, knex, (callback) => {});
    }
  }
  // Handel Users
  public HandleLogIn(props, callback) {
    UserLogIn(props, knex, (reciveCallback) => {
      if (reciveCallback) {
        if (reciveCallback.isLoggedIn) {
          var userData = {
            dep: configureStore.getState().Dep,
            config: reciveCallback.config,
          };
          if (configureStore.getState().SocketConn.isConn) {
            configureStore
              .getState()
              .SocketConn.socket.emit("USER_CONNECTED", userData);

            appDb.HandleDep((callback) => {
              var data = {
                id: callback.config[0].id,
                dep_name: callback.config[0].dep_name,
              };
              configureStore
                .getState()
                .SocketConn.socket.emit("UserConnected", data);
            });
          }
        }
        callback(reciveCallback);
      }
    });
  }

  // Handel Users
  public HandleLogOut(props, callback) {
    UserLogIn(props, knex, (reciveCallback) => {
      if (reciveCallback) {
        if (reciveCallback.isLoggedIn)
          if (configureStore.getState().SocketConn.isConn)
            configureStore
              .getState()
              .SocketConn.socket.emit(
                "USER_DISCONNECTED",
                reciveCallback.config
              );
        callback(reciveCallback);
      }
    });
  }

  public HandleNewUser(props, sendCallback) {
    NewUser(props, knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  public HandleGetUser(sendCallback) {
    GetUsers(knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  public HandleDeleteUser(props, sendCallback) {
    DeleteUser(props, knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  public HandleEidtUser(props, sendCallback) {
    EditUser(props, knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  // Handel WorkPeriods
  public HandleWorkperiods(props, callback) {
    if (props._type === "start") {
      StartWorkPeriod(props, knex, (reciveCallback) => {
        if (configureStore.getState().SocketConn.isConn)
          configureStore
            .getState()
            .SocketConn.socket.emit("STARTWORKPEROID", props);

        // Backup._UpdateWorkPeriod(
        //   { _type: "start", data: reciveCallback },
        //   (reciveCallback) => {

        //   }
        // );
        callback(reciveCallback);
      });
    } else if (props._type === "end") {
      EndWorkPeriod(props, knex, (reciveCallback) => {
        if (configureStore.getState().SocketConn.isConn)
          configureStore
            .getState()
            .SocketConn.socket.emit("ENDWORKPEROID", props);

        callback(reciveCallback);
      });
    } else if (props._type === "check") {
      CheckWorkPeriod(knex, (reciveCallback) => {
        callback(reciveCallback);
      });
    } else if (props._type === "loadList") {
      WorkPeriodList(knex, (reciveCallback) => {
        callback(reciveCallback);
      });
    }
  }
  /**
   * HandleDepConn
   */
  public HandleDep(sendCallback) {
    ConfigFile({ type: "checkConfig", id: "mainApp" }, knex, (callback) => {
      sendCallback(callback);
    });
  }

  // HandleProducts
  public HandelProducts(props, sendCallback) {
    if (props._type === "getServerProducts") {
      if (!Called) {
        Called = true;
        if (configureStore.getState().SocketConn.isConn) {
          configureStore.getState().SocketConn.socket.emit("GETALLPRODUCTS");
          configureStore.getState().SocketConn.socket.emit("GETGROUPS", props);

          configureStore
            .getState()
            .SocketConn.socket.on("GROUPSLIST", (List) => {
              List.data.map((items) => {
                const data = {
                  group: items.group,
                  recipes: [],
                  colors: items.colors,
                };

                SetGroups(data, knex, (getCallback) => {});
              });
            });

          configureStore
            .getState()
            .SocketConn.socket.on("ALLPRODUCTSLIST", (List) => {
              HandelNewProducts(
                { _type: "addServerProducts", AllProducts: List },
                knex,
                (receiveCallback) => {
                  if (receiveCallback) {
                    sendCallback(receiveCallback);

                    if (receiveCallback.isSet) {
                      configureStore.dispatch({
                        type: "LOADTABEL",
                      });
                    }

                    setTimeout(() => {
                      Called = false;
                    }, 10000);
                  }
                }
              );
            });
        }
      }
    } else {
      HandelNewProducts(props, knex, (receiveCallback) => {
        if (receiveCallback) {
          if (receiveCallback.type === "add") {
            var data = { id: receiveCallback.productKey, props };
            Backup._UpdateProducts(data, (receiveBackUpCallback) => {});
          } else if (receiveCallback.type === "add_to_store") {
            Backup._UpdateInventory(props, (receiveBackUpCallback) => {});
          } else if (receiveCallback.type === "Add_filter") {
            Backup._UpdateInventory(props, (receiveBackUpCallback) => {});
          } else if (receiveCallback.type === "remove_filter") {
            Backup._UpdateInventory(props, (receiveBackUpCallback) => {});
          }

          sendCallback(receiveCallback);

          if (receiveCallback.isSet) {
            configureStore.dispatch({
              type: "LOADTABEL",
            });
          }
        }
      });
    }
    // this.UpdateToServer(props, (callback) => {});
  }

  // HandleProducts
  public HandleTaxUpdate(props, sendCallback) {
    UpdateTax(props, knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  // HandleInventory
  public HandleInventory(props, sendCallback) {
    Purchases(props, knex, (reciveCallbak) => {
      sendCallback(reciveCallbak);
    });
  }

  // HandleGroup
  public HandelGroup(props, sendCallback) {
    if (props._type === "set") {
      if (configureStore.getState().SocketConn.isConn) {
        configureStore.getState().SocketConn.socket.emit("SETGROUP", props);
      }

      SetGroups(props, knex, (reciveCallback) => {
        sendCallback(reciveCallback);
      });
    } else if (props._type === "get") {
      GetGroups(props, knex, (reciveCallback) => {
        sendCallback(reciveCallback);
      });
    } else if (props._type === "deleteGroup") {
      if (configureStore.getState().SocketConn.isConn) {
        configureStore.getState().SocketConn.socket.emit("DELETEGROUP", props);
      }

      DeleteGroups(props, knex, (callback) => {
        sendCallback(callback);
      });
    }
  }

  // HandleGroup
  public HandelReports(props, sendCallback) {
    HandleReports(props, knex, (recivedCallback) => {
      sendCallback(recivedCallback);
    });

    // this.UpdateToServer(props, (callback) => {
    //   // console.log(callback);
    // });
  }

  // HandleGroup
  public HandleCustomers(props, sendCallback) {
    CustomersConfig(props, knex, (recivedCallback) => {
      sendCallback(recivedCallback);
    });
  }

  // HandleGroup
  public HandleInventoryTransfer(sendCallback) {
    InventoryTransfer(knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  public HandleTheme(props, sendCallback) {
    UpdateTheme(props, knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  // Invoice Number
  public HandleinvNumber(props, sendCallback) {
    switch (props._type) {
      case "invo":
        InvoiceNumber(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });

        break;
      case "quot":
        quotationNumber(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });

        break;

      default:
        break;
    }
  }

  public HandlefinancialNumber(props, sendCallback) {
    financialNumber(props, knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  // Server BackUp
  public HandleServerBackUp(props, sendCallback) {
    if (props.tiketsIsDone) {
      GetData(
        {
          table: "sales_reports_totals",
          id: "isBackedUp",
          value: false,
        },
        knex,
        (reciveCallback) => {
          sendCallback(reciveCallback);
        }
      );
    } else {
      GetData(
        {
          table: "sales_reports_tikets",
          id: "isBackedUp",
          value: false,
        },
        knex,
        (reciveCallback) => {
          sendCallback(reciveCallback);
        }
      );
    }
  }

  public GetTabelData(props, sendCallback) {
    // console.log(props);
    
    GetData(
      {
        table: props.table,
        id: props.id,
        value: props.value,
      },
      knex,
      (reciveCallback) => {
        sendCallback(reciveCallback);
      }
    );
  }
}

const appDb = new AppDb();
export default appDb;
