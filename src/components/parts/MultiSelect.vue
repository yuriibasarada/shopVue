<template>
    <div class="input-field col s12 multi-select">
        <select v-model="selected" ref="multiSelect" multiple>
            <option value="" disabled selected>{{defaultOption}}</option>
            <option v-for="option in options" :key="option.id" :value="option.id">{{option.name}}</option>
        </select>
        <label>{{label | capitalize}}</label>
    </div>
</template>

<script>
    export default {
        name: "MultiSelect",
        data: () => ({
            multiSelect: null,
            selected: []
        }),
        props: {
            options: {
                type: Array,
                default: () => []
            },
            defaultOption: {
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
                this.$emit('selectedOptions', {values: this.selected, type: this.label})
            }
        },
        mounted() {
            this.multiSelect = window.M.FormSelect.init(this.$refs.multiSelect)
        },
        beforeDestroy() {
            if (this.multiSelect && this.multiSelect.destroy) {
                this.multiSelect.destroy()
            }
        }
    }
</script>

<style lang="scss">
    .multi-select {
        margin: 5vmin 1vmin!important;
        .select-wrapper {
            input {
                color: white;
            }
            label {
                font-size: 10vmin!important;
            }
        }
    }
</style>