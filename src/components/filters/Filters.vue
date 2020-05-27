<template>
    <div class="filters" :class="{close: !this.openFilters}">
        <categories-filter
                :categoryId="categoryId"
                :categories="categories"
                @changeCategory="changeCategory"
                @changeValue="changeValue"
                v-show="this.openFilters"
        />
        <div class="price-slider">
            <range-slider
                    :min="longMinMax.min"
                    :max="longMinMax.max"
                    :title="'Price'"
                    :unit="' ₴ '"
                    v-show="this.openFilters"
            />
        </div>
        <div class="price-slider">
            <range-slider
                    :min="weightMinMax.min"
                    :max="weightMinMax.max"
                    :title="'Weight'"
                    :unit="' hr '"
                    v-show="this.openFilters"
            />
        </div>
        <div class="price-slider">
            <range-slider
                    :min="priceMinMax.min"
                    :max="priceMinMax.max"
                    :title="'Long'"
                    :unit="' sm '"
                    v-show="this.openFilters"
            />
        </div>
    </div>
</template>

<script>
    import RangeSlider from "../parts/RangeSlider";
    import CategoriesFilter from "./CategoriesFilter";

    export default {

        name: "Filters",
        components: {RangeSlider, CategoriesFilter},
        data: () => ({
            categories: [
                {
                    id: 0,
                    name: 'All',
                    img: 'all.svg'
                },
                {
                    id: 1,
                    name: 'Multi',
                    img: 'multi.svg'
                },
                {
                    id: 2,
                    name: 'Machete',
                    img: 'machete.svg'
                },
                {
                    id: 3,
                    name: 'Flip',
                    img: 'flip.svg'
                },
                {
                    id: 4,
                    name: 'Kitchen',
                    img: 'kitchen.svg'
                },
                {
                    id: 5,
                    name: 'Other',
                    img: 'more.svg'
                },
            ],
            categoryId: 0,
            longMinMax: 0,
            weightMinMax: 0,
            priceMinMax: 0
        }),
        props: {
            openFilters: {
                type: Boolean,
                default: () => true
            },
            itemsData: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            changeCategory(categoryId) {
                this.categoryId = categoryId
                if (categoryId) {
                    this.filterItems = this.itemsData.filter(function (value) {
                        return value.category_id === categoryId
                    })
                } else {
                    this.filterItems = this.itemsData
                }
                this.setupPagination(this.filterItems)
            },
            changeValue(data) {
                if (data.type === 'Long') {
                    this.filterItems = this.itemsData.filter(function (item) {
                        return item.long > data.value[0] && item.long < data.value[1]
                    })
                } else if (data.type === 'Weight') {
                    this.filterItems = this.itemsData.filter(function (item) {
                        return item.long > data.value[0] && item.weight < data.value[1]
                    })
                } else if (data.type === 'Price') {
                    this.filterItems = this.itemsData.filter(function (item) {
                        return item.price > data.value[0] && item.price < data.value[1]
                    })
                }
                this.setupPagination(this.filterItems)
            },
            findMinMax(arr, type) {
                let min = arr[0][type], max = arr[0][type];
                for (let i = 1, len = arr.length; i < len; i++) {
                    let v = arr[i][type];
                    min = (v < min) ? v : min;
                    max = (v > max) ? v : max
                }

                return {min, max}
            },
            updateRangeSlider(items) {
                this.priceMinMax = this.findMinMax(items, 'price')
                this.weightMinMax = this.findMinMax(items, 'weight')
                this.longMinMax = this.findMinMax(items, 'long')
            }
        },
        mounted() {
            console.log(this.itemsData)
            this.$emit('setUpFilterItems', this.itemsData)
        },
        beforeMount() {
            this.updateRangeSlider(this.itemsData)
        }
    }
</script>

<style lang="scss">
    .filters {
        position: fixed;
        background-color: black;
        animation: openFilters .5s forwards;
        width: 35vmin;

        &.close {
            animation: closeFilters .5s forwards;
        }
    }

    @keyframes closeFilters {
        0% {
            height: 100%;
        }
        100% {
            height: 35vmin;
            margin-top: 15vmin;
            border-radius: 0 50% 50% 0;
            margin-left: -25vmin;
        }
    }

    @keyframes openFilters {
        0% {
            height: 35vmin;
            margin-top: 15vmin;
            border-radius: 0 50% 50% 0;
            margin-left: -25vmin;
        }
        100% {
            height: 100%;
        }
    }
</style>