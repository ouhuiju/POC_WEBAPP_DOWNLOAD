/**
 * Created by wangiv2 on 3/14/16.
 */
F7.init();
F7.instance().onPageInit('about', function (page) {
    console.log("Init About page......");
    aboutModule.onPageInit(page);
});


var aboutModule = (function () {
    var onPageInit = function () {
        if (!storage.isSupportedStorage()) {
            F7.instance().alert(commonMessage.notSupportLocalStorage);
            return;
        }

        // register a handler in JS, can be called by Native
        webViewBridge.registerJSHandler('about_jsFunction', function (data, responseCallback) {
            webViewBridge.JSLog('call about_jsFunction from native with data: ' + data);
            responseCallback("response from JS");
        });

        setTimeout(function () {
            // call native handler
            webViewBridge.callNativeHandler('about_nativeFunction', {
                key: "caller",
                value: "js_about"
            }, function (responseData) {
                webViewBridge.JSLog("JS received response from native with data: " + responseData);
            });
        }, 1000);
    };

    return {
        onPageInit: onPageInit
    }
})();
