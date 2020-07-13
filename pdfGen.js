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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// import electron, { PrintToPDFOptions } from "electron";
var path_1 = require("path");
var formatCurrency = require("format-currency");
var electron = require("electron");
var fs = require("fs");
var showdown = require("showdown");
var BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;
var DEFAULT_OPTIONS = {
    basePath: __dirname,
    cssString: "",
    cssFiles: [],
    mdFlavor: "github",
    pdfOptions: {},
    showdownOptions: {},
    wrapperClasses: "",
    props: [],
};
function mdToPdfBuffer(md, options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var optionsWithDefaults = __assign({}, DEFAULT_OPTIONS, options);
                    var basePath = optionsWithDefaults.basePath, cssString = optionsWithDefaults.cssString, cssFiles = optionsWithDefaults.cssFiles, mdFlavor = optionsWithDefaults.mdFlavor, pdfOptions = optionsWithDefaults.pdfOptions, showdownOptions = optionsWithDefaults.showdownOptions, wrapperClasses = optionsWithDefaults.wrapperClasses, props = optionsWithDefaults.props;
                    //   console.log(props);
                    // Read and concatenate CSS files and CSS string
                    var css = "";
                    cssFiles.forEach(function (filePath) {
                        var fileString = fs.readFileSync(filePath, "utf8");
                        css += fileString + "\n\n";
                    });
                    css += cssString;
                    var converter = new showdown.Converter(showdownOptions);
                    showdown.setFlavor(mdFlavor);
                    // Convert Markdown to HTML
                    var html = converter.makeHtml(md);
                    var htmlWrapped = "\n\t\t\t<!DOCTYPE html>\n\t\t\t<html>\n\t\t\t\t<head>\n\t\t\t\t\t<base href=\"file://" + path_1.normalize(basePath) + "/\" />\n\t\t\t\t</head>\n\t\t\t\t<body>\n\t\t\t\t\t<div style=\"width:100%; width: 100%; height: 100%; text-align: center;\" >\n\t\t\t\t\t\t<h2 style=\"padding:0px\">Switch Smart</h2>\n\t\t\t\t\t\t<p>financial Report</p>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t<table\n\t\t\t\t\t\t\tstyle=\"\n\t\t\t\t\t\t\t\twidth: 98%;\n\t\t\t\t\t\t\t\tborderColor: ccc;\n\t\t\t\t\t\t\t\tborderWidth: 1;\n\t\t\t\t\t\t\t\tborderStyle: solid;\n\t\t\t\t\t\t\t\"\n\t\t\t\t\t    >\n\t\t\t\t\t\t\t<thead style=\"font-size: 14px; padding:6px\">\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>Invoice No</th>\n\t\t\t\t\t\t\t\t\t<th>Department</th>\n\t\t\t\t\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t\t\t\t\t<th>Cash sales</th>\n\t\t\t\t\t\t\t\t\t<th>Cash Discount</th>\n\t\t\t\t\t\t\t\t\t<th>Cash Credit</th>\n\t\t\t\t\t\t\t\t\t<th>Tax</th>\n\t\t\t\t\t\t\t\t\t<th>Total</th>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t" + (props.type === 'workPeriod' ?
                        props.SalesList.data.map(function (list, index) { return "\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td>" + list.SrNo + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + list.Department + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + list.Date + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + formatCurrency(list.RtxGrandTotal) + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + formatCurrency(list.Discount) + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + formatCurrency(list.RtxBalance) + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + formatCurrency(list.totalTax) + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + formatCurrency(list.RtxGrandTotal - list.Discount - list.RtxBalance) + " </td>\n\t\t\t\t\t\t\t\t</tr>"; })
                        : props.SalesList.data.map(function (list, index) { return "\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td>" + list.SrNo + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + list.Department + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + list.Date + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + formatCurrency(list.GrandTotal) + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + formatCurrency(list.Discount) + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + formatCurrency(list.Balance) + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + formatCurrency(list.totalTaxFinal) + " </td>\n\t\t\t\t\t\t\t\t\t<td>" + formatCurrency(list.GrandTotal - list.Discount - list.Balance) + " </td>\n\t\t\t\t\t\t\t\t</tr>"; })) + "\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</body>\n\t\t\t</html> \n\t\t";
                    var htmlEncoded = encodeURIComponent(htmlWrapped);
                    // Open new BrowserWindow and print it when it has finished loading
                    var pdfWindow = new BrowserWindow({
                        show: false,
                        webPreferences: {
                            nodeIntegration: false,
                            webSecurity: false,
                        },
                    });
                    pdfWindow.on("closed", function () {
                        // Allow `pdfWindow` to be garbage collected
                        // @ts-ignore
                        pdfWindow = null;
                    });
                    pdfWindow.webContents.on("did-finish-load", function () { return __awaiter(_this, void 0, void 0, function () {
                        var buffer, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, pdfWindow.webContents.insertCSS(css)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, 5, 6]);
                                    return [4 /*yield*/, pdfWindow.webContents.printToPDF(pdfOptions)];
                                case 3:
                                    buffer = _a.sent();
                                    resolve(buffer);
                                    return [3 /*break*/, 6];
                                case 4:
                                    err_1 = _a.sent();
                                    reject(err_1);
                                    return [3 /*break*/, 6];
                                case 5:
                                    pdfWindow.close();
                                    return [7 /*endfinally*/];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); });
                    // Load Markdown HTML into pdfWindow
                    pdfWindow.loadURL("data:text/html;charset=UTF-8," + htmlEncoded);
                })];
        });
    });
}
exports.mdToPdfBuffer = mdToPdfBuffer;
function mdToPdfFile(md, filePath, options) {
    return __awaiter(this, void 0, void 0, function () {
        var pdfBuffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mdToPdfBuffer(md, options)];
                case 1:
                    pdfBuffer = _a.sent();
                    fs.writeFileSync(filePath, pdfBuffer);
                    return [2 /*return*/];
            }
        });
    });
}
exports.mdToPdfFile = mdToPdfFile;
//# sourceMappingURL=pdfGen.js.map