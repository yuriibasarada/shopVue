<template>
    <div class="sorting">
        <single-select
                :options="sortOptions"
                :default_option="{id: 0, name: 'Default'}"
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
                {id: 1, name: 'Sort by price up', type: 'price', sort: 'asc'},
                {id: 2, name: 'Sort by price down', type: 'price', sort: 'desc'},
                {id: 3, name: 'Sort by popular up', type: 'popular', sort: 'asc'},
                {id: 4, name: 'Sort by popular down', type: 'popular', sort: 'desc'},
                {id: 5, name: 'Top sales', type: 'sales', sort: 'desc'},
                {id: 6, name: 'New', type: 'new', sort: 'asc'},
                {id: 7, name: 'Stock', type: 'stock', sort: 'asc'},
            ]
        }),
        components: {
            SingleSelect
        },
        props: {
            filterItems: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            selectedOption(option) {
                let selectedOption = this.sortOptions.filter(function (value) {
                    return value.id === option
                })[0]
                if(option) {
                    if (selectedOption.sort === 'asc') {
                        this.filterItems.sort((a, b) => a[selectedOption.type] ? a[selectedOption.type] - b[selectedOption.type] : -1);
                    } else if (selectedOption.sort === 'desc') {
                        this.filterItems.sort((a, b) => b[selectedOption.type] ? b[selectedOption.type] - a[selectedOption.type] : -1);
                    }
                } else {
                    this.filterItems.sort((a,b) => a.id - b.id)
                }

                this.$emit('setUpSortedItems',  this.filterItems)
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