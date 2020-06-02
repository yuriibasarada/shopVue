<template>
    <div class="range-slider">
        <h1>{{title | capitalize}}</h1>
        <div ref="slider"></div>
        <div class="input-block">
            <div class="input-field ">
                <input ref="firstPriceInput" id="from" type="number" class="validate" v-model="minValue">
                <label for="from">From:</label>
            </div>
            <div class="input-field">
                <input ref="secondPriceInput" id="to" type="number" class="validate" v-model="maxValue">
                <label for="to">To:</label>
            </div>

        </div>
    </div>
</template>

<script>
    import noUiSlider from '../../../node_modules/nouislider/distribute/nouislider.min.js'
    import wNumb from '../../../node_modules/wnumb/wNumb.min.js'

    export default {
        name: "PriceFilter",
        data() {
            return {
                slider: null,
                minValue: this.min,
                maxValue: this.max,
            }
        },
        props: {
            min: {
                type: Number,
                default: () => 0
            },
            max: {
                type: Number,
                default: () => 100
            },
            title: {
                type: String,
                default: () => ''
            },
            unit: {
                type: String,
                default: () => ''
            }
        },
        mounted() {
            this.slider = this.$refs.slider;
            this.setUpSlider()
            window.M.updateTextFields()
        },
        methods: {
            setUpSlider() {
                noUiSlider.create(this.slider, {
                    start: [this.minValue, this.maxValue],
                    connect: true,
                    tooltips: [wNumb({suffix: this.unit, decimals: 0}), wNumb({suffix: this.unit, decimals: 0})],
                    range: {
                        'min': this.min,
                        'max': this.max
                    },
                    pips: {
                        mode: 'range',
                        density: 4,
                        format: wNumb({
                            decimals: 0,
                            prefix: this.unit
                        })
                    }
                })
                let p = this
                this.slider.noUiSlider.on('set', this.changeSlider)
                this.$refs.firstPriceInput.addEventListener('change', function () {
                    p.slider.noUiSlider.set([this.value, null])
                })
                this.$refs.secondPriceInput.addEventListener('change', function () {
                    p.slider.noUiSlider.set([null, this.value])
                })
            },
            changeSlider(values, handle) {
                let value = values[handle]
                if (handle) {
                    this.maxValue = Math.round(value)
                    this.$emit('changeValue', {value: values, type: this.title})
                } else {
                    this.minValue = Math.round(value)
                    this.$emit('changeValue', {value: values, type: this.title})
                }
            }
        },
        beforeDestroy() {
            if (this.slider && this.slider.destroy) {
                this.slider.destroy()
            }
        }
    }

</script>

<style lang="scss">
    .range-slider {
        h1 {
            color: white !important;
            text-align: center;
            font-size: 7vmin;
        }

        .noUi-horizontal {
            margin: 1vmin 2vmin;
        }

        .input-block {
            display: flex;
            margin-left: 2vmin;
            margin-top: 4vmin;

            .input-field {
                input {
                    color: white;
                    font-size: 3vmin;
                    width: 65%;
                    height: 4rem;
                }

                label {
                    color: #ffffff;
                    font-size: 2vmin;
                }

                h6 {
                    color: white;
                }
            }

        }
    }

</style>