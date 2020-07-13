"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatCurrency = require("format-currency");
var moment = require("moment");
var escpos = require("escpos");
var path = require("path");
escpos.USB = require("escpos-usb");
function Printer(data) {
    // console.log(data);
    var device = new escpos.USB();
    var options = { encoding: "GB18030" /* default */ };
    var printer = new escpos.Printer(device, options);
    var tux = path.join(__dirname, "assets/invoice_logo.png");
    var check = moment(new Date());
    var time = check.format("LT");
    var opts = { format: "%s%v %c", code: "ZMK", symbol: "K" };
    escpos.Image.load(tux, function (image) {
        device.open(function (error) {
            printer.align("ct").image(image, "s8");
            printer
                .font("a")
                .align("ct")
                .style("bu")
                .size(1, 1)
                .text(data.ticketHeader + ":" + data.invoiceNumber)
                .text(data.shop)
                .text(data.department)
                .text(data.road)
                .text(" ")
                .size(1, 2)
                .text("Tel: +260 975 30 30 30")
                .text(data.ticketstate)
                .text(" ")
                .size(1, 1)
                .tableCustom([
                { text: "JR Liberty LTD", align: "LEFT", width: 0.4 },
                { text: " ", align: "CENTER", width: 0.19 },
                { text: "TPIN: 1003938315", align: "RIGHT", width: 0.44 },
            ])
                .tableCustom([
                {
                    text: "Date: " + data.date,
                    align: "LEFT",
                    width: 0.44,
                },
                { text: " ", align: "CENTER", width: 0.2 },
                { text: "Time: " + data.time, align: "RIGHT", width: 0.4 },
            ])
                .tableCustom([
                { text: "Casher : " + data.user, align: "LEFT", width: 1 },
            ])
                .text(" ")
                .text("---------------------------------------------");
            data.items.forEach(function (element) {
                printer.tableCustom([
                    {
                        text: element.ItemName + " x " + element.Qty,
                        align: "LEFT",
                        width: 0.49,
                    },
                    { text: " ", align: "CENTER", width: 0.16 },
                    {
                        text: formatCurrency(element.Price, opts),
                        align: "RIGHT",
                        width: 0.35,
                    },
                ]);
            });
            // if (data.isTaxInvoice) {
            //   printer.text("=============================================");
            //   printer
            //     .tableCustom([
            //       { text: " ", align: "LEFT", width: 0.49 },
            //       { text: " ", align: "CENTER", width: 0.55 },
            //       {
            //         text: `%${data.taxRate} Tax Amount: ${data.taxRate / 100}`,
            //         align: "RIGHT",
            //         width: 1,
            //       },
            //     ])
            //     .tableCustom([
            //       { text: " ", align: "LEFT", width: 0.49 },
            //       { text: " ", align: "CENTER", width: 0.55 },
            //       {
            //         text: `Taxable Amount: ${formatCurrency(data.totalTax, opts)}`,
            //         align: "RIGHT",
            //         width: 1,
            //       },
            //     ]);
            // }
            printer
                .text("================================================")
                .size(1, 2)
                .tableCustom([
                { text: "Total:", align: "LEFT", width: 0.44 },
                { text: " ", align: "CENTER", width: 0.22 },
                {
                    text: formatCurrency(data.GrandTotal),
                    align: "RIGHT",
                    width: 0.33,
                },
            ]);
            data.ticketHeader !== "Quotation"
                ? printer
                    .tableCustom([
                    { text: "Change:", align: "LEFT", width: 0.44 },
                    { text: " ", align: "CENTER", width: 0.22 },
                    {
                        text: formatCurrency(data.ChangeDue),
                        align: "RIGHT",
                        width: 0.33,
                    },
                ])
                    .tableCustom([
                    { text: "Balance:", align: "LEFT", width: 0.44 },
                    { text: " ", align: "CENTER", width: 0.22 },
                    {
                        text: formatCurrency(data.Balance),
                        align: "RIGHT",
                        width: 0.33,
                    },
                ])
                : null;
            printer.tableCustom([
                { text: "Tax:", align: "LEFT", width: 0.44 },
                { text: " ", align: "CENTER", width: 0.22 },
                {
                    text: formatCurrency(data.totalTax),
                    align: "RIGHT",
                    width: 0.33,
                },
            ]);
            if (data.Discount !== 0)
                printer.tableCustom([
                    { text: "Discount", align: "LEFT", width: 0.44 },
                    { text: " ", align: "CENTER", width: 0.22 },
                    {
                        text: formatCurrency(data.Discount),
                        align: "RIGHT",
                        width: 0.33,
                    },
                ]);
            printer
                .tableCustom([
                { text: "" + data.paymentType, align: "LEFT", width: 0.44 },
                { text: " ", align: "CENTER", width: 0.22 },
                {
                    text: formatCurrency(data.AmountPaid),
                    align: "RIGHT",
                    width: 0.33,
                },
            ])
                .text("================================================")
                .size(2, 2)
                .text("THANK YOU & VISIT AGAIN")
                .text(" ")
                .text(" ")
                .cut()
                .close();
        });
    });
}
exports.default = Printer;
//# sourceMappingURL=Printer.js.map