// var invNum = require("invoice-number");

const uuidv4 = require("uuid/v4");

function CreateId() {
  return uuidv4();
} 

export const InvoiceNumber = (props, dbhook, callback) => {
  switch (props.type) {
    case "get":
      dbhook
        .select()
        .from("invNum")
        .then(function (data) {
          callback({
            data,
          });
        });
      break;
    case "set":
      dbhook
        .select()
        .from("invNum")
        .then(function (data) {
          if (data.length === 0) {
            dbhook("invNum")
              .insert({
                id: CreateId(),
                invNumber: 1,
              })
              .then(function (data) {
                callback({
                  data,
                });
              });
          } else {
            dbhook("invNum")
              .where({ id: props.id })
              .update({
                invNumber: props.inv + 1,
              })
              .then(function (data) {
                callback({
                  data,
                });
              });
          }
        });

      break;

    default:
      break;
  }
};


export const quotationNumber = (props, dbhook, callback) => {
  switch (props.type) {
    case "get":
      dbhook
        .select()
        .from("qutNum")
        .then(function (data) {
          callback({
            data,
          });
        });
      break;
    case "set":
      console.log("yteeeeeeee");
      
      dbhook
        .select()
        .from("qutNum")
        .then(function (data) {
          if (data.length === 0) {
            dbhook("qutNum")
              .insert({
                id: CreateId(),
                qutNumber: 1,
              })
              .then(function (data) {
                callback({
                  data,
                });
              });
          } else {
            dbhook("qutNum")
              .where({ id: props.id })
              .update({
                qutNumber: props.inv + 1,
              })
              .then(function (data) {
                callback({
                  data,
                });
              });
          }
        });

      break;

    default:
      break;
  }
};
