/**
 * Created by wangiv2 on 3/14/16.
 */
var webViewBridge = (function () {
    var param = {
        bridge : null
    };

    var bridge = function(callback){
        if(param.bridge!=null){
            callback();
        }
        else {
            setupBridge(function (_bridge) {
                param.bridge = _bridge;
                callback();
            });
        }
    };

    var registerJSHandler = function (functionName,responseCallback) {
        // register JS function can be called from native
        bridge(function () {
            param.bridge.registerHandler(functionName, responseCallback);
        });
    };

    var callNativeHandler = function (functionName,data,responseCallback) {
        bridge(function () {
            param.bridge.callHandler(functionName,data,responseCallback);
        });
    };
    
    var JSLog = function (data) {
        callNativeHandler("JSLog",data);
    };

    var setupBridge = function(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() {
            document.documentElement.removeChild(WVJBIframe)
        }, 0);
    };

    return {
        bridge : bridge,
        registerJSHandler : registerJSHandler,
        callNativeHandler : callNativeHandler,
        JSLog : JSLog
    }
})();
