<template>
    <div class="filters" :class="{close: !this.openFilters}">
        <price-filter v-show="this.openFilters"/>
    </div>
</template>

<script>
    import PriceFilter from "./PriceFilter";

    export default {

        name: "Filters",
        components: {PriceFilter},
        props: {
            openFilters: {
                type: Boolean,
                default: () => true
            }
        },
        methods: {},
        mounted() {

        },

    }
</script>

<style lang="scss">
    .filters {
        position: fixed;
        background-color: black;
        width: 35vmin;
        height: 100%;

        &.close {
            animation: closeFilters 1s forwards;
        }
    }

    @keyframes closeFilters {
        0% {
        }
        100% {
            height: 35%;
            margin-top: 15%;
            border-radius: 0 50% 50% 0;
            margin-left: -25vmin;
        }
    }
</style>