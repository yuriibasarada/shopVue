<template>
    <div class="filters" :class="{close: !this.openFilters}">
        <div class="categories">
            <h1 v-if="loaders.category">Loader</h1>
            <single-select
                    v-else
                    :default_option="{id: 0,name: 'All', img: 'category/all.svg'}"
                    :options="CATEGORIES"
                    :label="'Categories'"
                    :current_option="current_category_id"
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

        <h1 v-if="loaders.brand">Loader</h1>
        <multi-select
                v-else
                :options="BRANDS"
                :defaultOption="'Select Brand'"
                :label="'brand'"
                @selectedOptions="selectedOptions"
                v-show="this.openFilters"
        />
        <h1 v-if="loaders.material">Loader</h1>
        <multi-select
                v-else
                :options="MATERIALS"
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
    import {mapGetters, mapActions} from 'vuex'

    export default {

        name: "Filters",
        components: {RangeSlider, SingleSelect, MultiSelect},
        data: () => ({
            longMinMax: 0,
            weightMinMax: 0,
            priceMinMax: 0,
            filterItems: [],
            loaders: {
                brand: true,
                material: true,
                category: true
            }
        }),
        props: {
            openFilters: {
                type: Boolean,
                default: () => true
            },
            itemsData: {
                type: Array,
                default: () => []
            },
            current_category_id: {
                type: Number,
                default: () => 0
            }
        },
        computed: {
            ...mapGetters(['BRANDS', 'MATERIALS', 'CATEGORIES'])
        },
        methods: {
            ...mapActions(['GET_BRANDS', 'GET_MATERIALS', 'GET_CATEGORIES']),
            changeCategory(category_id) {
                this.$emit('selectCategory', category_id)
            },
            changeValue(data) {
                let p = this
                this.filterItems = this.itemsData.filter(function (item) {
                    return (parseInt(item[data.type]) >= parseInt(data.value[0]) &&
                            parseInt(item[data.type]) <= parseInt(data.value[1])) &&
                        (p.current_category_id ? parseInt(item.category_id) === parseInt(p.current_category_id) : true)
                })
                this.$emit('setUpFilterItems', this.filterItems)
            },
            findMinMax(arr, type) {
                let min = parseInt(arr[0][type]), max = parseInt(arr[0][type]);
                for (let i = 1, len = arr.length; i < len; i++) {
                    let v = parseInt(arr[i][type]);
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
                    let itemsWithOptions = this.filterItems.filter((item) => {
                        return data.values.find((i) => parseInt(i) === parseInt(item[data.type + '_id']))
                    })
                    this.$emit('setUpFilterItems', itemsWithOptions)
                } else {
                    this.$emit('setUpFilterItems', this.filterItems)
                }
            }
        },
        mounted() {
            this.filterItems = this.itemsData
            this.GET_BRANDS().then(() => {
                this.loaders.brand = false
            })
            this.GET_MATERIALS().then(() => {
                this.loaders.material = false
            })
            this.GET_CATEGORIES().then(() => {
                this.loaders.category = false
            })
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