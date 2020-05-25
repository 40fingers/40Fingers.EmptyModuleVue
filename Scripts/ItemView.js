var EmptyModuleVue = EmptyModuleVue || {};

EmptyModuleVue.services = {}; // we need a service reference for each module


EmptyModuleVue.GetItemList = function (tabid, moduleid, onDone) {
    // get the service for this module from the services object
    var svc = EmptyModuleVue.services[`svc-${moduleid}`];

    if (typeof(svc) === "undefined") {
        svc = {
            moduleid: moduleid,
            path: "40Fingers/EmptyModuleVue",
            framework: $.ServicesFramework(moduleid)
        };
        svc.baseUrl = svc.framework.getServiceRoot(svc.path) + "Item/";

        // add the service to the object containg all services in case multiple modules are placed on the page
        EmptyModuleVue.services[`svc-${moduleid}`] = svc;
    }

    //beforeSend: svc.framework.setModuleHeaders,
    var jqXHR = $.ajax({
        url: svc.baseUrl,
        beforeSend: function(request) {
            request.setRequestHeader("moduleid", moduleid);
            request.setRequestHeader("tabid", tabid);
        },
        dataType: "json"
    }).done(function (data) {
        if (typeof (onDone) === "function") {
            onDone(data);
        }
    });
}

EmptyModuleVue.SaveItem = function (tabid, moduleid, editItem, onDone, onFail) {
    // get the service for this module from the services object
    var svc = EmptyModuleVue.services[`svc-${moduleid}`];
    var ajaxMethod = "POST";
    var restUrl = svc.baseUrl;

    if (editItem.id > 0) {
        // ajaxMethod = "PATCH";
        restUrl += editItem.id;
    }
    var jqXHR = $.ajax({
        method: ajaxMethod,
        url: restUrl,
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(editItem),
        beforeSend: function(request) {
            request.setRequestHeader("moduleid", moduleid);
            request.setRequestHeader("tabid", tabid);
        },
        dataType: "json"
    }).done(function (data) {
        if (typeof (onDone) === "function") {
            onDone(data);
        }
    }).always(function (data) {
    });
};

EmptyModuleVue.DeleteItem = function (tabid, moduleid, id, onDone, onFail) {
    // get the service for this module from the services object
    var svc = EmptyModuleVue.services[`svc-${moduleid}`];
    var restUrl = svc.baseUrl + id;
    var jqXHR = $.ajax({
        method: "DELETE",
        url: restUrl,
        beforeSend: function(request) {
            request.setRequestHeader("moduleid", moduleid);
            request.setRequestHeader("tabid", tabid);
        },
    }).done(function () {
        if (typeof (onDone) === "function") {
            onDone();
        }
    }).fail(function () {
    }).always(function (data) {
    });
};

EmptyModuleVue.GetUserList = function (tabid, moduleid, onDone) {
    // get the service for this module from the services object
    var svc = EmptyModuleVue.services[`svc-${moduleid}`];
    // need to calculate a different Url for User service
    var restUrl = svc.framework.getServiceRoot(svc.path) + "User/";
    var jqXHR = $.ajax({
        url: restUrl,
        beforeSend: function(request) {
            request.setRequestHeader("moduleid", moduleid);
            request.setRequestHeader("tabid", tabid);
        },
        dataType: "json",
        async: false
    }).done(function (data) {
        if (typeof (onDone) === "function") {
            onDone(data);
        }
    }).always(function (data) {
    });
};

EmptyModuleVue.GetResxList = function (tabid, moduleid, filename, onDone) {
    // get the service for this module from the services object
    var svc = EmptyModuleVue.services[`svc-${moduleid}`];
    // need to calculate a different Url for User service
    var restUrl = svc.framework.getServiceRoot(svc.path) + "Resx/?filename=" + filename;
    var jqXHR = $.ajax({
        url: restUrl,
        beforeSend: function(request) {
            request.setRequestHeader("moduleid", moduleid);
            request.setRequestHeader("tabid", tabid);
        },
        dataType: "json",
        async: false
    }).done(function (data) {
        if (typeof (onDone) === "function") {
            onDone(data);
        }
    }).always(function (data) {
    });
};
