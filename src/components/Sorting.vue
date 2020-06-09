<template>
    <div class="sorting">
        <h1 v-if="loader">Loader</h1>
        <single-select
                v-else
                :options="SORT"
                :default_option="defaultOption"
                :label="'Sorting'"
                :current_option="sort_id"
                @selectedOption="selectedOption"
        />
    </div>
</template>

<script>
    import SingleSelect from "./parts/SingleSelect";
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Sorting",
        data: () => ({
            defaultOption: {id: 0, name: 'Default', order_by: 'id', type: 'asc'},
            loader: true
        }),
        props: {
            sort_id: {
                type: Number,
                default: () => 0
            }
        },
        computed: {
            ...mapGetters(['SORT']),
        },
        components: {
            SingleSelect
        },
        methods: {
            ...mapActions(['GET_SORT']),
            selectedOption(option) {
                this.$emit('setUpSortedItems', option)
            }
        },
        mounted() {
            this.GET_SORT().then(() => {
                this.loader = false
            })
        }
    }
</script>

<style lang="scss">
    .sorting {
        width: 20vmin;
        position: absolute;
        right: 5vmin;

    }
</style>