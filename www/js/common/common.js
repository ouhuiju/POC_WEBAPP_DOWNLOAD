/**
 * Created by wangiv2 on 3/8/16.
 */

var commonFunction = (function(){

    var loadDataWithAjax = function(postData,url,param,callBackSucceed,callBackFailed) {
        if(param.showLoading){
            if(param.loadingText){
                if(param.myApp){
                    param.myApp.showIndicator();
                }
            }
            else {
                if(param.myApp){
                    param.myApp.showIndicator();
                }
            }
        }
        jQuery.support.cors = true;
        console.log("url: " + url);
        return $.ajax({
            type : (param.callType != null)?(param.callType||'POST'):'POST',
            url : interfaceConfig.host + url,
            //contentType : (param.contentType != null)?(param.contentType||'application/json'):'application/json',
            dataType : (param.dataType != null)?(param.dataType||'json'):'json',
            cache : false,
            data: postData,
            success : function(data, textStatus, request) {
                console.log('call success');
                if(param.showLoading){
                    if(param.myApp){
                        param.myApp.hideIndicator();
                    }
                }
                if(data.success == false){
                    if(callBackFailed){
                        callBackFailed(data.error);
                    }
                    return;
                }
                if (callBackSucceed){
                    callBackSucceed(data);
                }
            },
            error : function(XMLHttpRequest,textStatus, errorThrown) {
                console.log('call fail: ' + errorThrown);
                if(param.showLoading){
                    if(param.myApp){
                        param.myApp.hideIndicator();
                    }
                }
                if(textStatus == "abort"){
                    return;
                };
                if(callBackFailed){
                    callBackFailed();
                }
            }
        });
    };

    var nullValueCheck = function (obj) {
        var value = obj.val();
        if(value == undefined || value == null || value == ""){
            return true;
        }
        else {
            return false;
        }
    };

    var validation = {
        emailFormatCheck : function () {
            if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)) {
                return false;
            }
            return true;
        },
        numberValueCheck : function (event) {
            var keyCode = event.which;
            if (keyCode == 46 || keyCode == 8 || keyCode == 37 || keyCode == 39 || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) ) {
                return true;
            }
            else {
                return false
            }
        },
        floatValueCheck : function (event) {
            var keyCode = event.which;
            if (keyCode == 110 || keyCode == 190 || keyCode == 46 || keyCode == 8 || keyCode == 37 || keyCode == 39 || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) ) {
                return true;
            }
            else {
                return false
            }
        }
    };

    // sort on key values
    var arraySort = function(key,desc) {
        return function(a,b){
            return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
        }
    };

    var callNativeFunction = function(src){
        var iframe = document.createElement("iframe");
        iframe.src = src;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    };

    return {
        loadDataWithAjax : loadDataWithAjax,
        nullValueCheck : nullValueCheck,
        validation : validation,
        arraySort : arraySort,
        callNativeFunction : callNativeFunction
    }
})();