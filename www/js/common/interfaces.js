/**
 * Created by wangiv2 on 3/10/16.
 */

var interfaceConfig = {
    //host : "http://irisqa1.oocl.com",
    host : "http://wangiv2-2-w7.corp.oocl.com:3000",
    webURL: {
        mainMenu: "/mobile/oauth/sales/mainMenu",
        opportunity: "/mobile/oauth/sales/opportunity",
        opportunityItem: "/mobile/oauth/sales/opportunityItem",
        interaction: "/mobile/oauth/sales/interaction",
        interactionItem: "/mobile/oauth/sales/interactionItem",
        aboutThisApp: "/mobile/oauth/sales/about"
    },

    restURL: {
        //common
        getUserProfile: "/mobile/oauth/sales/rest/login",
        logoff: "/mobile/oauth/sales/rest/logout",
        getNumOfIntNewComment: "/mobile/oauth/sales/rest/getNumOfIntNewComment",
        searchSales: "/mobile/oauth/searchSales/doSearch",
        searchCustomer: "/mobile/oauth/searchCustomer/doSearch",
        searchContact: "/mobile/oauth/searchContact/doSearch",
        suggestCity: "/mobile/oauth/sales/rest/suggestCity",
        suggestArea: "/mobile/oauth/sales/rest/suggestArea",
        suggestService: "/mobile/oauth/sales/rest/suggestService",
        getAllCarriers: "/mobile/oauth/sales/rest/getAllCarriers",
        getAccessibleCarriers: "/mobile/agentrest/frm/userprofile/accessibleCarriers",

        //opportunity
        getOppCustomerList: "/mobile/oauth/opportunity/getOppCustomerList/doSearch",
        getOppList: "/mobile/oauth/opportunity/searchOpportunity/doSearch",
        searchOpportunity: "/mobile/oauth/opportunity/searchOpportunity/doSearch",
        getOppDropDown: "/mobile/oauth/sales/rest/getOppDropDown",
        saveOpportunity: "/mobile/oauth/sales/rest/saveOpportunity",
        getOppDetails: "/mobile/oauth/sales/rest/getOppDetails",

        //interaction
        getIntList: "/mobile/oauth/interaction/getIntList/doSearch",
        searchInteraction: "/mobile/oauth/interaction/searchInteraction/doSearch",
        getIntDropDown: "/mobile/oauth/sales/rest/getIntDropDown",
        saveInteraction: "/mobile/oauth/sales/rest/saveInteraction",
        getIntDetails: "/mobile/oauth/sales/rest/getIntDetails",
        getIntComment: "/mobile/oauth/interaction/getIntComment/doSearch",
        sendIntComment: "/mobile/oauth/sales/rest/sendIntComment",
        downAttachment: "/mobile/oauth/sales/rest/downAttachment"

    },

    templateURL: {
        popup: "/mobile/templates/sal/popup.jsp"
    },

    artURL: "/mobile/restful/frm/art/submit",
    interactionLogURL: "/mobile/oauth/sales/rest/sendInteractionLog"
};