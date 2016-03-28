/**
 * Created by wangiv2 on 3/8/16.
 */

// F7 init and init pageEvent
F7.init();
F7.instance().onPageInit('mainMenu', function (page) {
    console.log("Init MainMenu page......");
    mainMenuModule.onPageInit(page);
});

$(document).ready(function () {
    console.log('document ready');

    setTimeout(function () {
        F7.instance().loginScreen();
    }, 1000);
});

var mainMenuModule = (function () {
    var param = {

    };

    var onPageInit = function () {
        if (!storage.isSupportedStorage()) {
            F7.instance().alert(commonMessage.notSupportLocalStorage);
            return;
        }
        // register a handler in JS, can be called by Native
        webViewBridge.registerJSHandler('jsFunction', function (data, responseCallback) {
            webViewBridge.JSLog('call jsFunction from native with data: ' + data);
            responseCallback("response from JS");
        });

    };

    var login = function () {
        webViewBridge.JSLog("JS call nativeFunction......");

        // call native handler
        webViewBridge.callNativeHandler('nativeFunction', {
            key: "caller",
            value: "js"
        }, function (responseData) {
            webViewBridge.JSLog("JS received response from native with data: " + responseData);
        });
    };

    return {
        onPageInit: onPageInit,
        login: login
    }
})();
