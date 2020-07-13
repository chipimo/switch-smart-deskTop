"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var redux_2 = require("redux");
var Theme_1 = require("../reducers/theme/Theme");
var sockets_1 = require("../reducers/sockets");
var Config_1 = require("../reducers/config/Config");
var cart_1 = require("../reducers/cart/cart");
var ticketConfg_1 = require("../reducers/tickets/ticketConfg");
var Customers_1 = require("../reducers/customers/Customers");
var printHistoryTicket_1 = require("../reducers/printer/printHistoryTicket");
var ticketOut_1 = require("../reducers/tickets/ticketOut");
var tax_1 = require("../reducers/tax/tax");
var WorkPeriod_1 = require("../reducers/WorkPeriod");
var WorkPeriodList_1 = require("../reducers/WorkPeriod/WorkPeriodList");
var Users_1 = require("../reducers/Users");
var department_1 = require("../reducers/departments/department");
var Notifications_1 = require("../reducers/Notifications");
var NetStack_1 = require("../reducers/Notifications/NetStack");
var Model_1 = require("../reducers/Model");
var SettingViews_1 = require("../reducers/SettingViews");
var Products_1 = require("../reducers/Products");
var LoadTabel_1 = require("../reducers/Products/LoadTabel");
var TicketNote_1 = require("../reducers/tickets/TicketNote");
var SalesReports_1 = require("../reducers/reports/SalesReports");
var LoggedInUsers_1 = require("../reducers/Users/LoggedInUsers");
var productSync_1 = require("../reducers/Products/productSync");
var productList_1 = require("../reducers/Products/productList");
var AllReducers = redux_2.combineReducers({
    Theme: Theme_1.default,
    SocketConn: sockets_1.default,
    Config: Config_1.default,
    Cart: cart_1.default,
    TicketConfig: ticketConfg_1.default,
    Customers: Customers_1.default,
    TicketToPrint: printHistoryTicket_1.default,
    TicketOut: ticketOut_1.default,
    Tax: tax_1.default,
    WorkPeriod: WorkPeriod_1.default,
    WorkPeriodList: WorkPeriodList_1.default,
    User: Users_1.default,
    Dep: department_1.default,
    Notify: Notifications_1.default,
    StackNotify: NetStack_1.default,
    Model: Model_1.default,
    SettingViews: SettingViews_1.default,
    ProductsMainList: Products_1.default,
    LoadTabel: LoadTabel_1.default,
    TicketNote: TicketNote_1.default,
    SalesReports: SalesReports_1.default,
    LoggedUsers: LoggedInUsers_1.default,
    ProductSync: productSync_1.default,
    ProductList: productList_1.default,
});
var store = redux_1.createStore(AllReducers, redux_1.applyMiddleware(redux_thunk_1.default));
var configureStore = function () {
    return store;
};
exports.default = configureStore();
//# sourceMappingURL=index.js.map