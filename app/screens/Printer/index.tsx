import React = require("react");
import { connect } from "react-redux";
import Editor from "react-simple-code-editor";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

const _code = `const formatCurrency = require("format-currency");
const moment = require("moment");
const escpos = require("escpos");
const path = require("path");
escpos.USB = require("escpos-usb");

function Printer(data) {

  const device = new escpos.USB();

  const options = { encoding: "GB18030" /* default */ };
  const printer = new escpos.Printer(device, options);

  const tux = path.join(__dirname, "assets/invoice_logo.png");

  var check = moment(new Date());

  var time = check.format("LT");
  let opts = { format: "%s%v %c", code: "ZMK", symbol: "K" };

    escpos.Image.load(tux, function (image) {

        device.open(function (error) {

//<--- Your Code Goes Here (Bettwen the lines)---->



//<--- End ---->

        });
    });

}
`;

const index = (props) => {
  const [code, setCode] = React.useState(_code);

  return (
    <div
      style={{
        backgroundColor: "rgb(14, 36, 36)",
        display: "flex",
      }}
    >
      <div style={{ width: "50vw", height: "85vh", overflow: "auto" }}>
        <Editor
          value={code}
          onValueChange={(codeEdit) => setCode(codeEdit)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 15,
          }}
        />
      </div>
      <div>list</div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
