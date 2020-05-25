<template>
    <div ref="approot">
        <div>
            <a @click="loadItems" href="#">{{resx.Refresh}}</a>
            <a v-if="userCanAdd" @click="addItem" href="#">{{resx.EditModule}}</a>
        </div>
        <ul class="tm_tl">
            <li class="tm_t" v-for="(item, index) in items" :key="item.id">
                <h3>{{item.name}}</h3>
                <div class="tm_td">{{item.description}}</div>
                <edit-component :moduleid="moduleid" :tabid="tabid" :resx="resx"
                                :id="item.id"
                                :name="item.name"
                                :description="item.description"
                                :canedit="item.canEdit"
                                :assigned-user="item.assignedUser"
                                :users="users"
                                v-on:reload="loadItems"
                                v-on:edit-cancelled="cancelAdd"></edit-component>
            </li>
        </ul>
    </div>
</template>

<script>
    import EditComponent from './components/EditComponent.vue'

    export default {
        name: 'App',
        components: {
            EditComponent
        },
        computed: {
            userCanAdd: function () {
                // todo: editmode
                return true && (this.items.length == 0 || this.items[0].id > 0);
            }
        },
        data: function () {
            return {
                moduleid: 0,
                tabid: 0,
                addMode: false,
                editId: 0,
                items: [],
                users: [],
                resx: {},
            }
        },
        methods: {
            loadResx() {
                var self = this;
                EmptyModuleVue.GetResxList(this.tabid, this.moduleid, "View", function (data) {
                    self.resx = data;
                });
            },
            loadItems() {
                var self = this;
                EmptyModuleVue.GetItemList(this.tabid, this.moduleid, function (data) {
                    self.items = data;
                });
            },
            loadUsers() {
                var self = this;
                EmptyModuleVue.GetUserList(this.tabid, this.moduleid, function (data) {
                    self.users = data;
                });
            },
            addItem(item) {
                this.items.unshift({ id: 0 });
            },
            cancelAdd() {
                if (this.items.length > 0 && this.items[0].id === 0) {
                    this.items.splice(0, 1);
                }
            },
        },
        mounted: function () {
            this.moduleid = Number(this.$refs.approot.parentNode.attributes["data-moduleid"].nodeValue);
            this.tabid = Number(this.$refs.approot.parentNode.attributes["data-tabid"].nodeValue);
            this.loadItems();
            this.loadResx();
            this.loadUsers();
        }
    }
</script>

<style>
</style>
