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
        webViewBridge.registerJSHandler('download_jsFunction', function (data, responseCallback) {
            responseCallback("response from JS");

            if (parseInt(data.progressData) < 100) {
                vm.progressData(data.progressData + '%');
            } else {
                webViewBridge.JSLog("stopCallNative = true");
                vm.progressData('Completed');
                vm.downloadBtnText('Update');
            }
        });
        ko.applyBindings(vm, document.getElementById('download'));
    };
    return {
        onPageInit: onPageInit
    }
})();

var viewModel = function (data, startDownload) {
    var self = this;
    self.appName = ko.observable('Notify');
    self.progressData = ko.observable('0%');
    self.downloadBtnText = ko.observable('Download');
    self.downloadBtnClick = function () {
        webViewBridge.callNativeHandler('download_nativeFunction', {
            downloadAppName: self.appName()
        }, function (responseData) {});
    };
};
