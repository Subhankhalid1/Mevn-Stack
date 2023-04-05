<template>
  <div class="home">
   
    <!-- <Header/> -->
    <!-- <SearchBox/> -->
    <!-- <Drawer/> -->
    <ProductList/>
   
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header/Header.vue"
import SearchBox from "@/components/SearchBox/SearchBox.vue";
import ProductList from "../components/ProductContainer/ProductListing.vue"
// import Drawer from "@/components/Drawer.vue";
export default {

  components: {
    Header,
    SearchBox,
    // Drawer,
    ProductList
  }
}
</script>
