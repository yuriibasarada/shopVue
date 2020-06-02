<template>
    <div class="filters" :class="{close: !this.openFilters}">
        <div class="categories">
            <single-select
                    :default_option="'Select Category'"
                    :options="categories"
                    :label="'Categories'"
                    @selectedOption="changeCategory"
                    v-show="this.openFilters"
            />
        </div>

        <div>
            <range-slider
                    :min="priceMinMax.min"
                    :max="priceMinMax.max"
                    :title="'price'"
                    :unit="' ₴ '"
                    :key="current_category_id"
                    @changeValue="changeValue"
                    v-show="this.openFilters"
            />
        </div>
        <div>
            <range-slider
                    :min="weightMinMax.min"
                    :max="weightMinMax.max"
                    :title="'weight'"
                    :unit="' hr '"
                    :key="current_category_id"
                    @changeValue="changeValue"
                    v-show="this.openFilters"
            />
        </div>
        <div>
            <range-slider
                    :min="longMinMax.min"
                    :max="longMinMax.max"
                    :title="'long'"
                    :unit="' sm '"
                    :key="current_category_id"
                    @changeValue="changeValue"
                    v-show="this.openFilters"
            />
        </div>

        <multi-select
                :options="brands"
                :defaultOption="'Select Brand'"
                :label="'brand'"
                @selectedOptions="selectedOptions"
                v-show="this.openFilters"
        />
        <multi-select
                :options="materials"
                :defaultOption="'Select Material'"
                :label="'material'"
                @selectedOptions="selectedOptions"
                v-show="this.openFilters"
        />
    </div>
</template>

<script>
    import RangeSlider from "./parts/RangeSlider";
    import MultiSelect from "./parts/MultiSelect";
    import SingleSelect from "./parts/SingleSelect";

    export default {

        name: "Filters",
        components: {RangeSlider, SingleSelect, MultiSelect},
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
            brands: [
                {
                    id: 1,
                    name: 'Yamakasi'
                },
                {
                    id: 2,
                    name: 'Fayon'
                },
                {
                    id: 3,
                    name: 'GoodKnifes'
                },
                {
                    id: 4,
                    name: 'OOO Jmishenko'
                },
            ],
            materials: [
                {id: 1, name: 'Strong Metal'},
                {id: 2, name: 'Height metal'},
                {id: 3, name: 'SS 123'},
                {id: 4, name: 'DDD1234'},
                {id: 5, name: 'Metal with exp'},
            ],
            current_category_id: 0,
            longMinMax: 0,
            weightMinMax: 0,
            priceMinMax: 0,
            filterItems: []
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
            changeCategory(category_id) {
                this.current_category_id = category_id
                if (category_id) {
                    this.filterItems = this.itemsData.filter(function (value) {
                        return value.category_id === category_id
                    })
                } else {
                    this.filterItems = this.itemsData
                }
                this.updateRangeSlider(this.filterItems)
                this.$emit('setUpFilterItems', this.filterItems)
            },
            changeValue(data) {
                let p = this
                this.filterItems = this.itemsData.filter(function (item) {
                    return (item[data.type] >= data.value[0] && item[data.type] <= data.value[1]) &&
                        (p.current_category_id ? item.category_id === p.current_category_id : true)
                })
                this.$emit('setUpFilterItems', this.filterItems)
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
            },
            selectedOptions(data) {
                if (data.values.length) {
                    let itemsWithOptions = this.filterItems.filter(function (item) {
                        return data.values.find((i) => i === item[data.type + '_id'])
                    })
                    this.$emit('setUpFilterItems', itemsWithOptions)
                } else {
                    this.$emit('setUpFilterItems', this.filterItems)
                }
            }
        },
        mounted() {
            this.filterItems = this.itemsData
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

        .categories {
            .single-select {
                margin-top: 5vmin;
                margin-left: 1vmin;
                margin-right: 1vmin;

                input {
                    color: white;
                }
            }
        }

        &.close {
            animation: closeFilters .5s forwards;
        }
    }

    .filters::-webkit-scrollbar-button {
        display: none;
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