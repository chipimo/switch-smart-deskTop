exports.up = function (knex) {
  return (
    knex.schema
      // Products
      .createTable("Tabs", function (table) {
        table.increments("key");
        table.string("id").notNullable();
        table.string("tabname").notNullable();
        table.string("background").notNullable();
        table.string("color").notNullable();
        table.string("buttonType").notNullable();
        table.boolean("isInstore").notNullable();
        table.boolean("isTaxEnabled").notNullable();
        table.timestamp("date").defaultTo(knex.fn.now());
        table.timestamp("modified").defaultTo(knex.fn.now());
      })
      .createTable("TabList", function (table) {
        table.increments("key");
        table.string("id").notNullable();
        table.string("name").notNullable();
        table.string("groupId").notNullable();
        table.timestamp("date").defaultTo(knex.fn.now());
        table.timestamp("modified").defaultTo(knex.fn.now());
      })
      .createTable("invNum", function (table) {
        table.string("id").notNullable();
        table.integer("invNumber").notNullable();
      })
      .createTable("qutNum", function (table) {
        table.string("id").notNullable();
        table.integer("qutNumber").notNullable();
      })
      .createTable("products", function (table) {
        table.increments("key");
        table.string("productKey").notNullable();
        table.string("group").notNullable();
        table.string("category").notNullable();
        table.string("ItemName").notNullable();
        table.string("barcode1").notNullable();
        table.string("barcode2").notNullable();
        table.string("barcode3").notNullable();
        table.string("barcode4").notNullable();
        table.string("barcode5").notNullable();
        table.integer("sallingprice").notNullable();
        table.integer("initalPrice").notNullable();
        table.integer("qnt").notNullable();
        table.integer("multiplier").notNullable();
        table.integer("alertOut").notNullable();
        table.integer("amountInstore").notNullable();
        table.boolean("sync").notNullable();
        table.boolean("isInstore").notNullable();
        table.boolean("isTaxEnabled").notNullable();
        table.boolean("isMulity").notNullable();
        table.timestamp("date").defaultTo(knex.fn.now());
        table.timestamp("modified").defaultTo(knex.fn.now());
      })
      .createTable("mulitProducts", function (table) {
        table.increments("key");
        table.string("id").notNullable();
        table.string("productName").notNullable();
        table.integer("sallingprice").notNullable();
        table.integer("initalPrice").notNullable();
        table.integer("qnt").notNullable();
        table.string("barcode1").notNullable();
        table.string("barcode2").notNullable();
        table.string("barcode3").notNullable();
        table.string("barcode4").notNullable();
        table.string("barcode5").notNullable();
        table.integer("alertOut").notNullable();
        table.integer("amountInstore").notNullable();
        table.boolean("isInstore").notNullable();
        table.boolean("isTaxEnabled").notNullable();
        table.timestamp("date").defaultTo(knex.fn.now());
        table.timestamp("modified").defaultTo(knex.fn.now());
      })
      // ===== End of products ======
      .createTable("inventory", function (table) {
        table.increments("key");
        table.string("name").notNullable();
        table.string("group").notNullable();
        table.string("backgroundColor").notNullable();
        table.string("textColor").notNullable();
        table.string("cartname").notNullable();
        table.string("barcode").notNullable();
        table.string("sallingprice").notNullable();
        table.string("initalPrice").notNullable();
        table.string("qnt").notNullable();
        table.string("alertOut").notNullable();
        table.string("amountInstore").notNullable();
        table.string("department").notNullable();
        table.boolean("isInstore").notNullable();
        table.boolean("isTaxEnabled").notNullable();
        table.boolean("isMulity").notNullable();
        table.timestamp("date").defaultTo(knex.fn.now());
        table.timestamp("modified").defaultTo(knex.fn.now());
      })

      .createTable("inventory_transfer", function (table) {
        table.increments("key");
        table.string("name").notNullable();
        table.string("quantity").notNullable();
        table.string("date").notNullable();
        table.string("time").notNullable();
        table.string("state").notNullable();
        table.string("from").notNullable();
        table.string("to").notNullable();
        table.timestamp("timestamp").defaultTo(knex.fn.now());
        table.timestamp("modified").defaultTo(knex.fn.now());
      })
      .createTable("sales_reports_tikets", function (table) {
        table.increments("key");
        table.string("id").notNullable();
        table.string("Year").notNullable();
        table.string("Day").notNullable();
        table.string("Month").notNullable();
        table.string("InvoiceNumber").notNullable();
        table.jsonb("TicketList").notNullable();
        table.jsonb("Customer").notNullable();
        table.integer("GrandTotal").notNullable();
        table.integer("AmountPaid").notNullable();
        table.integer("ChangeDue").notNullable();
        table.integer("Balance").notNullable();
        table.integer("RtxGrandTotal").notNullable();
        table.integer("RtxAmountPaid").notNullable();
        table.integer("RtxChangeDue").notNullable();
        table.integer("RtxBalance").notNullable();
        table.integer("Discount").notNullable();
        table.string("Date").notNullable();
        table.string("Datetrack").notNullable();
        table.string("Department").notNullable();
        table.string("User").notNullable();
        table.string("PaymentType").notNullable();
        table.boolean("isTaxInvoice").notNullable();
        table.text("Note").notNullable();
        table.decimal("totalTaxFinal").notNullable();
        table.decimal("totalTax").notNullable();
        table.string("time").notNullable();
        table.timestamp("timestamp").defaultTo(knex.fn.now());
        table.timestamp("modified").defaultTo(knex.fn.now());
      })
      .createTable("sales_reports_totals", function (table) {
        table.increments("key");
        table.string("id").notNullable();
        table.string("Year").notNullable();
        table.string("Day").notNullable();
        table.string("Month").notNullable();
        table.integer("SrNo").notNullable();
        table.integer("GrandTotal").notNullable();
        table.integer("AmountPaid").notNullable();
        table.integer("ChangeDue").notNullable();
        table.integer("Balance").notNullable();
        table.integer("Discount").notNullable();
        table.integer("RtxGrandTotal").notNullable();
        table.integer("RtxAmountPaid").notNullable();
        table.integer("RtxChangeDue").notNullable();
        table.integer("RtxBalance").notNullable();
        table.string("Date").notNullable();
        table.string("Datetrack").notNullable();
        table.string("Department").notNullable();
        table.string("totalTaxFinal").notNullable();
        table.string("totalTax").notNullable();
        table.string("time").notNullable();
        table.timestamp("timestamp").defaultTo(knex.fn.now());
        table.timestamp("modified").defaultTo(knex.fn.now());
      })
      .createTable("purchases_reports", function (table) {
        table.increments("key");
        table.string("id").notNullable();
        table.string("year").notNullable();
        table.string("month").notNullable();
        table.string("day").notNullable();
        table.jsonb("list").notNullable();
        table.timestamp("timestamp").defaultTo(knex.fn.now());
        table.timestamp("modified").defaultTo(knex.fn.now());
      })
      .createTable("work_period", function (table) {
        table.increments("key");
        table.string("id").notNullable();
        table.string("year").notNullable();
        table.string("month").notNullable();
        table.string("day").notNullable();
        table.string("week").notNullable();
        table.string("dateStarted").notNullable();
        table.string("dateStartedString").notNullable();
        table.string("dateEnded").notNullable();
        table.string("dateEndedString").notNullable();
        table.string("time").notNullable();
        table.string("timeEnded").notNullable();
        table.string("date").notNullable();
        table.string("note").notNullable();
        table.string("department").notNullable();
        table.string("workedFor").notNullable();
        table.integer("ticket_count").notNullable();
        table.integer("sales_total").notNullable();
        table.boolean("isOpen").notNullable();
        table.timestamp("timestamp").defaultTo(knex.fn.now());
        table.timestamp("modified").defaultTo(knex.fn.now());
      })
      .createTable("accounts", function (table) {
        table.increments("key");
        table.string("id").notNullable();
        table.string("Year").notNullable();
      })
      .createTable("customers", function (table) {
        table.increments("key");
        table.string("id").notNullable();
        table.string("name").notNullable();
        table.string("phone").notNullable();
      })
      .createTable("group", function (table) {
        table.increments("key");
        table.string("id").notNullable();
        table.string("group").notNullable();
        table.jsonb("recipes").notNullable();
        table.jsonb("colors").notNullable();
      })
      .createTable("invoice_number", function (table) {
        table.increments("key");
        table.string("id").notNullable();
        table.string("number").notNullable();
      })
      .createTable("users", function (table) {
        table.increments("key");
        table.string("id").notNullable();
        table.string("userName").notNullable();
        table.string("pin").notNullable();
        table.string("department").notNullable();
        table.string("prevarges").notNullable();
        table.jsonb("notifications").notNullable();
      })
      .createTable("department_config", function (table) {
        table.increments("key");
        table.string("id").notNullable();
        table.string("dep_name").notNullable();
        table.string("theme").notNullable();
        table.string("phone").notNullable();
        table.string("shopNo").notNullable();
        table.string("road").notNullable();
        table.string("state").notNullable();
        table.string("country").notNullable();
        table.string("tpin").notNullable();
        table.string("taxType").notNullable();
        table.integer("taxRat").notNullable();
        table.string("association").notNullable();
        table.json("notifications").notNullable();
      })
      .createTable("financial_Report_number", function (table) {
        table.increments("key");
        table.integer("number").notNullable();
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("users")
    .dropTable("products")
    .dropTable("Tabs")
    .dropTable("TabList")
    .dropTable("invNum")
    .dropTable("qutNum")
    .dropTable("mulitProducts")
    .dropTable("inventory")
    .dropTable("inventory_transfer")
    .dropTable("work_period")
    .dropTable("department_config")
    .dropTable("invoice_number")
    .dropTable("group")
    .dropTable("customers")
    .dropTable("accounts")
    .dropTable("purchases_reports")
    .dropTable("financial_Report_number")
    .dropTable("sales_reports_tikets")
    .dropTable("sales_reports_totals");
};
