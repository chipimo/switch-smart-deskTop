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
function createFakeRow(index) {
    return {
        id: index,
        avatar: "",
        county: "zambia",
        email: "chipimo31@gmail.com",
        title: "5tes",
        firstName: "melvin",
        lastName: "chip[im",
        street: "jkknd",
        zipCode: "kkkk",
        date: "23/33/5678",
        jobTitle: "ghhhh",
        catchPhrase: "hhh",
        companyName: "sdzee",
        jobArea: "xdr",
        jobType: "xf",
        phone: "aseeeeeee"
    };
}
var createChildRows = function (count) {
    return Array(count).keys().slice().map(function (i) { return createFakeRow(i); });
};
function createRowData(count) {
    return Array(count).keys().slice().map(function (i) {
        var teamMembers = createChildRows(3);
        return __assign({}, createFakeRow(i), { teamMembers: teamMembers });
    });
}
exports.default = createRowData;
//# sourceMappingURL=createRowData.js.map