export const InventoryTransfer = (dbhook, sendCallback) => {
  dbhook
    .select()
    .from("inventory_transfer")
    .then(function (department) {
      sendCallback({
        department,
      });
    });
};
