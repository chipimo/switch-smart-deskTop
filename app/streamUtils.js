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
var Transform = require('stream').Transform;
var PrefixedStream = /** @class */ (function (_super) {
    __extends(PrefixedStream, _super);
    function PrefixedStream(prefixRow) {
        var _this = _super.call(this) || this;
        _this.prefixRow = prefixRow;
        _this.isFirstChunk = true;
        return _this;
    }
    PrefixedStream.prototype._transform = function (chunk, encoding, callback) {
        if (this.isFirstChunk) {
            this.isFirstChunk = false;
            this.push(this.prefixRow);
            this.push('\n');
        }
        this.push(chunk);
        callback();
    };
    return PrefixedStream;
}(Transform));
//# sourceMappingURL=streamUtils.js.map