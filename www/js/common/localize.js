var commonMessage = {
    serviceError: "Service unavailable, please try again later.",
    permissionDenied: "Permission denied.",
    getUserProfileFaild: "Cannot get user profile. Please try again later.",
    logOff: "Are you sure you want to logoff?",
    notSupportLocalStorage: "Your browser does not support local storage. It may not carry out the action as expected.",
    fieldRequireText: "This field is required.",
    fieldMissingAlertText: "Some required field(s) is/are missing. Please check."
};
var opportunityMessage = {
    specify_value: "Please specify value.",
    leave_page: "Are you sure you want to leave without saving?",
    target_period_start_time: "Target Period time is required.",
    target_period_end_time: "Target Period time is required.",
    target_uncorrect_date: "Target Period end date you entered occurs before the start date.",
    trade: "Trade is required.",
    cargo_group: "Cargo Group is required",
    customer_required: "Customer is required",
    sales_required: "Sales is required",
    biz_nature: "Biz Nature is required",
    status: "Status is required",
    likelihood_of_success: "Likelihood of Success is required.",
    save_success: "Opportunity saved successfully.",
    save_failed: "Opportunity saved failed.",
    city_origin_required: "Please clear or complete the selection for Key Origin before save.",
    city_Destination_required: "Please clear or complete the selection for Key Destination before save.",
    services_required: "Please clear or complete the selection for Services before save."
};
var interactionMessage = {
    customer_need: "Customer is required before select Contact.",
    opportunity_noData: "No Opportunity is found.",
    opportunity_noDataForCustomer: "No Opportunity is found for the selected customer.",
    leave_detailPage: "Are you sure you want to leave without saving?",
    noMessageAlert: "Please input message!",
    sendMessageFailed: "Send message failed!",

    verification_Detail_sales: "Sales is required.",
    verification_Detail_customer: "Customer is required.",
    verification_Detail_type: "Type is required.",
    verification_Detail_timePeriodDate: "Time period date is required.",
    verification_Detail_timePeriodFrom: "Time period start time is required.",
    verification_Detail_timePeriodTo: "Time period end time is required.",
    verification_Detail_purpose: "Purpose is required.",
    verification_Detail_purposeOthers: "Purpose details is required.",
    verification_Detail_outcome: "Outcome is required.",
    save_success: "Interaction saved successfully.",
    save_failed: "Interaction saved failed."

};
var popupViewMessage = {
    specify_value: "Please specify value.",
    newSaveAlert_customer: "A temporary Customer is assigned. A request will be sent for creation once the record is saved.",
    newSaveAlert_contact: "A temporary Contact is assigned. A request will be sent for creation once the record is saved.",

    verification_AllFieldRequired: "Either one is required.",
    verification_customer_selectCity: "Please select city.",
    verification_customer_selectArea: "Please select Area",
    verification_customer_CPFID: "CPF ID search should input at least 5 characters.",
    verification_customer_companyName: "Company Name is required.",
    verification_customer_address: "Address is required.",
    verification_customer_country: "Country is required.",
    verification_customer_zip: "Zip/Postal Code is required.",
    verification_customer_officeNumber: "Office Number is required.",

    verification_contact_contactName: "Contact Name is required.",
    verification_contact_title: "Title is required.",
    verification_contact_phone: "Phone is required.",
    verification_contact_Email: "Email is required."
};

var localStoreKey = {
    userProfile: "userProfile",
    userPermission: "userPermission",

    opportunityDetailDropDownListData: "opportunity_detail_drop_down_list",
    interactionDetailDropDownListData: "interaction_detail_drop_down_list",

    opportunityDetailData: "opportunity_detail_data",
    opportunityInformation: "opportunity_information",

    interactionListData: "interactionListData",
    interactionDetailData: "interaction_detail_data",

    cacheData_interactionList: "cacheData_interactionList",
    cacheData_oppInteractionList: "cacheData_oppInteractionList",
    cacheData_opportunityCustomerList: "cacheData_opportunityCustomerList",

    intListCategory: "intListCategory",
    oppListCategory: "oppListCategory"
};

var featureID = {
    opportunityModule: "100.430.001.001",
    interactionModule: "100.430.001.002",
    interactionCommentModule: "100.430.001.003"
};

var templateName = {
    interactionListItem: "template_interaction_list_item",
    opportunityListItem: "template_opportunity_list_item",
    opportunitySecondListItem: "template_opportunity_second_list_item",
    template_opportunity_search_list_item: "template_opportunity_search_list_item"
};
