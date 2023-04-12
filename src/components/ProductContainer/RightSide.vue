<template>
  <div class="col-md-12 col-sm-12 d-flex flex-wrap mb-4">
    <div
      class="col-md-6 col-sm-12 p-2 d-flex justify-content-start flex-wrap rowshandle"
    >
      <font-awesome-icon
        icon="fa-solid fa-grip"
        class="fa-2x px-3 py-1"
        @click="handleToggleColumn"
        :class="{ colorChange: !toggleShowRow }"
        style="cursor: pointer"
      />
      <!-- :class="{colorChange:toggleShowColumn}" -->
      <font-awesome-icon
        icon="fa-solid fa-list-ul"
        class="fa-2x px-3 py-1"
        @click="handleToggleRow"
        :class="{ colorChange: toggleShowRow }"
        style="cursor: pointer"
      />
    </div>
    <div class="col-md-6 col-sm-12 d-flex justify-content-end flex-wrap">
      <!-- <h4>{{ cateSelect }}</h4> -->
      <div class="d-flex justify-content-end">
        <div
          class="input-group-append m-3 cateComp1 d-flex justify-content-center p-2"
        >
          <select
            placeholder="Relevance"
            @change="filterProducts($event)"
            style="border: none; width: 100%; background: #eee; cursor: pointer"
            class="sel"
          >
            <option class="mt-5 px-2" value="Relevance" disabled>
              Relevance
            </option>
            <option value="Latest" class="px-2">Latest</option>
            <option value="Sort By Name" class="px-2">Sort By Name</option>
            <option value="Low to High" class="px-2">Low to High</option>
            <option value="High to Low" class="px-2">High to Low</option>
          </select>
        </div>
        <!-- Pagination Sections-->
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
        </div>
        {{ handlePagination() }}
      </div>
    </div>
  </div>
  <!-- <div class="d-flex m-auto mt-5 p-2" v-if="!allProducts.length">
    <p> Loading... </p>
  </div> -->
  <div
    class="cont col-md-12 col-sm-12 d-flex m-auto justify-content-start flex-wrap"
  >
    <!-- Row -->
    <div
      class="card m-2 d-flex m-auto myCard1"
      v-for="product in _filter"
      :key="product.id"
      style="width: 100%; height: auto"
      @mouseover="hov = true"
      @mouseleave="hov = false"
      v-if="toggleShowRow"
    >
      <div class="d-flex col-md-12 col-sm-12">
        <img
          class="px-2 py-2 m-2 d-flex justify-content-start col-md-2 col-sm-12"
          src="http://localhost:5000/uploads/products/1678694895391_ image1.jpeg"
        />
        <div
          class="col-md-10 col-sm-12 px-2 d-block m-auto text-center justify-content-center"
        >
          <p class="title text-center">{{ product.product_name }}</p>
          <p class="moq">MOQ: {{ product.display_moq }} Pieces</p>
          <h6 class="price fw-bold pb-3">$ {{ product.price }} /piece</h6>
          <div class="mydivoutermulti1 d-flex justify-content-start">
            <button
              type="button"
              class="buttonoverlapmulti1 btn btn-info d-flex m-auto justify-content-center align-items-center"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Columns Card -->
    <div
      class="card m-2 p-2 mb-3 myCard d-flex justify-content-start mt-3"
      v-for="product in _filter"
      style="width: 20.7rem; height: auto"
      @mouseover="hov = true"
      @mouseleave="hov = false"
      v-else="toggleShowRow"
    >
      <img
        class="card-img-top p-2 d-flex m-auto justify-content-center align-items-center col-md-12 col-sm-12"
        src="http://localhost:5000/uploads/products/1678694895391_ image1.jpeg"
      />

      <!-- :src="getImageUrl(product)" -->
      <span class="d-flex justify-content-between"
        ><p class="title">{{ product.product_name }}</p>
        <span @click="handleFavouriteList(product)" style="cursor: pointer"
          ><font-awesome-icon
            icon="fa-heart"
            :style="{ color: product.isLiked ? 'red' : 'black' }"
            class="text-gray-300 fa-2x d-flex m-1"
          />
        </span>
      </span>

      <p class="moq">MOQ: {{ product.display_moq }} Pieces</p>
      <h6 class="price fw-bold pb-3">$ {{ product.price }} /piece</h6>
      <div
        class="mydivoutermulti d-flex justify-content-center"
        @click="handleCartData(product)"
      >
        <button
          type="button"
          class="buttonoverlapmulti btn btn-info"
          style="border-radius: 10px"
        >
          Add To Cart
        </button>
      </div>
    </div>
  </div>
  <div
    class="d-flex m-auto mt-5 pt-2 justify-content-center"
    v-if="allProducts.length === 0"
  >
    <h2>No Products Exist.</h2>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import { serverURL } from "@/common/apis";

