const EmptyModuleVue = {
    baseUrl: "/API/40Fingers/EmptyModuleVue",

    service: {
        baseUrl : "/API/40Fingers/EmptyModuleVue",
        setModuleHeaders : function(request, moduleid, tabid) {
            request.setRequestHeader("moduleid", moduleid);
            request.setRequestHeader("tabid", tabid);
        }
    },

    GetItemList (tabid, moduleid, onDone) {
        $.ajax({
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
    },

    SaveItem (tabid, moduleid, editItem, onDone, onFail) {
        $.ajax({
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
        }).fail(function() {
            if (typeof (onFail) === "function") {
                onFail();
            }
        }).always(function () {
        });
    },

    DeleteItem: function (tabid, moduleid, id, onDone, onFail) {
        $.ajax({
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
            if (typeof (onFail) === "function") {
                onFail();
            }
        }).always(function () {
        });
    },

    GetUserList (tabid, moduleid, onDone) {
        $.ajax({
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
        }).always(function () {
        });
    },

    GetResxList: function (tabid, moduleid, filename, onDone) {
        $.ajax({
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
        }).always(function () {
        });
    },

};

export default EmptyModuleVue;