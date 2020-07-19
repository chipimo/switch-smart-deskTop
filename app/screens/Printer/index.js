"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_simple_code_editor_1 = require("react-simple-code-editor");
var prism_core_1 = require("prismjs/components/prism-core");
require("prismjs/components/prism-clike");
require("prismjs/components/prism-javascript");
var _code = "const formatCurrency = require(\"format-currency\");\nconst moment = require(\"moment\");\nconst escpos = require(\"escpos\");\nconst path = require(\"path\");\nescpos.USB = require(\"escpos-usb\");\n\nfunction Printer(data) {\n\n  const device = new escpos.USB();\n\n  const options = { encoding: \"GB18030\" /* default */ };\n  const printer = new escpos.Printer(device, options);\n\n  const tux = path.join(__dirname, \"assets/invoice_logo.png\");\n\n  var check = moment(new Date());\n\n  var time = check.format(\"LT\");\n  let opts = { format: \"%s%v %c\", code: \"ZMK\", symbol: \"K\" };\n\n    escpos.Image.load(tux, function (image) {\n\n        device.open(function (error) {\n\n//<--- Your Code Goes Here (Bettwen the lines)---->\n\n\n\n//<--- End ---->\n\n        });\n    });\n\n}\n";
var index = function (props) {
    var _a = React.useState(_code), code = _a[0], setCode = _a[1];
    return (React.createElement("div", { style: {
            backgroundColor: "rgb(14, 36, 36)",
            display: "flex",
        } },
        React.createElement("div", { style: { width: "50vw", height: "85vh", overflow: "auto" } },
            React.createElement(react_simple_code_editor_1.default, { value: code, onValueChange: function (codeEdit) { return setCode(codeEdit); }, highlight: function (code) { return prism_core_1.highlight(code, prism_core_1.languages.js); }, padding: 10, style: {
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 15,
                } })),
        React.createElement("div", null, "list")));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map