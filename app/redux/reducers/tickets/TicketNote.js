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
var TicketNote = function (state, action) {
    if (state === void 0) { state = {
        note: "",
    }; }
    switch (action.type) {
        case "SetNote":
            state = __assign({}, state, { note: action.note });
            break;
        case "ReSetNote":
            state = __assign({}, state, { note: "" });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = TicketNote;
//# sourceMappingURL=TicketNote.js.map