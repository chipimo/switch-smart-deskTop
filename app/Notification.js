"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_audio_player_1 = require("react-audio-player");
var Notification = function (props) {
    return (React.createElement("div", null,
        React.createElement(react_audio_player_1.default, { src: './assets/audios/long-expected.mp3' })));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Notification);
//# sourceMappingURL=Notification.js.map