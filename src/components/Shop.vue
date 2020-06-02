<template>
    <div class="shop" :class="{full: !openFilters}">
        <Sorting
            :filterItems="filterItems"
            @setUpSortedItems="setUpFilterItems"
        />

        <div class="icons">
            <i @click="toggleFilters" v-show="openFilters" class="close-button material-icons">close</i>
            <i @click="toggleFilters" v-if="!openFilters" class="open-button material-icons">filter_list</i>
        </div>

        <Filters
                :openFilters="openFilters"
                :itemsData="itemsData"
                @setUpFilterItems="setUpFilterItems"
        />
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
    import Sorting from './sorting/Sorting'
    import paginationMixin from '@/mixins/pagination.mixin'

    export default {
        name: 'Shop',
        components: {Item, Filters, Sorting},
        mixins: [paginationMixin],
        data: () => ({
            itemsData: [
                {
                    id: 1,
                    name: 'Knife 1',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 1,
                    material_id: 2,
                    brand_id: 2,
                    price: 554,
                    category_id: 1,
                    sales: 3
                },
                {
                    id: 2,
                    name: 'Knife 2',
                    description: 'Knife for you wife',
                    weight: 14.1,
                    long: 2,
                    material_id: 2,
                    brand_id: 2,
                    price: 20,
                    category_id: 1
                },
                {
                    id: 3,
                    name: 'Knife 3',
                    description: 'Knife for you wife',
                    weight: 16.1,
                    long: 33,
                    material_id: 2,
                    brand_id: 2,
                    price: 150,
                    category_id: 1,
                    sales: 10
                },
                {
                    id: 4,
                    name: 'Knife 4',
                    description: 'Knife for you wife',
                    weight: 100.1,
                    long: 125,
                    material_id: 2,
                    brand_id: 3,
                    price: 20,
                    category_id: 2,
                },
                {
                    id: 5,
                    name: 'Knife 5',
                    description: 'Knife for you wife',
                    weight: 125.1,
                    long: 33,
                    material_id: 2,
                    brand_id: 3,
                    price: 359,
                    category_id: 2,
                    sales: 123
                },
                {
                    id: 6,
                    name: 'Knife 6',
                    description: 'Knife for you wife',
                    weight: 163.1,
                    long: 54,
                    material_id: 3,
                    brand_id: 3,
                    price: 2,
                    category_id: 2,
                    sales: 25
                },
                {
                    id: 7,
                    name: 'Knife 7',
                    description: 'Knife for you wife',
                    weight: 1005.1,
                    long: 888,
                    material_id: 3,
                    brand_id: 5,
                    price: 20,
                    category_id: 3,
                    sales: 26
                },
                {
                    id: 8,
                    name: 'Knife 8',
                    description: 'Knife for you wife',
                    weight: 1999.1,
                    long: 124,
                    material_id: 3,
                    brand_id: 5,
                    price: 134,
                    category_id: 3,

                },
                {
                    id: 9,
                    name: 'Knife 9',
                    description: 'Knife for you wife',
                    weight: 5888.1,
                    long: 33,
                    material_id: 3,
                    brand_id: 5,
                    price: 20,
                    category_id: 3,

                },
                {
                    id: 10,
                    name: 'Knife 10',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 3,
                    brand_id: 2,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 11,
                    name: 'Knife 11',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 3,
                    brand_id: 2,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 12,
                    name: 'Knife 12',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 3,
                    brand_id: 2,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 13,
                    name: 'Knife 13',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 4,
                    brand_id: 2,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 14,
                    name: 'Knife 14',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 4,
                    brand_id: 4,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 15,
                    name: 'Knife 15',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 4,
                    brand_id: 4,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 16,
                    name: 'Knife 16',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 4,
                    brand_id: 4,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 17,
                    name: 'Knife 17',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 4,
                    brand_id: 4,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 18,
                    name: 'Knife 18',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 4,
                    brand_id: 4,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 19,
                    name: 'Knife 19',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 4,
                    brand_id: 4,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 20,
                    name: 'Knife 20',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 4,
                    brand_id: 4,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 21,
                    name: 'Knife 21',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 4,
                    brand_id: 4,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 22,
                    name: 'Knife 22',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 4,
                    brand_id: 4,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 23,
                    name: 'Knife 23',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 4,
                    brand_id: 4,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 24,
                    name: 'Knife 24',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 4,
                    brand_id: 1,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 25,
                    name: 'Knife 25',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 5,
                    brand_id: 1,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 26,
                    name: 'Knife 26',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 5,
                    brand_id: 1,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 27,
                    name: 'Knife 27',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 5,
                    brand_id: 1,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 28,
                    name: 'Knife 28',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 5,
                    brand_id: 1,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 29,
                    name: 'Knife 29',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 5,
                    brand_id: 1,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 30,
                    name: 'Knife 30',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 5,
                    brand_id: 1,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 31,
                    name: 'Knife 31',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 1,
                    brand_id: 1,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 32,
                    name: 'Knife 32',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 1,
                    brand_id: 1,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 33,
                    name: 'Knife 33',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 1,
                    brand_id: 1,
                    price: 20,
                    category_id: 1,

                },
                {
                    id: 34,
                    name: 'Knife 34',
                    description: 'Knife for you wife',
                    weight: 11.1,
                    long: 124,
                    material_id: 1,
                    brand_id: 1,
                    price: 20,
                    category_id: 1,

                },
            ],
            openFilters: true,
            filterItems: []
        }),
        mounted() {
            this.setupPagination(this.filterItems)
        },
        beforeMount() {
            this.filterItems = this.itemsData
        },
        methods: {
            toggleFilters() {
                this.openFilters = !this.openFilters
            },
            setUpFilterItems(items) {
                this.setupPagination(items)
                this.filterItems = items
            }
        },

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
                transition: margin-left .5s ease;
            }
        }

        h1 {
            color: black;
        }

        &__items {
            padding-top: 65px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            margin-left: 35vmin;
            transition: margin-left .5s ease;
        }

        .pagination {
            text-align: center;
        }

        .icons {
            i {
                position: fixed;
                cursor: pointer;
                color: white;
                z-index: 1;
                opacity: 0;

                &.close-button {
                    left: 29vmin;
                    top: 1vmin;
                    font-size: 5vmin;
                    animation: showClose .5s .2s forwards;
                }

                &.open-button {
                    font-size: 9vmin;
                    top: 29vmin;
                    animation: showOpen .5s forwards;
                }
            }
        }

    }

    @keyframes showClose {
        0% {
            transform: rotate(180deg);
        }
        100% {
            opacity: 1
        }
    }

    @keyframes showOpen {
        0% {
        }
        100% {
            opacity: 1
        }
    }
</style>
