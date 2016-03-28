/**
 * Created by wangiv2 on 3/8/16.
 */

/**
 * Framework7 init, one page is one application
 * Include app instance, page event
 */
var F7 = (function(){
    var param = {
        app : null,
        mainView : null
    };
    var init = function(){
        // new F7
        param.app = new Framework7({
            init: false
        });
        // Add view
        param.mainView = param.app.addView('.view-main', {
            dynamicNavbar: true,
            animateNavBackIcon: true
        });

        // init F7
        param.app.init();

    };
    var instance = function(){
        return param.app;
    };
    var mainView = function(){
        return param.mainView;
    };

    return {
        instance : instance,
        mainView : mainView,
        init : init
    };
})();