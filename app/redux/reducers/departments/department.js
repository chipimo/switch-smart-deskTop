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
var Dep = function (state, action) {
    if (state === void 0) { state = {
        isSet: false,
        dep: null,
        departmentInfo: {},
    }; }
    switch (action.type) {
        case "SETDEP":
            state = __assign({}, state, { isSet: true, dep: action.dep[0].dep_name, departmentInfo: action.dep[0] });
            break;
        case "RESTDEP":
            state = __assign({}, state, { isSet: false, dep: null, departmentInfo: {} });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = Dep;
//# sourceMappingURL=department.js.map