/**
 * Created with JetBrains WebStorm.
 * User: WANGIV2
 * Date: 2/25/14
 * Time: 9:50 AM
 * To change this template use File | Settings | File Templates.
 */

var storage = (function(){

    var type = {
        session : "session",
        local : "local"
    };

    var isSupportedStorage = function(){
        try {
            var localStorageName = "localStorage";
            var supported = (localStorageName in window && window[localStorageName]);
            if (supported) {
                var storage = window.localStorage;
                storage.setItem("storage", "");
                storage.removeItem("storage");
                return supported;
            }
        }
        catch(err) {
            return false
        }
    };

    var getStorage = function(type){
        var storage = null;
        storage = type == "local" ? window.localStorage : window.sessionStorage;
        return storage;
    };

    var setStorageObjectData = function(key,value,type){
        var storage = getStorage(type);
        if(storage){
            storage.setItem(key, base64.encode(JSON.stringify(value)));
        }
    };
    var setStorageStringData = function(key,value,type){
        var storage = getStorage(type);
        if(storage){
            storage.setItem(key,base64.encode(value));
        }
    };
    var getStorageObjectData = function(key,type){
        var storage = getStorage(type);
        if(storage){
            var strData = storage.getItem(key);
            if(strData != null && strData != "undefined" && strData != ""){
                return JSON.parse(base64.decode(strData));
            }
        }
        return null;
    };
    var getStorageStringData = function(key,type){
        var storage = getStorage(type);
        if(storage != null){
            var strData = storage.getItem(key);
            if(strData != null && strData != "undefined" && strData != ""){
                return base64.decode(strData);
            }
        }
    };
    var clearStorage = function(key,type){
        var storage = getStorage(type);
        if(storage){
            storage.setItem(key,"");
        }
    };
    var removeStorage = function(key,type){
        var storage = getStorage(type);
        if(storage){
            storage.removeItem(key);
        }
    };

    var removeAllStorage = function(type){
        var storage = getStorage(type);
        if(storage){
            storage.clear();
        }
    }

    return {
        type : type,
        isSupportedStorage : isSupportedStorage,
        setStorageObjectData : setStorageObjectData,
        setStorageStringData : setStorageStringData,
        getStorageObjectData : getStorageObjectData,
        getStorageStringData : getStorageStringData,
        clearStorage : clearStorage,
        removeStorage : removeStorage,
        removeAllStorage : removeAllStorage
    }
})();