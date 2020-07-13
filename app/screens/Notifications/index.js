"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var notistack_1 = require("notistack");
// let audio = new Audio("../../assets/audios/insight.mp3");
var AlertUi = function (props) {
    return React.createElement("div", null);
};
var Notifications = function (props) {
    React.useEffect(function () {
        if (props.StackNotify) {
            if (props.StackNotify.open) {
                // audio.play();
                var message = props.StackNotify.message;
                props.enqueueSnackbar(message, {
                    anchorOrigin: {
                        vertical: props.StackNotify.vertical,
                        horizontal: props.StackNotify.horizontal
                    },
                    variant: props.StackNotify.variant
                    //   content={(key, message) => (
                    //     <MyCustomChildren id={key} message={message} />
                    // )}
                });
                props.dispatchEvent({ type: "DISMISS" });
            }
        }
    }, [props]);
    return React.createElement("div", null);
};
var mapStateToProps = function (state) {
    return {
        StackNotify: state.StackNotify
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); }
    };
};
exports.default = notistack_1.withSnackbar(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Notifications));
//# sourceMappingURL=index.js.map