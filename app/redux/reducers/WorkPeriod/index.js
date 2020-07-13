"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var WorkPeriod = function (state, action) {
    if (state === void 0) { state = {
        isStarted: false,
        id: "",
        dateStarted: "",
        dateStartedString: "",
        time: "",
        date: "",
        dateEnded: "",
        note: "",
        ticketsId: [],
        userId: "",
        department: "",
        fileName: "",
        workedFor: "",
        year: "",
        month: "",
        week: "",
        day: "",
    }; }
    switch (action.type) {
        case "STARTWORKPERIOD":
            state = __assign({}, state, { isStarted: true, id: action.id, dateStarted: action.dateStarted, dateStartedString: action.dateStartedString, time: "", date: action.date, dateEnded: action.dateEnded, note: action.note, ticketsId: action.ticketsId, userId: action.userId, department: action.department, fileName: action.fileName, workedFor: action.workedFor, year: action.year, month: action.month, week: action.week, day: action.day });
            break;
        case "UPDATEWORKPERIOD":
            state = __assign({}, state, { id: "", isStarted: true, dateStarted: action.dateStarted, time: action.time, date: action.date, dateEnded: action.dateEnded, note: action.note, ticketsId: action.ticketsId, userId: action.userId, department: action.department, fileName: action.fileName, workedFor: "", year: action.year, month: action.month, week: action.week, day: action.day });
            break;
        case "ENDWORKPERIOD":
            state = __assign({}, state, { isStarted: false, dateStarted: "", dateStartedString: "", time: "", date: "", dateEnded: "", note: "", ticketsId: [], userId: "", department: "", fileName: "", workedFor: "", year: "", month: "", week: "", day: "" });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = WorkPeriod;
//# sourceMappingURL=index.js.map