export default {
  // props: ["products"],
  data() {
    return {
      indexOfLastPost: "",
      currentPage: 1,
      postsPerPage: 6,
      _filter: "",
      indexOfFirstPost: "",
      count: 1,
      pages: [],
      isLiked: false,
    };
  },
  setup() {
    const hov = ref(false);
    const toggleShowRow = ref(false);
    const toggleShowColumn = ref(false);
    const cateSelect = ref("Relevance");

    const handleToggleRow = () => {
      toggleShowRow.value = true;
      toggleShowColumn.value = false;
    };

    const handleToggleColumn = () => {
      toggleShowRow.value = false;
      toggleShowColumn.value = true;
    };

    // console.log("aaa", allProducts)
    return {
      hov,
      toggleShowRow,
      handleToggleRow,
      handleToggleColumn,
      cateSelect,
    };
  },
  methods: {
    ...mapActions([
      "fetchProducts",
      "filterProducts",
      "setCartProducts",
      "postCartData",
      "fetchCartData",
      "postFavData",
      "removeFavProduct",
    ]),

    handlePagination() {
      this.indexOfLastPost = this.currentPage * this.postsPerPage;
      this.indexOfFirstPost = this.indexOfLastPost - this.postsPerPage;

      this._filter = this.allProducts?.slice(
        this.indexOfFirstPost,
        this.indexOfLastPost
      );

      //   for (const i = this.indexOfFirstPost; i <= this.indexOfLastPost; i++) {
      //   this.pages.push(i)
      //   console.log("pages--------->",this.pages.push(i))
      // }
    },

    handleCountAdd() {
      if (this.count < this.allProducts.length / this.postsPerPage) {
        this.count += 1;
        this.currentPage = this.count;
        // console.log("count", this.currentPage)
      }
    },

    handleCountSubtract() {
      if (this.count > 1) {
        this.count += -1;
        this.currentPage = this.count;
        // console.log("count", this.currentPage)
      }
    },

    getImageUrl(item) {
      return serverURL + item.productPic;
    },

    handleCartData(product) {
      this.postCartData(product);

      this.fetchCartData();
    },
    handleFavouriteList(product) {
      product.isLiked = !product.isLiked;
     
      const index=this.allfavProducts.findIndex((item) => item.product._id === product._id)
      if (index !== -1) {
        product.isLiked=false
        this.removeFavProduct(product._id);
      } else {
        this.postFavData(product);
      }
    },
  },
  computed: {
    ...mapGetters(["allProducts", "u_token", "allfavProducts"]),
    isLiked(){
      return this.allfavProducts.find((item) => item.product._id === this.product._id)
    }
  },
  created() {
    this.fetchProducts();
    this.handlePagination();
  },

  // onMounted(){
  //   this.filterProducts(this.cateSelect)
  // }
};
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
.mydivoutermulti {
  position: relative;
  width: 100%;
  height: 40px;
  float: left;
  margin-right: 15px;
  font-family: Avenir LT Pro, sans-serif !important;
}
.buttonoverlapmulti {
  position: absolute;
  z-index: 0;

  display: none;
  background: rgb(135, 242, 217);
  border: none;
  color: white;
  width: 96%;
}
.mydivoutermulti1 {
  position: relative;
  width: 100%;
  height: 40px;

  /* float: left;
  margin-right: 15px;
  padding: 35px; */
}
.buttonoverlapmulti1 {
  position: absolute;
  z-index: 0;

  display: none !important;
  background: rgb(135, 242, 217);
  border: none;
  color: white;
  border-radius: 12px;
  width: 28%;
}
/* .myCard{
  transition: box-shadow .3s;
} */
.myCard:hover .buttonoverlapmulti {
  display: block;
  box-shadow: aliceblue 10px;
}
.myCard:hover {
  /* border: none; */
  box-shadow: 0 0 30px rgba(30, 29, 29, 0.2);
}
/* .cont {
  display: inline-block;
} */
.myCard {
  position: static;
  border: none;
}
.myCard1:hover .buttonoverlapmulti1 {
  display: block !important;
  box-shadow: 10px 12px 15px 5px rgb(195, 239, 235);
}
.myCard1:hover {
  border: 1px solid #ddd;
}
/* .cont {
  display: inline-block;
} */
.myCard1 {
  position: static;
  border: none;
  padding: 20px;
}
/* .myCard:hoever{
    border: 1px solid #ddd;
} */

.title {
  font-size: 18px;
  font-family: sans-serif;
  display: flex;
  justify-content: start;
  padding: 0%;
  margin: 1%;
}
.moq {
  color: #ddd;
  padding: 0%;
  margin: 1%;
  font-family: sans-serif;
  display: flex;
  justify-content: start;
}
.price {
  padding: 0%;
  margin: 1%;
  font-family: bold;
  display: flex;
  justify-content: start;
}
div.a {
  text-align: center;
}
@media (min-width: 0px) and (max-width: 767px) {
  /* .sel{
    width: 40%!important;
  } */
  .myCard {
    display: flex !important;
    justify-content: center !important;
    margin: auto !important;
    /* border: 1px solid grey; */
  }
  .rowshandle {
    display: none !important;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
  }
  .cateComp {
    width: 10rem !important;
  }
  .mydivoutermulti1 {
    position: relative;
    width: 100%;
    height: 40px;
    float: left;
    margin-right: 15px;
    padding: 20px;
  }
  .buttonoverlapmulti1 {
    position: absolute;
    z-index: 1;

    display: block;
    background: rgb(135, 242, 217);
    border: none;
    color: white;
    border-radius: 12px;
    width: 90%;
  }
}
</style>
