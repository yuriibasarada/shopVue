<template>
    <h1 v-if="loader">Loader</h1>
    <div v-else class="shop" :class="{full: !openFilters}">
        <Sorting @setUpSortedItems="selectSort"/>

        <div class="icons">
            <i @click="toggleFilters" v-show="openFilters" class="close-button material-icons">close</i>
            <i @click="toggleFilters" v-if="!openFilters" class="open-button material-icons">filter_list</i>
        </div>

        <Filters
                :openFilters="openFilters"
                :itemsData="PRODUCTS.products"
                :current_category_id="current_category_id"
                @selectCategory="selectCategory"
        />
        <div class="wrapper">
            <div class="shop__items">
                <Item v-for="item in PRODUCTS.products" :key="item.id" :item="item"/>
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
    </div>
</template>

<script>
    import Item from './Item'
    import Filters from './Filters'
    import Sorting from './Sorting'
    import {mapActions, mapGetters} from 'vuex'
    import paginationMixin from '@/mixins/pagintaion.mixin'

    export default {
        name: 'Shop',
        components: {Item, Filters, Sorting},
        mixins: [paginationMixin],
        data() {
            return {
                openFilters: true,
                filterItems: [],
                loader: true,
                current_category_id: +this.$route.query.category_id || 0,
                sort: {
                    sort_by: this.$route.sort_by,
                    sort_type: this.$route.sort_type,
                },
            }
        },
        mounted() {
            console.log(this.current_category_id)
            this.GET_PRODUCTS({
                limit: this.pageSize,
                page: this.page,
                category_id: this.current_category_id
            }).then(() => {
                this.setupPagination()
                this.loader = false
            })
        },
        methods: {
            ...mapActions(['GET_PRODUCTS']),
            toggleFilters() {
                this.openFilters = !this.openFilters
            },
            selectCategory(category_id) {
                this.current_category_id = +category_id
                this.page = 1
                if(+this.$route.query !== +this.page) {
                    this.$router.replace({ path: this.$route.path, query: {page: this.page } })
                }

                this.$router.replace({
                    path: this.$route.path,
                    query: {...this.$route.query, category_id: this.current_category_id} })

                this.GET_PRODUCTS({
                    limit: this.pageSize,
                    page: this.page,
                    category_id,
                    sort_by: this.sort.sort_by,
                    sort_type: this.sort.sort_type
                }).then(() => {
                    this.setupPagination()
                    this.loader = false
                })
            },
            selectSort(value) {
                this.sort = value

                this.$router.replace({
                    path: this.$route.path,
                    query: {...this.$route.query, sort_by: value.sort_by, sort_type: value.sort_type} })

                this.GET_PRODUCTS({
                    limit: this.pageSize,
                    page: this.page,
                    category_id: this.current_category_id,
                    sort_by: value.sort_by,
                    sort_type: value.sort_type
                }).then(() => {
                    this.setupPagination()
                    this.loader = false
                })
            }

        },
        computed: {
            ...mapGetters(['PRODUCTS'])
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
