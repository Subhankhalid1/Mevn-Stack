<template>
  <div>
    <div
      class="cont col-md-12 col-sm-12 d-flex m-auto justify-content-start flex-wrap"
      id="card"
    >
      <!-- Row -->
      <div
        class="card m-2 d-flex m-auto myCard1"
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
          <span
            @click="$emit('handleFavouriteList', product)"
            style="cursor: pointer"
            ><font-awesome-icon
              icon="fa-heart"
              :style="{ color: isLiked ? 'red' : null }"
              class="text-gray-300 fa-2x d-flex m-1"
            />
          </span>
        </span>

        <p class="moq">MOQ: {{ product.display_moq }} Pieces</p>
        <h6 class="price fw-bold pb-3">$ {{ product.price }} /piece</h6>
        <div
          class="mydivoutermulti d-flex justify-content-center"
          @click="$emit('handleCartData', product)"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProductCard",
  props: {
    product: Object,
    toggleShowRow: Boolean,
  },
  data() {
    return {
      hov: false,
    };
  },
  computed: {
    ...mapGetters(["allfavProducts"]),
    isLiked() {
      return this.allfavProducts.some(
        (item) => item.product._id === this.product._id
      );
    },
  },
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
.card{

  /* background-color: white; */
  --mdb-card-box-shadow: none !important;

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
