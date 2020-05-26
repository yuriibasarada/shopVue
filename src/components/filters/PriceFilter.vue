<template>
    <div class="price-filter">
        <h1>Price</h1>
        <div ref="price_slider"></div>
        <div class="input-block">
            <div class="input-field ">
                <input ref="firstPriceInput" id="from" type="number" class="validate" v-model="priceMinValue">
                <label for="from">From:</label>
            </div>
            <div class="input-field">
                <input ref="secondPriceInput" id="to" type="number" class="validate" v-model="priceMaxValue">
                <label for="to">To:</label>
            </div>

        </div>
    </div>

</template>

<script>
    import noUiSlider from '../../../node_modules/nouislider/distribute/nouislider.min.js'

    export default {
        name: "PriceFilter",
        data() {
            return {
                price_slider: null,
                priceMinValue: this.priceMax ? (this.priceMax / 5) : 0,
                priceMaxValue: this.priceMax ? (this.priceMax - (this.priceMax / 5)) : 100,
            }
        },
        props: {
            priceMin: {
                type: Number,
                default: () => 0
            },
            priceMax: {
                type: Number,
                default: () => 100
            }

        },
        mounted() {
            this.price_slider = this.$refs.price_slider;
            this.setUpPriceSlider()
            window.M.updateTextFields()
        },
        methods: {
            setUpPriceSlider() {
                noUiSlider.create(this.price_slider, {
                    start: [this.priceMinValue, this.priceMaxValue],
                    connect: true,
                    tooltips: [true, true],
                    range: {
                        'min': this.priceMin,
                        'max': this.priceMax
                    },
                    pips: {
                        mode: 'range',
                        density: 4
                    }
                })
                let p = this
                this.price_slider.noUiSlider.on('update', function (values, handle) {
                    let value = values[handle]
                    if (handle) {
                        p.priceMaxValue = value
                    } else {
                        p.priceMinValue = value
                    }
                })
                this.$refs.firstPriceInput.addEventListener('change', function () {
                    p.price_slider.noUiSlider.set([this.value, null])
                })
                this.$refs.secondPriceInput.addEventListener('change', function () {
                    p.price_slider.noUiSlider.set([null, this.value])
                })
            }
        }
    }
</script>

<style lang="scss">
    .price-filter {
        h1 {
            color: white !important;
            text-align: center;
        }

        .noUi-horizontal {
            margin: 1vmin;
        }

        .input-block {
            display: flex;
            margin-left: 2vmin;
            margin-top: 2vmin;

            .input-field {
                input {
                    color: white;
                    font-size: 3vmin;
                    width: 65%;
                    height: 4rem;
                }

                label {
                    color: white;
                    font-size: 2vmin;
                }

                h6 {
                    color: white;
                }
            }

        }
    }

</style>