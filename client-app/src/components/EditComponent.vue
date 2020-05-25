<template>
    <div>
        <div v-if="editMode || item.id <= 0" class="dnnForm dnnEditBasicSettings" id="dnnEditBasicSettings">
            <fieldset>
                <div class="dnnFormItem">
                    <div><label for="itemName">[Resx:{key:"lblName"}]</label></div>
                    <input id="itemName" type="text" v-model="item.name" />
                </div>
                <div class="dnnFormItem">
                    <div><label for="itemDescription">[Resx:{key:"lblDescription"}]</label></div>
                    <textarea id="itemDescription" cols="20" rows="5" v-model="item.description"></textarea>
                </div>
                <div class="dnnFormItem">
                    <div><label for="itemUser">[Resx:{key:"lblAssignedUser"}]</label></div>
                    <select v-model="item.assignedUser">
                        <option v-for="user in users" v-bind:value="user.id">
                            {{ user.name }}
                        </option>
                    </select>
                </div>
            </fieldset>
            <a href="#" @click="saveItem" class="dnnPrimaryAction">[Resx:{key:"btnSubmit"}]</a>
            <a href="#" @click="cancelEdit" class="dnnSecondaryAction">[Resx:{key:"btnCancel"}]</a>
        </div>
        <div v-if="item.id > 0 && item.canedit">
            <a v-if="!editMode" @click="toggleEditMode" href="#">[Resx:{key:"EditItem"}]</a>
            <a @click="deleteItem" href="#">[Resx:{key:"DeleteItem"}]</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'edit-component',
        props: {
            msg: String
        },
        props: ['moduleid', 'id', 'name', 'description', 'canedit', 'assigned-user', 'users'],
        data: function () {
            return {
                editMode: false,
                item: {
                    id: this.id,
                    name: this.name,
                    description: this.description,
                    canedit: this.canedit,
                    assignedUser: this.assignedUser
                },
            }
        },
        methods: {
            toggleEditMode() {
                this.editMode = !this.editMode;
            },
            saveItem() {
                var self = this;
                EmptyModuleVue.SaveItem(moduleid,
                    {
                        id: self.item.id,
                        name: self.item.name,
                        description: self.item.description,
                        assignedUser: self.item.assignedUser
                    },
                    function (data) {
                        // onDone
                        self.editMode = false;
                        self.$emit('reload');
                    });
            },
            cancelEdit() {
                this.editMode = false;
                this.$emit("edit-cancelled");
            },
            deleteItem() {
                var self = this;
                EmptyModuleVue.DeleteItem(moduleid, this.item.id,
                    function () {
                        self.$emit('reload');
                    });
            },
        },
        mounted: function () {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
