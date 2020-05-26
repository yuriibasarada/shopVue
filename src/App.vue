<template>
  <div id="app">
    <Shop />
  </div>
</template>

<script>
import Shop from './components/Shop.vue'

export default {
  name: 'App',
  components: {
    Shop
  }
}
</script>

<style>
  @import "~materialize-css/dist/css/materialize.min.css";
  @import "~nouislider/distribute/nouislider.min.css";

  #app {
   width: 100%;
   height: 100%;
 }
</style>
