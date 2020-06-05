<template>
    <div class="sorting">
        <single-select
                :options="sortOptions"
                :default_option="defaultOption"
                :label="'Sorting'"
                @selectedOption="selectedOption"
        />
    </div>
</template>

<script>
    import SingleSelect from "./parts/SingleSelect";

    export default {
        name: "Sorting",
        data: () => ({
            sortOptions: [
                {id: 1, name: 'Sort by price up', sort_by: 'price', sort_type: 'asc'},
                {id: 2, name: 'Sort by price down', sort_by: 'price', sort_type: 'desc'},
                {id: 3, name: 'Top sales', sort_by: 'sold_time', sort_type: 'desc'},
            ],
            defaultOption: {id: 0, name: 'Default', sort_by: 'id', sort_type: 'asc'}
        }),
        components: {
            SingleSelect
        },
        methods: {
            selectedOption(option) {
                let selectedOption;
                if(+option === 0) {
                    selectedOption =  this.defaultOption
                } else {
                    selectedOption = this.sortOptions.filter(function (value) {
                        return value.id === option
                    })[0]
                }
                this.$emit('setUpSortedItems', {sort_by: selectedOption.sort_by, sort_type: selectedOption.sort_type})
            }
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