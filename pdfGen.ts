// import electron, { PrintToPDFOptions } from "electron";
import { normalize } from "path";

const formatCurrency = require("format-currency");
const electron = require("electron");
const fs = require("fs");
const showdown = require("showdown");

const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;

interface Options {
  basePath: string;
  cssString: string;
  cssFiles: string[];
  mdFlavor: showdown.Flavor;
  pdfOptions: {};
  showdownOptions: showdown.ShowdownOptions;
  wrapperClasses: string;
  props: [];
}

const DEFAULT_OPTIONS: Options = {
  basePath: __dirname,
  cssString: "",
  cssFiles: [],
  mdFlavor: "github",
  pdfOptions: {},
  showdownOptions: {},
  wrapperClasses: "",
  props: [],
};

export async function mdToPdfBuffer(
  md: string,
  options: Partial<Options>
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const optionsWithDefaults = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
    const {
      basePath,
      cssString,
      cssFiles,
      mdFlavor,
      pdfOptions,
      showdownOptions,
      wrapperClasses,
      props,
    } = optionsWithDefaults;
    //   console.log(props);

    // Read and concatenate CSS files and CSS string
    let css = "";
    cssFiles.forEach((filePath) => {
      const fileString = fs.readFileSync(filePath, "utf8");
      css += `${fileString}\n\n`;
    });
    css += cssString;

    const converter = new showdown.Converter(showdownOptions);
    showdown.setFlavor(mdFlavor);

    // Convert Markdown to HTML
    const html = converter.makeHtml(md);
    const htmlWrapped = `
			<!DOCTYPE html>
			<html>
				<head>
					<base href="file://${normalize(basePath)}/" />
				</head>
				<body>
					<div style="width:100%; width: 100%; height: 100%; text-align: center;" >
						<h2 style="padding:0px">Switch Smart</h2>
						<p>financial Report</p>
						<div>
						<table
							style="
								width: 98%;
								borderColor: ccc;
								borderWidth: 1;
								borderStyle: solid;
							"
					    >
							<thead style="font-size: 14px; padding:6px">
								<tr>
									<th>Invoice No</th>
									<th>Department</th>
									<th>Date</th>
									<th>Cash sales</th>
									<th>Cash Discount</th>
									<th>Cash Credit</th>
									<th>Tax</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
							${props.type==='workPeriod'?
								props.SalesList.data.map((list, index) => `
								<tr>
									<td>${list.SrNo} </td>
									<td>${list.Department} </td>
									<td>${list.Date} </td>
									<td>${formatCurrency(list.RtxGrandTotal)} </td>
									<td>${formatCurrency(list.Discount)} </td>
									<td>${formatCurrency(list.RtxBalance)} </td>
									<td>${formatCurrency(list.totalTax)} </td>
									<td>${formatCurrency(list.RtxGrandTotal - list.Discount - list.RtxBalance)} </td>
								</tr>`)
								:props.SalesList.data.map((list, index) => `
								<tr>
									<td>${list.SrNo} </td>
									<td>${list.Department} </td>
									<td>${list.Date} </td>
									<td>${formatCurrency(list.GrandTotal)} </td>
									<td>${formatCurrency(list.Discount)} </td>
									<td>${formatCurrency(list.Balance)} </td>
									<td>${formatCurrency(list.totalTaxFinal)} </td>
									<td>${formatCurrency(list.GrandTotal - list.Discount - list.Balance)} </td>
								</tr>`)}
								
							</tbody>
						</table>
						</div>
					</div>
				</body>
			</html> 
		`;
    const htmlEncoded = encodeURIComponent(htmlWrapped);

    // Open new BrowserWindow and print it when it has finished loading
    let pdfWindow = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: false,
        webSecurity: false, // Required for loading local resources (e.g. images)
      },
    });
    pdfWindow.on("closed", () => {
      // Allow `pdfWindow` to be garbage collected
      // @ts-ignore
      pdfWindow = null;
    });
    pdfWindow.webContents.on("did-finish-load", async () => {
      await pdfWindow.webContents.insertCSS(css);
      let buffer;
      try {
        buffer = await pdfWindow.webContents.printToPDF(pdfOptions);
        resolve(buffer);
      } catch (err) {
        reject(err);
      } finally {
        pdfWindow.close();
      }
    });

    // Load Markdown HTML into pdfWindow
    pdfWindow.loadURL(`data:text/html;charset=UTF-8,${htmlEncoded}`);
  });
}

export async function mdToPdfFile(
  md: string,
  filePath: string,
  options: Partial<Options>
): Promise<void> {
  const pdfBuffer = await mdToPdfBuffer(md, options);
  fs.writeFileSync(filePath, pdfBuffer);
}
