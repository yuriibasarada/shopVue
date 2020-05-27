<template>
    <div class="categories-filter">
        <div class="input-field col s12 m6">
            <select v-model="categoryId" class="icons" ref="categories">
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
        }),
        props: {
            categories: {
                type: Array,
                default: () => []
            },
            categoryId: {
                type: Number,
                default: () => 0
            }
        },
        mounted() {
            this.select = window.M.FormSelect.init(this.$refs.categories)
        },
        watch: {
            categoryId() {
                this.$emit('changeCategory', this.categoryId)
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