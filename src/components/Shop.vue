<template>
    <div class="shop" :class="{full: !openFilters}">
        <i @click="toggleFilters" class="close-button material-icons">close</i>

        <Filters :openFilters="openFilters" />
        <div class="shop__items">
            <Item v-for="item in items" :key="item.id" :item="item"/>
        </div>
        <Paginate
                v-model="page"
                :page-count="pageCount"
                :click-handler="pageChangeHandler"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'waves-effect'"
        />
    </div>

</template>

<script>
    import Item from './Item'
    import Filters from './filters/Filters'
    import paginationMixin from '@/mixins/pagination.mixin'
    export default {
        name: 'Shop',
        components: {Item, Filters},
        mixins: [paginationMixin],
        data: () => ({
            items: [
                {id: 1, name: 'Knife 1', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 2, name: 'Knife 2', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 3, name: 'Knife 3', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 4, name: 'Knife 4', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 5, name: 'Knife 5', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 6, name: 'Knife 6', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 7, name: 'Knife 7', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 8, name: 'Knife 8', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 9, name: 'Knife 9', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 10, name: 'Knife 10', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 11, name: 'Knife 11', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 12, name: 'Knife 12', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 13, name: 'Knife 13', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 14, name: 'Knife 14', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 15, name: 'Knife 15', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 16, name: 'Knife 16', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 17, name: 'Knife 17', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 18, name: 'Knife 18', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 19, name: 'Knife 19', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 20, name: 'Knife 20', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 21, name: 'Knife 21', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 22, name: 'Knife 22', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 23, name: 'Knife 23', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 24, name: 'Knife 24', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 25, name: 'Knife 25', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 26, name: 'Knife 26', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 27, name: 'Knife 27', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 28, name: 'Knife 28', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 29, name: 'Knife 29', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 30, name: 'Knife 30', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 31, name: 'Knife 31', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 32, name: 'Knife 32', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 33, name: 'Knife 33', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
                {id: 34, name: 'Knife 34', description: 'Knife for you wife', weight: 11.1, long: 124, material: 'Carbon', brand: 'Gucci'},
            ],
            openFilters: true
        }),
        mounted() {
            this.setupPagination(this.items)
        },
        methods: {
            toggleFilters() {
                this.openFilters = !this.openFilters
            }
        }
    }
</script>

<style lang="scss">
    body, html, .shop {
        height: 100%;
        width: 100%;
        margin: 0;
    }
    .shop {

        &.full {
            .shop__items {
                margin-left: 5vmin;
                transition: margin-left 1s ease;
            }
        }
        h1 {
            color: black;
        }
        &__items {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            margin-left: 35vmin;
        }
        .pagination {
            text-align: center;
        }

        i.close-button {
            color: pink;
            position: fixed;
            cursor: pointer;
            z-index: 1;
            left: 29vmin;
            top: 1vmin;
            font-size: 5vmin;
        }
    }

</style>
