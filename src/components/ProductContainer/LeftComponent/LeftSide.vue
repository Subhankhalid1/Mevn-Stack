<template>
  <div class=" mb-3 d-flex justify-content-start align-items-center">
      <h5 class="d-flex justify-content-between ">Products</h5>
        <h5 class="p-4 text-muted">({{ allProducts.length+" "+ "Products" }})</h5>
    </div>
  <div class="col-md-12 col-sm-12 d-flex flex-wrap border">
    <div class="mt-5 mb-3">
      <h5 class="d-flex justify-content-start text-muted px-3">Price</h5>
      <div class="d-flex">
        <span
          ><input
            type="number"
            placeholder="from"
            class="w-75 rounded-pill m-1 text-center"
            v-model="minPrice"
            @change="filterBetweenPrice({ minPrice, maxPrice })"
        /></span>

        <div class="m-1" style="border-left: 3px solid #ddd"></div>
        <span
          ><input
            type="number"
            placeholder="to"
            class="w-75 rounded-pill m-1 text-center"
            v-model="maxPrice"
            @change="filterBetweenPrice({ minPrice, maxPrice })"
        /></span>
      </div>
    </div>

    <div class="w-100 p-3 mb-2">
      <h5 class="d-flex justify-content-start text-muted">MOQ</h5>
      <div class="d-flex m-auto">
        <input
          placeholder="Less than"
          type="text"
          class="w-100 rounded-pill m-1 text-center"
          v-model="search"
          @change="MOQHandle(search)"
        />
      </div>
    </div>
    <div class="w-100 p-3 mb-2">
      <h5 class="d-flex justify-content-start text-muted">
        Product Categories
      </h5>

      <div class="d-flex m-auto pb-2">
        <input
          placeholder="Product Categories..."
          style="cursor: pointer;"
          type="text"
          class="w-100 rounded-pill m-1 text-center"
          @input="searchCategories($event)"
        />
      </div>

      <div
        class="d-flex justify-content-start mb-1"
        v-for="(product, index) in allCategories"
        :key="product"
      >
        <div class="d-flex" v-if="index < limit_by" style="cursor: pointer">
          <span class="px-2">
            <input
              type="checkbox"
              :value="product._id"
              v-model="checkedItems"
              @change="updateCheckedItems(product._id)"
              style="cursor: pointer;"
            />
          </span>
          <span class="">
            <p>{{ product.category }}</p>
          </span>
        </div>
      </div>

      <a
        href="javascript:void(0)"
        style="color: #29b574; font-size: 16px"
        class="d-flex justify-content-start"
        @click="showList_toggle(default_limit, allCategories.length)"
        >{{ limit_by == default_limit ? `Show All (${allCategories.length})` : "Show Less" }}</a
      >
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      checkedItems: [],
      search: "",
    };
  },

  setup() {
    // const showMore = ref(false);
    const default_limit = ref(3);
    const limit_by = ref(3);
    const minPrice = ref(0);
    const maxPrice = ref(10000);


    function showList_toggle(default_limit, filters_length) {
      limit_by.value =
        limit_by.value === default_limit ? filters_length : default_limit;
    }

    return { showList_toggle, default_limit, limit_by, minPrice, maxPrice };
  },
  methods: {
    ...mapActions([
      "fetchProducts",
      "filterProducts",
      "searchProductByMoq",
      "fetchCategories",
      "productsByCategory",
      "filterBetweenPrice",
      "searchCategories",
    ]),

    MOQHandle(search) {
      if (search) {
        this.searchProductByMoq(search);
      } else {
        this.fetchProducts();
      }
    },

    updateCheckedItems() {
      const checkedId=this.checkedItems
       console.log("checkedId", checkedId)
      this.productsByCategory(checkedId)
    },
  },
  computed: {
    ...mapGetters(["allProducts", "allCategories"]),

  },
  created() {
    this.fetchProducts();
  },

};
</script>

<style scoped>
input {
  background: #eee;
  border: none;
  text-decoration: none;
  padding: 8px 10px 10px 10px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="text"] {
  -moz-appearance: textfield;
}
</style>
