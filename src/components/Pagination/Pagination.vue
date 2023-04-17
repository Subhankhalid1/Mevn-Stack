<template>
<div class="d-flex m-auto justify-content-end">
  <span class="d-flex mt-2 justify-content-start border iconBox">
            <font-awesome-icon
              icon="fa-solid fa-chevron-left"
              class="d-flex m-auto text-dark justify-content-center"
              @click="handleCountSubtract()"
            />
          </span>

          <input
            type="number"
            v-model="currentPage"
            class="text-center p-2 w-25 font-size-small"
            style="width: 40%; cursor: pointer"
            disabled
          />
          <p class="d-flex m-auto text-center">
            of {{ (allProducts.length / postsPerPage).toFixed(0) }}
          </p>
          <span class="d-flex justify-content-end mt-2 border iconBox">
            <font-awesome-icon
              icon="fa-solid fa-chevron-right"
              class="d-flex text-dark m-auto justify-content-center"
              @click="handleCountAdd()"
            />
          </span>
          {{ handlePagination() }}
</div>

</template>



<script>
import { mapGetters, mapActions } from "vuex";
export default{
  name:"Pagination",
  data(){
    return{
      indexOfLastPost: "",
      currentPage: 1,
      postsPerPage: 9,
      _filter: "",
      indexOfFirstPost: "",
      count: 1,
      // pages: [],

    }
  },
  methods: {
    ...mapActions([
      "fetchProducts",
    ]),

    handlePagination() {
      this.indexOfLastPost = this.currentPage * this.postsPerPage;
      this.indexOfFirstPost = this.indexOfLastPost - this.postsPerPage;

      this._filter = this.allProducts?.slice(
        this.indexOfFirstPost,
        this.indexOfLastPost
      );
    },

    handleCountAdd() {
      if (this.count < this.allProducts.length / this.postsPerPage) {
        this.count += 1;
        this.currentPage = this.count;
      }
    },

    handleCountSubtract() {
      if (this.count > 1) {
        this.count += -1;
        this.currentPage = this.count;
      }
    },
  },
  computed: {
    ...mapGetters(["allProducts",]),
  },
  created() {
    this.fetchProducts();
    this.handlePagination();
  },


}

</script>



<style scoped>
.iconBox {
  width: 40px;
  height: 40px;
  background-color: #eee;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}
.colorChange1 {
  color: rgb(85, 246, 187);
}

.colorChange {
  color: rgb(85, 246, 187);
}
.cateComp1 {
  border-radius: 20px;
  border: 1px solid #eee;
  width: 60% !important;
  background: #eee;
}
input {
  background: #eee;
  border: none;
  text-decoration: none;
  padding: 3px 3px 3px 3px;
  margin: 10px;
  border-radius: 20px;
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
.cont1 {
  border: none !important;
}


div.a {
  text-align: center;
}

</style>








<!-- import { ref, computed } from "vue";

export default function handlePagination() {
  let page = ref(1);

  const data = Array.from(Array(24).keys()).map((item) => {
    return { index: item, value: `this_${item}` };
  });

  const perPage = 10;

  const paginatedData = computed(() =>
    data.slice((page.value - 1) * perPage, page.value * perPage)
  );

  const nextPage = () => {
    if (page.value !== Math.ceil(data.length / perPage)) {
      page.value += 1;
    }
  };

  const backPage = () => {
    if (page.value !== 1) {
      page.value -= 1;
    }
  };

  const goToPage = (numPage) => {
    page.value = numPage;
  };

  return { data, paginatedData, perPage, page, nextPage, backPage, goToPage };
}



 <template>
  <div v-for="item in paginatedData" :key="item.index">{{ item.value }}</div>
  <button @click="backPage">prev</button>
  <button
    v-for="item in Math.ceil(data.length / perPage)"
    :key="item"
    @click="() => goToPage(item)"
  >
    {{ item }}
  </button>
  <button @click="nextPage">next</button>
</template>

<script>
import handlePagination from "./handlePagination";

export default {
  name: "App",
  setup() {
    const handlePaginationValue = handlePagination();

    return { ...handlePaginationValue };
  },
};
</script>

<style>
</style>  -->