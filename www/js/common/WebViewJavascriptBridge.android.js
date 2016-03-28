/**
 * Created by chenac on 3/24/16.
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
                     setupBridge(function(bridge) {
                                 bridge.init(function(message, responseCallback) {
                                             var data = {
                                             'Javascript Responds': 'bridge init!'
                                             };
                                             responseCallback(data);
                                             });
                                 
                                 param.bridge = bridge;
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
                     callback(WebViewJavascriptBridge)
                     } else {
                     document.addEventListener(
                                               'WebViewJavascriptBridgeReady'
                                               , function() {
                                               callback(WebViewJavascriptBridge)
                                               },
                                               false
                                               );
                     }
                     };
                     
                     return {
                     bridge : bridge,
                     registerJSHandler : registerJSHandler,
                     callNativeHandler : callNativeHandler,
                     JSLog : JSLog
                     }
                     })();
