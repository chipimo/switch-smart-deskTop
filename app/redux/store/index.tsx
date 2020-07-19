import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import Theme from "../reducers/theme/Theme";
import SocketConn from "../reducers/sockets";
import Config from "../reducers/config/Config";
import Cart from "../reducers/cart/cart";
import TicketConfig from "../reducers/tickets/ticketConfg";
import Customers from "../reducers/customers/Customers";
import TicketToPrint from "../reducers/printer/printHistoryTicket";
import TicketOut from "../reducers/tickets/ticketOut";
import Tax from "../reducers/tax/tax";
import WorkPeriod from "../reducers/WorkPeriod";
import WorkPeriodList from "../reducers/WorkPeriod/WorkPeriodList";
import User from "../reducers/Users";
import Dep from "../reducers/departments/department";
import Notify from "../reducers/Notifications";
import StackNotify from "../reducers/Notifications/NetStack";
import Model from "../reducers/Model";
import SettingViews from "../reducers/SettingViews";
import ProductsMainList from "../reducers/Products";
import LoadTabel from "../reducers/Products/LoadTabel";
import TicketNote from "../reducers/tickets/TicketNote";
import SalesReports from "../reducers/reports/SalesReports";
import LoggedUsers from "../reducers/Users/LoggedInUsers";
import ProductSync from "../reducers/Products/productSync";
import ProductList from "../reducers/Products/productList";
import Updater from "../reducers/Updater";

const AllReducers = combineReducers({
  Theme: Theme,
  SocketConn: SocketConn,
  Config: Config,
  Cart: Cart,
  TicketConfig: TicketConfig,
  Customers: Customers,
  TicketToPrint: TicketToPrint,
  TicketOut: TicketOut,
  Tax: Tax,
  WorkPeriod: WorkPeriod,
  WorkPeriodList: WorkPeriodList,
  User: User,
  Dep: Dep,
  Notify: Notify,
  StackNotify: StackNotify,
  Model: Model,
  SettingViews: SettingViews,
  ProductsMainList: ProductsMainList,
  LoadTabel: LoadTabel,
  TicketNote: TicketNote,
  SalesReports: SalesReports,
  LoggedUsers: LoggedUsers,
  ProductSync: ProductSync,
  ProductList: ProductList,
  Updater: Updater,
});

const store = createStore(AllReducers, applyMiddleware(thunk));

const configureStore = () => {
  return store;
};

export default configureStore();
