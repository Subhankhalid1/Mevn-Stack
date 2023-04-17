<template>
  <div class="home">
    <ProductList/>
  </div>
</template>

<script>
// @ is an alias to /src

import ProductList from "../components/ProductContainer/index.vue"
// import Drawer from "@/components/Drawer.vue";
export default {

  components: {
    ProductList
  }
}
</script>
