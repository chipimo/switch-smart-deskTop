"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require('react');
var CanvasJS = require('./canvasjs.min');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;
var CanvasJSChart = /** @class */ (function (_super) {
    __extends(CanvasJSChart, _super);
    function CanvasJSChart(props) {
        var _this = _super.call(this, props) || this;
        _this.options = props.options ? props.options : {};
        _this.containerProps = props.containerProps ? props.containerProps : { width: "100%", position: "relative" };
        _this.containerProps.height = props.containerProps && props.containerProps.height ? props.containerProps.height : _this.options.height ? _this.options.height + "px" : "400px";
        _this.chartContainerId = "canvasjs-react-chart-container-" + CanvasJSChart._cjsContainerId++;
        return _this;
    }
    CanvasJSChart.prototype.componentDidMount = function () {
        //Create Chart and Render		
        this.chart = new CanvasJS.Chart(this.chartContainerId, this.options);
        this.chart.render();
        if (this.props.onRef)
            this.props.onRef(this.chart);
    };
    CanvasJSChart.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        //Check if Chart-options has changed and determine if component has to be updated
        return !(nextProps.options === this.options);
    };
    CanvasJSChart.prototype.componentDidUpdate = function () {
        //Update Chart Options & Render
        this.chart.options = this.props.options;
        this.chart.render();
    };
    CanvasJSChart.prototype.componentWillUnmount = function () {
        //Destroy chart and remove reference
        this.chart.destroy();
        if (this.props.onRef)
            this.props.onRef(undefined);
    };
    CanvasJSChart.prototype.render = function () {
        //return React.createElement('div', { id: this.chartContainerId, style: this.containerProps });		
        return React.createElement("div", { id: this.chartContainerId, style: this.containerProps });
    };
    CanvasJSChart._cjsContainerId = 0;
    return CanvasJSChart;
}(React.Component));
var CanvasJSReact = {
    CanvasJSChart: CanvasJSChart,
    CanvasJS: CanvasJS
};
exports.default = CanvasJSReact;
//# sourceMappingURL=canvasjs.react.js.map