F7.init();
F7.instance().onPageInit('download', function (page) {
    console.log("Init Download page......");
    downloadModule.onPageInit(page);
});

var downloadModule = (function () {
    var onPageInit = function () {
        if (!storage.isSupportedStorage()) {
            F7.instance().alert(commonMessage.notSupportLocalStorage);
            return;
        }
        var vm = new viewModel();
        ko.applyBindings(vm, document.getElementById('download'));
    };
    return {
        onPageInit: onPageInit
    }
})();

var viewModel = function (data, startDownload) {
    var self = this;
    self.appName = ko.observable('OOCL Lite');
    self.progressData = ko.observable('0%');
    self.downloadBtnText = ko.observable('Download');
    self.downloadBtnClick = function () {
        webViewBridge.registerJSHandler('download_jsFunction', function (data, responseCallback) {
            webViewBridge.JSLog('call download_jsFunction from native with data: ' + data);
            responseCallback("response from JS");
        });
        var callNativeInterval = setInterval(function () {
            // call native handler
            webViewBridge.callNativeHandler('download_nativeFunction', {
                key: "caller",
                value: "js_about"
            }, function (responseData) {
                webViewBridge.JSLog("JS received response from native with data: " + responseData);
                if (parseInt(responseData) < 100) {
                    self.progressData(responseData + '%');
                } else {
                    webViewBridge.JSLog("stopCallNative = true");

                    clearInterval(callNativeInterval);

                    self.progressData('Completed');
                    self.downloadBtnText('Update');
                }
            });
        }, 100);
    };
};
