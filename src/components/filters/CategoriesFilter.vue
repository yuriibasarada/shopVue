<template>
    <div class="categories-filter">
        <div class="input-field col s12 m6">
            <select v-model="category_id" class="icons" ref="categories">
                <option value="" disabled selected>Choose your category</option>
                <option v-for="category in categories" :key="category.id"
                :value="category.id" :data-icon="require('../../assets/img/categories/' + category.img)">
                    {{category.name}}
                </option>

            </select>
            <label>Categories</label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CategoriesFilter",
        data: () => ( {
           select: null,
            category_id: null
        }),
        props: {
            categories: {
                type: Array,
                default: () => []
            },
            current_category_id: {
                type: Number,
                default: () => 0
            }
        },
        mounted() {
            this.select = window.M.FormSelect.init(this.$refs.categories)
        },
        watch: {
            category_id() {
                this.$emit('changeCategory', this.category_id)
            }
        }

    }
</script>

<style lang="scss">
    .categories-filter {
        margin-top: 5vmin;
        margin-left: 1vmin;
        margin-right: 1vmin;
        .input-field {
            .select-wrapper {
                input {
                    color: white;
                }
            }
        }
    }
</style>