"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryTransfer = function (dbhook, sendCallback) {
    dbhook
        .select()
        .from("inventory_transfer")
        .then(function (department) {
        sendCallback({
            department: department,
        });
    });
};
//# sourceMappingURL=InventoryTransfer.js.map