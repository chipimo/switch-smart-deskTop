// import { getDatafilePath } from "../../dataBase/store/path";
import configureStore from "../../store";

const moment = require("moment");
const uuidv1 = require("uuid/v1");

// let defaultPath = getDatafilePath;
// const ConfigPath = defaultPath + "/dataFiles/Products/config.json";
// const FolderPath = defaultPath + "/dataFiles/Products/";
var SocketIds = [];

function CreateId() {
  return uuidv1();
}

export const GetData = (props, hook, callback) => {
  // console.log(props);
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

const GetDataAll = (props, hook, callback) => {
  hook
    .select()
    .from(props.table)
    .then(function (data) {
      callback({
        data,
      });
    });
};

export const HandelNewProducts = (props, dbhook, sendCallback) => {
  var isMulity = false;
  var multi = [];

  switch (props._type) {
    case "set":
      var recipe = props.recipe === "" ? props.group.group : props.recipe;
      var productKey = CreateId();
      if (props.portion.length !== 1) isMulity = true;

      GetData(
        { table: "Tabs", id: "tabname", value: props.group.group },
        dbhook,
        (Tabcallback) => {
          // console.log(Tabcallback.data[0].isTaxEnabled);
          if (Tabcallback.data.length === 0) {
            dbhook("Tabs")
              .insert({
                id: uuidv1(),
                tabname: props.group.group,
                background: props.group.colors.backgroundColor,
                color: props.group.colors.textColor,
                buttonType: "default",
                isInstore: false,
                isTaxEnabled: true,
              })
              .then(function () {
                GetData(
                  { table: "products", id: "ItemName", value: props.name },
                  dbhook,
                  async (callback) => {
                    if (callback.data.length === 0) {
                      dbhook("products")
                        .insert({
                          productKey: uuidv1(),
                          group: props.group.group,
                          category: recipe,
                          ItemName: props.name,
                          barcode1:
                            props.portion.length !== 1
                              ? ""
                              : props.portion[0].barcode1,
                          barcode2:
                            props.portion.length !== 1
                              ? ""
                              : props.portion[0].barcode2,
                          barcode3:
                            props.portion.length !== 1
                              ? ""
                              : props.portion[0].barcode3,
                          barcode4:
                            props.portion.length !== 1
                              ? ""
                              : props.portion[0].barcode4,
                          barcode5:
                            props.portion.length !== 1
                              ? ""
                              : props.portion[0].barcode5,
                          sallingprice: isMulity ? 0 : props.portion[0].price,
                          initalPrice: isMulity ? 0 : props.portion[0].price,
                          qnt: 1,
                          multiplier: 0,
                          alertOut: isMulity ? 0 : props.portion[0].alertOut,
                          amountInstore: 0,
                          sync: false,
                          isInstore: false,
                          isTaxEnabled: true,
                          isMulity,
                        })
                        .then(function () {
                          if (isMulity) {
                            props.portion.map((data) => {
                              dbhook("mulitProducts")
                                .insert({
                                  id: uuidv1(),
                                  productName: props.name,
                                  sallingprice: parseInt(data.price),
                                  initalPrice: parseInt(data.price),
                                  qnt: 1,
                                  barcode1: data.barcode1,
                                  barcode2: data.barcode2,
                                  barcode3: data.barcode3,
                                  barcode4: data.barcode4,
                                  barcode5: data.barcode5,
                                  alertOut: parseInt(data.alertOut),
                                  amountInstore: 0,
                                  isInstore: false,
                                  isTaxEnabled: true,
                                })
                                .then((result) => {
                                  // console.log(result);
                                })
                                .catch((err) => {
                                  // console.log(err);
                                });
                            });
                            sendCallback({
                              isSet: true,
                              productKey,
                              type: "add",
                            });
                          } else {
                            sendCallback({
                              isSet: true,
                              productKey,
                              type: "add",
                            });
                          }
                        });
                    } else {
                      alert("This Product already exist");
                    }
                  }
                );
              });
          } else {
            GetData(
              { table: "products", id: "ItemName", value: props.name },
              dbhook,
              async (callback) => {
                if (callback.data.length === 0) {
                  dbhook("products")
                    .insert({
                      productKey: uuidv1(),
                      group: props.group.group,
                      category: recipe,
                      ItemName: props.name,
                      barcode1:
                        props.portion.length !== 1
                          ? ""
                          : props.portion[0].barcode1,
                      barcode2:
                        props.portion.length !== 1
                          ? ""
                          : props.portion[0].barcode2,
                      barcode3:
                        props.portion.length !== 1
                          ? ""
                          : props.portion[0].barcode3,
                      barcode4:
                        props.portion.length !== 1
                          ? ""
                          : props.portion[0].barcode4,
                      barcode5:
                        props.portion.length !== 1
                          ? ""
                          : props.portion[0].barcode5,
                      sallingprice: isMulity ? 0 : props.portion[0].price,
                      initalPrice: isMulity ? 0 : props.portion[0].price,
                      qnt: 1,
                      multiplier: 0,
                      alertOut: isMulity ? 0 : props.portion[0].alertOut,
                      amountInstore: 0,
                      sync: false,
                      isInstore: false,
                      isTaxEnabled: Tabcallback.data[0].isTaxEnabled,
                      isMulity,
                    })
                    .then(function () {
                      if (isMulity) {
                        props.portion.map((data) => {
                          dbhook("mulitProducts")
                            .insert({
                              id: uuidv1(),
                              productName: props.name,
                              sallingprice: parseInt(data.price),
                              initalPrice: parseInt(data.price),
                              qnt: 1,
                              barcode1: data.barcode1,
                              barcode2: data.barcode2,
                              barcode3: data.barcode3,
                              barcode4: data.barcode4,
                              barcode5: data.barcode5,
                              alertOut: parseInt(data.alertOut),
                              amountInstore: 0,
                              isInstore: false,
                              isTaxEnabled: Tabcallback.data[0].isTaxEnabled,
                            })
                            .then((result) => {
                              // console.log(result);
                            })
                            .catch((err) => {
                              // console.log(err);
                            });
                        });
                        sendCallback({
                          isSet: true,
                          productKey,
                          type: "add",
                        });
                      } else {
                        sendCallback({
                          isSet: true,
                          productKey,
                          type: "add",
                        });
                      }
                    });
                } else {
                  // alert("This Product already exist");
                }
              }
            );
          }
        }
      );

      break;

    case "sync":
      dbhook("products")
        .where({ ItemName: props.name })
        .update({
          sync: true,
        })
        .then(function (data) {
          sendCallback({ isSet: true });
        });

      break;

    case "addServerProducts":
      const {
        alltabs,
        allproductsList,
        allmulitList,
        socketId,
      } = props.AllProducts;
      if (SocketIds.length === 0) {
        SocketIds.push(socketId);

        alltabs.map((tab) => {
          GetData(
            { table: "Tabs", id: "tabname", value: tab.tabname },
            dbhook,
            (callback) => {
              if (callback.data.length === 0) {
                dbhook("Tabs")
                  .insert({
                    id: tab.id,
                    tabname: tab.tabname,
                    background: tab.background,
                    color: tab.color,
                    buttonType: "default",
                    isInstore: tab.isInstore,
                    isTaxEnabled: true,
                  })
                  .then(function () {});
              }
            }
          );
        });

        allproductsList.map((productsList) => {
          GetData(
            {
              table: "products",
              id: "ItemName",
              value: productsList.ItemName,
            },
            dbhook,
            (callback) => {
              if (callback.data.length === 0) {
                dbhook("products")
                  .insert({
                    productKey: productsList.productKey,
                    group: productsList.group,
                    category: productsList.category,
                    ItemName: productsList.ItemName,
                    barcode1: productsList.barcode1,
                    barcode2: productsList.barcode2,
                    barcode3: productsList.barcode3,
                    barcode4: productsList.barcode4,
                    barcode5: productsList.barcode5,
                    sallingprice: productsList.sallingprice,
                    initalPrice: productsList.initalPrice,
                    qnt: productsList.qnt,
                    multiplier: 0,
                    alertOut: productsList.alertOut,
                    amountInstore: productsList.amountInstore,
                    sync: true,
                    isInstore: false,
                    isTaxEnabled: true,
                    isMulity: productsList.isMulity,
                  })
                  .then(function () {});
              }
            }
          );
        });

        allmulitList.map((multiproductsList) => {
          GetData(
            {
              table: "mulitProducts",
              id: "productName",
              value: multiproductsList.productName,
            },
            dbhook,
            (callback) => {
              if (callback.data.length === 0) {
                dbhook("mulitProducts")
                  .insert({
                    id: multiproductsList.id,
                    productName: multiproductsList.productName,
                    sallingprice: multiproductsList.sallingprice,
                    initalPrice: multiproductsList.initalPrice,
                    qnt: 1,
                    barcode1: multiproductsList.barcode1,
                    barcode2: multiproductsList.barcode2,
                    barcode3: multiproductsList.barcode3,
                    barcode4: multiproductsList.barcode4,
                    barcode5: multiproductsList.barcode5,
                    alertOut: multiproductsList.alertOut,
                    amountInstore: multiproductsList.amountInstore,
                    isInstore: false,
                    isTaxEnabled: true,
                  })
                  .then((result) => {
                    // console.log(result);
                  });
              }
            }
          );
        });
      }

      sendCallback({ isSet: true });

      break;

    case "barcodeScen":
      dbhook
        .select()
        .from("products")
        .where("barcode1", props.value)
        .orWhere("barcode2", props.value)
        .orWhere("barcode3", props.value)
        .orWhere("barcode4", props.value)
        .orWhere("barcode5", props.value)
        .then(function (data) {
          if (data.length !== 0) {
            sendCallback({
              from: "main",
              data,
            });
          } else {
            dbhook
              .select()
              .from("mulitProducts")
              .where("barcode1", props.value)
              .orWhere("barcode2", props.value)
              .orWhere("barcode3", props.value)
              .orWhere("barcode4", props.value)
              .orWhere("barcode5", props.value)
              .then(function (data) {
                sendCallback({
                  from: "mulit",
                  data,
                });
              });
          }
        });
      break;

    case "invReduction":
      // console.log(props);
      GetData(
        {
          table: "products",
          id: "ItemName",
          value: props.data.selectedItem.ItemName,
        },
        dbhook,
        (callback) => {
          if (callback.data.length !== 0)
            dbhook("products")
              .where({ ItemName: props.data.selectedItem.ItemName })
              .update({
                amountInstore:
                  callback.data[0].amountInstore - parseInt(props.data.value),
              })
              .then(function (data) {
                sendCallback({
                  isSet: true,
                  name: props.data.selectedItem.ItemName,
                });
              });
        }
      );

      break;

    case "getPOSList":
      switch (props.layoutType) {
        case "tabs":
          dbhook
            .select()
            .from("Tabs")
            .then(function (data) {
              sendCallback({
                data,
              });
            });
          break;
        case "TabList":
          dbhook
            .select()
            .from("TabList")
            .where({ groupId: props.groupId })
            .then(function (data) {
              sendCallback({
                data,
              });
            });
          break;
        case "ProductsList":
          dbhook
            .select()
            .from("products")
            .where({ group: props.category })
            .then(function (data) {
              sendCallback({
                data,
              });
            });
          break;
        case "mulitList":
          dbhook
            .select()
            .from("mulitProducts")
            .where({ productName: props.name })
            .then(function (data) {
              sendCallback({
                data,
              });
            });
          break;
        case "all_P":
          var tabs = [];
          var categorylist = [];
          var productsList = [];
          var mulitList = [];

          dbhook
            .select()
            .from("Tabs")
            .then(function (data) {
              tabs = data;

              dbhook
                .select()
                .from("TabList")
                .then(function (data) {
                  categorylist = data;

                  dbhook
                    .select()
                    .from("products")
                    .then(function (data) {
                      productsList = data;

                      dbhook
                        .select()
                        .from("mulitProducts")
                        .then(function (data) {
                          mulitList = data;

                          sendCallback({
                            tabs,
                            categorylist,
                            productsList,
                            mulitList,
                          });
                        });
                    });
                });
            });

          break;

        case "getGrouped":
          dbhook
            .select()
            .from("Tabs")
            .then(async function (data) {
              tabs = data;
              var productsList = [];

              const proList = tabs.map(async (list) => {
                GetData(
                  {
                    table: "products",
                    id: "group",
                    value: list.tabname,
                  },
                  dbhook,
                  (reciveCallback) => {
                    reciveCallback.data.map((mainlist) => {
                      productsList.push(mainlist);
                    });
                  }
                );
                return productsList;
              });
              const productResult = await Promise.all(proList);
              sendCallback({
                productResult,
              });
            });
          break;

        case "all_purcheased":
          dbhook
            .select()
            .from("products")
            .where({ isInstore: true })
            .then(function (data) {
              sendCallback(data);
            });

          break;
        case "searchedProduct":
          // console.log(props.id.ItemName);
          dbhook
            .select()
            .from("products")
            .where({ ItemName: props.id.ItemName })
            .then(function (data) {
              sendCallback(data);
            });

          break;
        default:
          break;
      }
      break;
    case "edit":
      if (props.portion.length === 1) {
        dbhook("products")
          .where({ productKey: props.data.productKey })
          .update({
            ItemName: props.name,
            barcode1: props.portion[0].barcode1,
            barcode2: props.portion[0].barcode2,
            barcode3: props.portion[0].barcode3,
            barcode4: props.portion[0].barcode4,
            barcode5: props.portion[0].barcode5,
            sallingprice: props.portion[0].price,
            initalPrice: props.portion[0].price,
            alertOut: props.portion[0].alertOut,
          })
          .then(function (data) {
            return sendCallback({
              isSet: true,
              type: "update",
              data: { type: "product_update" },
            });
          });
      } else {
        dbhook("products")
          .where({ productKey: props.data.productKey })
          .update({
            ItemName: props.name,
          })
          .then(function () {
            dbhook
              .select()
              .from("mulitProducts")
              .where({ productName: props.name })
              .then(async function (data) {
                if (data.length === props.portion.length) {
                  const updater = data.map(async (list) => {
                    props.portion.map((dataprops) => {
                      // console.log(dataprops);
                      if (dataprops.id === list.id)
                        dbhook("mulitProducts")
                          .where({ id: list.id })
                          .update({
                            productName: props.name,
                            barcode1: dataprops.barcode1,
                            barcode2: dataprops.barcode2,
                            barcode3: dataprops.barcode3,
                            barcode4: dataprops.barcode4,
                            barcode5: dataprops.barcode5,
                            sallingprice: dataprops.price,
                            initalPrice: dataprops.price,
                            alertOut: dataprops.alertOut,
                          })
                          .then(function () {});

                      return true;
                    });
                  });

                  const updaterReturns = await Promise.all(updater);
                  if (updaterReturns)
                    return sendCallback({
                      isSet: true,
                      type: "update",
                      data: { type: "product_update" },
                    });
                } else {
                  dbhook("mulitProducts")
                    .where({ productName: props.name })
                    .del()
                    .then(async function () {
                      var loopEnd = 0;

                      const updater = props.portion.map(async (dataprops) => {
                        loopEnd++;
                        dbhook("mulitProducts")
                          .insert({
                            id: uuidv1(),
                            productName: props.name,
                            sallingprice: dataprops.price,
                            initalPrice: dataprops.price,
                            qnt: 1,
                            barcode1: dataprops.barcode1,
                            barcode2: dataprops.barcode2,
                            barcode3: dataprops.barcode3,
                            barcode4: dataprops.barcode4,
                            barcode5: dataprops.barcode5,
                            alertOut: dataprops.alertOut,
                            amountInstore: data[0].amountInstore,
                            isInstore: data[0].isInstore,
                            isTaxEnabled: data[0].isTaxEnabled,
                          })
                          .then((result) => {});

                        if (loopEnd === props.portion.length) {
                          return true;
                        }
                      });

                      const updaterReturns = await Promise.all(updater);
                      if (updaterReturns)
                        return sendCallback({
                          isSet: true,
                          type: "update",
                          data: { type: "product_update" },
                        });
                    });
                }

                // sendCallback({
                //   data,
                // });
              });
          });
      }

      break;
    case "delete":
      // console.log(props);
      dbhook("products")
        .where({ productKey: props.selected.productKey })
        .del()
        .then(function (data) {
          if (props.serverdelete) {
            // console.log("serverdelete");
            if (configureStore.getState().SocketConn.isConn)
              configureStore
                .getState()
                .SocketConn.socket.emit("DELETEPRODUCT", props);
          }
          return sendCallback({
            isSet: true,
            name,
            data: {
              type: "delete",
              recipe: props.selected.category,
              group: props.selected.group,
              productKey: props.selected.ItemName,
            },
          });
        });

      break;

    case "Add_filter":
      props.taxMapping.map((list) => {
        // console.log(list);

        dbhook("Tabs")
          .where({ tabname: list.tabname })
          .update({
            isTaxEnabled: false,
          })
          .then(function (data) {
            dbhook("products")
              .where({ group: list.tabname })
              .update({
                isTaxEnabled: false,
              })
              .then(function (data) {
                GetData(
                  {
                    table: "products",
                    id: "group",
                    value: list.tabname,
                  },
                  dbhook,
                  (reciveCallback) => {
                    GetData(
                      {
                        table: "mulitProducts",
                        id: "productName",
                        value: reciveCallback.data[0].ItemName,
                      },
                      dbhook,
                      (reciveMultCallback) => {
                        // console.log(reciveMultCallback);
                        reciveMultCallback.data.map((list) => {
                          dbhook("mulitProducts")
                            .where({
                              productName: list.productName,
                            })
                            .update({
                              isTaxEnabled: false,
                            })
                            .then(function (data) {});
                        });
                      }
                    );
                  }
                );
              });
          });
      });

      sendCallback({
        isSet: true,
        type: "Add_filter",
      });

      break;
    case "remove_filter":
      props.TaxMappingOut.map((list) => {
        console.log(list);

        dbhook("Tabs")
          .where({ tabname: list.tabname })
          .update({
            isTaxEnabled: true,
          })
          .then(function (data) {
            dbhook("products")
              .where({ group: list.tabname })
              .update({
                isTaxEnabled: true,
              })
              .then(function (data) {
                GetData(
                  {
                    table: "products",
                    id: "group",
                    value: list.tabname,
                  },
                  dbhook,
                  (reciveCallback) => {
                    GetData(
                      {
                        table: "mulitProducts",
                        id: "productName",
                        value: reciveCallback.data[0].ItemName,
                      },
                      dbhook,
                      (reciveMultCallback) => {
                        // console.log(reciveMultCallback);
                        reciveMultCallback.data.map((list) => {
                          dbhook("mulitProducts")
                            .where({
                              productName: list.productName,
                            })
                            .update({
                              isTaxEnabled: true,
                            })
                            .then(function (data) {});
                        });
                      }
                    );
                  }
                );
              });
          });
      });

      sendCallback({
        isSet: true,
      });

      break;

    case "add_to_store":
      if (configureStore.getState().SocketConn.isConn) {
        configureStore
          .getState()
          .SocketConn.socket.emit("UPDATEIVENTORY", props);
      }

      props.purchaseSelected.map((nodes) => {
        dbhook("products")
          .where({ productKey: nodes.productKey })
          .update({
            amountInstore: nodes.quantity
              ? nodes.amountInstore + nodes.quantity
              : nodes.amountInstore + 1,
            isInstore: true,
          })
          .then(function (data) {
            dbhook("Tabs")
              .where({ tabname: nodes.group })
              .update({
                isInstore: true,
              })
              .then(function (data) {
                dbhook("mulitProducts")
                  .where({ productName: nodes.ItemName })
                  .update({
                    amountInstore: nodes.quantity
                      ? nodes.amountInstore + nodes.quantity
                      : nodes.amountInstore + 1,
                    isInstore: true,
                  })
                  .then(function (data) {});
              });
          });
      });

      props.mulitSelected.map((list) => {
        dbhook("mulitProducts")
          .where({ id: list.id })
          .update({
            amountInstore: list.quantity
              ? list.amountInstore + list.quantity
              : list.amountInstore + 1,
            isInstore: true,
          })
          .then(function (data) {});
      });

      // console.log(props.mulitSelected);

      sendCallback({
        isSet: true,
        type: "add_to_store",
        data: {
          name: props.purchaseSelected[0].ItemName,
          number: props.purchaseSelected.length,
        },
      });

      break;

    case "remove_from_store":
      // console.log(props);
      dbhook("products")
        .where({ productKey: props.oldData.productKey })
        .update({
          amountInstore: 0,
          isInstore: false,
        })
        .then(function (data) {
          GetData(
            { table: "products", id: "group", value: props.oldData.group },
            dbhook,
            async (callback) => {
              var state = false;

              const isProductsInstore = callback.data.map(async (product) => {
                if (product.isInstore) state = true;
                return state;
              });

              const results = await Promise.all(isProductsInstore);

              if (!results[0]) {
                dbhook("Tabs")
                  .where({ tabname: props.oldData.group })
                  .update({
                    isInstore: false,
                  })
                  .then(function (data) {});
              }
            }
          );
          return sendCallback({
            isSet: true,
            name,
            data: {
              type: "removed from store",
            },
          });
        });
      break;

    case "reduce_store":
      // console.log(props.data);

      var num = 0;
      props.data.map((list) => {
        if (list.isMulity) {
          num++;
          GetData(
            {
              table: "products",
              id: "ItemName",
              value: list.ItemName,
            },
            dbhook,
            (callback) => {
              dbhook("products")
                .where({ ItemName: list.ItemName })
                .update({
                  amountInstore: callback.data[0].amountInstore - num,
                })
                .then(function (data) {
                  dbhook("mulitProducts")
                    .where({ productName: list.ItemName })
                    .update({
                      amountInstore: callback.data[0].amountInstore - num,
                    })
                    .then(function (data) {});
                });
            }
          );
        } else {
          dbhook("products")
            .where({ productKey: list.productKey })
            .update({
              amountInstore: list.amountInstore,
            })
            .then(function (data) {});
        }
      });
      break;

    case "tranfer":
      switch (props.state) {
        case "send":
          if (configureStore.getState().SocketConn.isConn) {
            configureStore
              .getState()
              .SocketConn.socket.emit("SEND_TRANSTION", props);
          }

          break;

        case "delivery":
          GetData(
            {
              table: "products",
              id: "ItemName",
              value: props.data.selected.ItemName,
            },
            dbhook,
            (callback) => {
              dbhook("products")
                .where({ ItemName: props.data.selected.ItemName })
                .update({
                  amountInstore:
                    callback.data[0].amountInstore - parseInt(props.value),
                })
                .then(() => {
                  var trans = {
                    name: props.data.selected.ItemName,
                    quantity: props.data.value,
                    date: moment().format("LLLL"),
                    time: moment().format("LT"),
                    state: "sent",
                    from: props.data.from,
                    to: props.data.to,
                  };
                  dbhook("inventory_transfer")
                    .insert(trans)
                    .then(function () {
                      if (configureStore.getState().SocketConn.isConn) {
                        configureStore
                          .getState()
                          .SocketConn.socket.emit("INVENTORY_TRANSFER", trans);
                      }
                      sendCallback({
                        name: props.data.selected.ItemName,
                        isSet: true,
                      });
                    });
                });
            }
          );
          break;

        case "recived":
          // console.log(props);
          GetData(
            { table: "Tabs", id: "tabname", value: props.data.selected.group },
            dbhook,
            (callback) => {
              if (callback.data.length === 0) {
                dbhook("Tabs")
                  .insert({
                    id: uuidv1(),
                    tabname: props.data.selected.group,
                    background: "#3b3b3b",
                    color: "#fff",
                    buttonType: "default",
                    isInstore: true,
                    isTaxEnabled: true,
                  })
                  .then((result) => {
                    dbhook("products")
                      .insert({
                        productKey: props.data.selected.productKey,
                        group: props.data.selected.group,
                        category: props.data.selected.category,
                        ItemName: props.data.selected.ItemName,
                        barcode1: props.data.selected.barcode1,
                        barcode2: props.data.selected.barcode2,
                        barcode3: props.data.selected.barcode3,
                        barcode4: props.data.selected.barcode4,
                        barcode5: props.data.selected.barcode5,
                        sallingprice: props.data.selected.sallingprice,
                        initalPrice: props.data.selected.initalPrice,
                        qnt: props.data.selected.qnt,
                        multiplier: 0,
                        alertOut: props.data.selected.alertOut,
                        amountInstore: parseInt(props.data.value),
                        sync: props.data.selected.sync,
                        isInstore: true,
                        isTaxEnabled: props.data.selected.isTaxEnabled,
                        isMulity: props.data.selected.isMulity,
                      })
                      .then(function () {
                        if (props.data.selected.isMulity) {
                          props.data.data.multi.data.map((data) => {
                            dbhook("mulitProducts")
                              .insert({
                                id: data.id,
                                productName: data.productName,
                                sallingprice: data.sallingprice,
                                initalPrice: data.initalPrice,
                                qnt: data.qnt,
                                barcode1: data.barcode1,
                                barcode2: data.barcode2,
                                barcode3: data.barcode3,
                                barcode4: data.barcode4,
                                barcode5: data.barcode5,
                                alertOut: data.alertOut,
                                amountInstore: parseInt(props.data.value),
                                isInstore: true,
                              })
                              .then((result) => {
                                dbhook("inventory_transfer")
                                  .insert({
                                    name: props.data.selected.ItemName,
                                    quantity: props.data.value,
                                    date: moment().format("LLLL"),
                                    time: moment().format("LT"),
                                    state: "recived",
                                    from: props.data.from,
                                    to: props.data.to,
                                  })
                                  .then(function () {
                                    sendCallback({
                                      isSet: true,
                                    });
                                  });
                              });
                          });
                        } else {
                          dbhook("inventory_transfer")
                            .insert({
                              name: props.data.selected.ItemName,
                              quantity: props.data.value,
                              date: moment().format("LLLL"),
                              time: moment().format("LT"),
                              state: "recived",
                              from: props.data.from,
                              to: props.data.to,
                            })
                            .then(function () {
                              sendCallback({
                                isSet: true,
                              });
                            });
                        }
                      });
                  });
              } else {
                dbhook("Tabs")
                  .where({ tabname: props.data.selected.group })
                  .update({
                    isInstore: true,
                  })
                  .then(function (data) {});
                GetData(
                  {
                    table: "products",
                    id: "ItemName",
                    value: props.data.selected.ItemName,
                  },
                  dbhook,
                  (callback) => {
                    // console.log(callback);
                    if (callback.data.length !== 0) {
                      dbhook("products")
                        .where({ ItemName: props.data.selected.ItemName })
                        .update({
                          amountInstore:
                            callback.data[0].amountInstore +
                            parseInt(props.data.value),
                          sync: true,
                          isInstore: true,
                        })
                        .then(function () {
                          dbhook("inventory_transfer")
                            .insert({
                              name: props.data.selected.ItemName,
                              quantity: props.data.value,
                              date: moment().format("LLLL"),
                              time: moment().format("LT"),
                              state: "recived",
                              from: props.data.from,
                              to: props.data.to,
                            })
                            .then(function () {
                              sendCallback({
                                isSet: true,
                              });
                            });
                        });
                    } else {
                      dbhook("products")
                        .insert({
                          productKey: props.data.selected.productKey,
                          group: props.data.selected.group,
                          category: props.data.selected.category,
                          ItemName: props.data.selected.ItemName,
                          barcode1: props.data.selected.barcode1,
                          barcode2: props.data.selected.barcode2,
                          barcode3: props.data.selected.barcode3,
                          barcode4: props.data.selected.barcode4,
                          barcode5: props.data.selected.barcode5,
                          sallingprice: props.data.selected.sallingprice,
                          initalPrice: props.data.selected.initalPrice,
                          qnt: props.data.selected.qnt,
                          multiplier: 0,
                          alertOut: props.data.selected.alertOut,
                          amountInstore: parseInt(props.data.value),
                          sync: props.data.selected.sync,
                          isInstore: true,
                          isTaxEnabled: props.data.selected.isTaxEnabled,
                          isMulity: props.data.selected.isMulity,
                        })
                        .then(function () {
                          if (props.data.selected.isMulity) {
                            props.data.data.multi.data.map((data) => {
                              dbhook("mulitProducts")
                                .insert({
                                  id: data.id,
                                  productName: data.productName,
                                  sallingprice: data.sallingprice,
                                  initalPrice: data.initalPrice,
                                  qnt: data.qnt,
                                  barcode1: data.barcode1,
                                  barcode2: data.barcode2,
                                  barcode3: data.barcode3,
                                  barcode4: data.barcode4,
                                  barcode5: data.barcode5,
                                  alertOut: data.alertOut,
                                  amountInstore: parseInt(props.data.value),
                                  isInstore: true,
                                })
                                .then((result) => {
                                  dbhook("inventory_transfer")
                                    .insert({
                                      name: props.data.selected.ItemName,
                                      quantity: props.data.value,
                                      date: moment().format("LLLL"),
                                      time: moment().format("LT"),
                                      state: "recived",
                                      from: props.data.from,
                                      to: props.data.to,
                                    })
                                    .then(function () {
                                      sendCallback({
                                        isSet: true,
                                      });
                                    });
                                });
                            });
                          } else {
                            dbhook("inventory_transfer")
                              .insert({
                                name: props.data.selected.ItemName,
                                quantity: props.data.value,
                                date: moment().format("LLLL"),
                                time: moment().format("LT"),
                                state: "recived",
                                from: props.data.from,
                                to: props.data.to,
                              })
                              .then(function () {
                                sendCallback({
                                  isSet: true,
                                });
                              });
                          }
                        });
                    }
                  }
                );
              }
            }
          );
          break;
      }

      break;

    case "backUp":
      // console.log(props);
      props.data.tabs.map((tablist) => {
        GetData(
          {
            table: "Tabs",
            id: "tabname",
            value: tablist.tabname,
          },
          dbhook,
          (callback) => {
            if (callback.data.length === 0) {
              dbhook("Tabs")
                .insert({
                  id: tablist.id,
                  tabname: tablist.tabname,
                  background: tablist.background,
                  color: tablist.color,
                  buttonType: tablist.buttonType,
                  isInstore: tablist.isInstore,
                  isTaxEnabled: tablist.isTaxEnabled,
                })
                .then((result) => {});
            }
          }
        );
      });

      props.data.productsList.map((productslist) => {
        GetData(
          {
            table: "products",
            id: "ItemName",
            value: productslist.ItemName,
          },
          dbhook,
          (callback) => {
            if (callback.data.length === 0) {
              dbhook("products")
                .insert({
                  productKey: productslist.productKey,
                  group: productslist.group,
                  category: productslist.category,
                  ItemName: productslist.ItemName,
                  barcode1: productslist.barcode1,
                  barcode2: productslist.barcode2,
                  barcode3: productslist.barcode3,
                  barcode4: productslist.barcode4,
                  barcode5: productslist.barcode5,
                  sallingprice: productslist.sallingprice,
                  initalPrice: productslist.initalPrice,
                  qnt: productslist.qnt,
                  multiplier: 0,
                  alertOut: productslist.alertOut,
                  amountInstore: productslist.amountInstore,
                  sync: true,
                  isInstore: productslist.isInstore,
                  isTaxEnabled: productslist.isTaxEnabled,
                  isMulity: productslist.isMulity,
                })
                .then((result) => {
                  if (productslist.isMulity) {
                    props.data.mulitList.map((multlist) => {
                      dbhook("mulitProducts")
                        .insert({
                          id: multlist.id,
                          productName: multlist.productName,
                          sallingprice: multlist.sallingprice,
                          initalPrice: multlist.initalPrice,
                          qnt: multlist.qnt,
                          barcode1: multlist.barcode1,
                          barcode2: multlist.barcode2,
                          barcode3: multlist.barcode3,
                          barcode4: multlist.barcode4,
                          barcode5: multlist.barcode5,
                          alertOut: multlist.alertOut,
                          amountInstore: multlist.amountInstore,
                          isInstore: multlist.isInstore,
                        })
                        .then((result) => {
                          sendCallback({
                            isSet: true,
                          });
                        });
                    });
                  } else {
                    sendCallback({
                      isSet: true,
                    });
                  }
                });
            }
          }
        );
      });
      break;

    default:
      break;
  }
};
