<template>
    <div>
        <h1>TEST</h1>
        <div>
            <a @click="loadItems" href="#">[Resx:{key:"Refresh"}]</a>
            <a v-if="userCanAdd" @click="addItem" href="#">[Resx:{key:"EditModule"}]</a>
        </div>
        <ul class="tm_tl">
            <li class="tm_t" v-for="(item, index) in items" :key="item.id">
                <h3>{{item.name}}</h3>
                <div class="tm_td">{{item.description}}</div>
                <edit-component :moduleid="moduleid"
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
                moduleid: 1386,
                addMode: false,
                editId: 0,
                items: [],
                users: [],
            }
        },
        methods: {
            loadItems() {
                var self = this;
                EmptyModuleVue.GetItemList(this.moduleid, function (data) {
                    self.items = data;
                });
            },
            loadUsers() {
                var self = this;
                EmptyModuleVue.GetUserList(this.moduleid, function (data) {
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
            this.loadItems();
            this.loadUsers();
        }
    }
</script>

<style>
</style>
