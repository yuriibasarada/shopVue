<template>
    <div class="input-field col s12 single-select">
        <select v-model="selected" ref="singleSelect">
            <option value="" disabled selected>{{default_option}}</option>
            <option v-for="option in options" :key="option.id" :value="option.id">{{option.name}}</option>
        </select>
        <label>{{label}}</label>
    </div>
</template>

<script>
    export default {
        name: "SingleSelect",
        data: () => ({
            selected: null,
            singleSelect: null
        }),
        props: {
            options: {
                type: Array,
                default: () => []
            },
            default_option: {
                type: String,
                default: () => ''
            },
            label: {
                type: String,
                default: () => ''
            }
        },
        watch: {
            selected() {
                this.$emit('selectedOption' ,this.selected)
            }
        },
        mounted() {
            this.singleSelect = window.M.FormSelect.init(this.$refs.singleSelect)
        },
        beforeDestroy() {
            if(this.singleSelect && this.singleSelect.destroy) {
                this.singleSelect.destroy()
            }
        }
    }
</script>

<style lang="scss">

</style>