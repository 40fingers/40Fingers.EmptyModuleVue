var EmptyModuleVue = EmptyModuleVue || {};

EmptyModuleVue.baseUrl = "/API/40Fingers/EmptyModuleVue";
EmptyModuleVue.service = {
    baseUrl : "/API/40Fingers/EmptyModuleVue",
    setModuleHeaders : function(request, moduleid, tabid) {
        request.setRequestHeader("moduleid", moduleid);
        request.setRequestHeader("tabid", tabid);
    }
};
EmptyModuleVue.GetItemList = function (tabid, moduleid, onDone) {
    var jqXHR = $.ajax({
        url: EmptyModuleVue.service.baseUrl + "/Item/",
        beforeSend: function(request) {
            EmptyModuleVue.service.setModuleHeaders(request, moduleid, tabid);
        },
        dataType: "json"
    }).done(function (data) {
        if (typeof (onDone) === "function") {
            onDone(data);
        }
    });
}

EmptyModuleVue.SaveItem = function (tabid, moduleid, editItem, onDone, onFail) {
    var jqXHR = $.ajax({
        method: "POST",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(editItem),
        url: EmptyModuleVue.service.baseUrl + "/Item/" + editItem.id,
        beforeSend: function(request) {
            EmptyModuleVue.service.setModuleHeaders(request, moduleid, tabid);
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
    var jqXHR = $.ajax({
        method: "DELETE",
        url: EmptyModuleVue.service.baseUrl + "/Item/" + id,
        beforeSend: function(request) {
            EmptyModuleVue.service.setModuleHeaders(request, moduleid, tabid);
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
    var jqXHR = $.ajax({
        url: EmptyModuleVue.service.baseUrl + "/User/",
        beforeSend: function(request) {
            EmptyModuleVue.service.setModuleHeaders(request, moduleid, tabid);
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
    var jqXHR = $.ajax({
        url: EmptyModuleVue.service.baseUrl + "/Resx/?filename=" + filename,
        beforeSend: function(request) {
            EmptyModuleVue.service.setModuleHeaders(request, moduleid, tabid);
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
