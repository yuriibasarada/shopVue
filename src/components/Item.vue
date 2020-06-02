<template>
    <div class="item">
        <h1>{{item.price}}</h1>
    </div>
</template>

<script>
    export default {
        name: "Item",
        props: {
            item: {
                Type: Object,
                default: () => {}
            }
        }
    }
</script>

<style lang="scss">
.shop {
    .item {
        height: 30vmin;
        width: 25vmin;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        margin: 1vmin;
    }
}
</style>