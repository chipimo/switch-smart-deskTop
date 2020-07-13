import appDb from "../../dataBase";

const uuidv4 = require("uuid/v4");
const { ipcRenderer } = require("electron");
var num = 0;

function CreatId() {
  return uuidv4();
}
let Tickets = [];

const TicketOut = (
  state = {
    Tickets: [],
  },
  action
) => {
  switch (action.type) {
    case "SAVETICKET":
      let data = {
        id: CreatId(),
        invoiceNumber: action.invoiceNumber,
        ticketList: action.payload.ticketList,
        TotalCost: action.payload.GrandTotal,
        TotalPaid: action.payload.AmountPaid,
        ChangeDue: action.payload.ChangeDue,
        Balance: action.payload.Balance,
        Customer: action.payload.Customer,
        Date: action.payload.Date,
      };
      if (Tickets.length === 0) {
        Tickets = action.defaultList;
        Tickets.push(data);
      } else {
        Tickets.push(data);
      }
      // console.log(Tickets);

      // generateInvoiceNumber(action.defaultList);
      if (action.payload.ticketHeader !== "Quotation No")
        appDb.HandelProducts(
          { _type: "reduce_store", data: action.payload.ticketList },
          (reciveCallback) => {}
        ); 

      ipcRenderer.send("do_print_receipt", {
        GrandTotal: action.payload.GrandTotal,
        AmountPaid: action.payload.AmountPaid,
        ChangeDue: action.payload.ChangeDue,
        Discount: action.payload.Discount,
        Balance: action.payload.Balance, 
        user: action.payload.user, 
        date: action.payload.Date,
        time: action.payload.time,
        ticketstate: action.payload.ticketstate,
        state: action.payload.state,
        paymentType: action.payload.paymentType,
        isTaxInvoice: action.payload.isTaxInvoice,
        taxRate: action.payload.taxRate,
        totalTax: action.payload.totalTax,
        ticketHeader: action.payload.ticketHeader,
        items: action.payload.toPrint,
        invoiceNumber: action.payload.invoiceNumber,
        department: action.payload.department,
        road: action.payload.state.road,
        shop: action.payload.state.shopNo,
      });

      state = {
        ...state,
        Tickets: Tickets,
      };

      break;
    case "RESTALL":
      state = {
        ...state,
        Tickets: [],
      };
      break;
    default:
      return state;
  }

  return state;
};

export default TicketOut;
