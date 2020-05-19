var EmptyModuleVueSettings = EmptyModuleVueSettings || {};

EmptyModuleVue.services = {}; // we need a service reference for each module

jQuery(function ($) {
    EmptyModuleVueSettings.service.framework = $.ServicesFramework(0); // TODO
    EmptyModuleVueSettings.service.baseUrl = EmptyModuleVueSettings.service.framework.getServiceRoot(EmptyModuleVueSettings.service.path) + "Settings/";
});

EmptyModuleVueSettings.InitApp = function(moduleid) {
    var svc = {
        moduleid: moduleid,
        path: "40Fingers/EmptyModuleVue",
        framework: $.ServicesFramework(moduleid)
    };
    svc.baseUrl = svc.framework.getServiceRoot(svc.path) + "Item/";

    EmptyModuleVueSettings.services[`svc-${moduleid}`] = svc;

    new Vue({
        el: `#settings-${moduleid}`,
        computed: {
        },
        data: {
            message: "From Vue"
        },
        methods: {
        },
        mounted: function() {
        }
    });
}
