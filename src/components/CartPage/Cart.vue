<template>
  <section class="h-100">
    <div class="container-fluid h-100 py-5" style="width: 76%">
      <div
        class="row d-flex justify-content-center align-items-center h-100"
        v-if="allCartProducts.length"
      >
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
            <div>
              <p class="mb-0">
                <span class="text-muted">{{ allCartProducts?.length }}</span>
                <a href="#!" class="text-body m-2"
                  >Items <i class="fas fa-angle-down mt-1"></i
                ></a>
              </p>
            </div>
          </div>

          <div
            class="col-12"
          
          >
            <div
              class="card rounded-3 mb-4"
              v-for="(cart, ind) in allCartProducts"
              :key="ind"
            >
              <div class="card-body p-4">
                <div
                  class="row d-flex justify-content-between align-items-center"
                >
                  <div class="col-md-2 col-lg-2 col-xl-2">
                    <img
                      src="http://localhost:5000/uploads/products/1678694895391_ image1.jpeg"
                      class="img-fluid rounded-3"
                      alt="Cotton T-shirt"
                    />
                  </div>
                  <div class="col-md-3 col-lg-3 col-xl-3">
                    <p class="lead fw-normal mb-2">
                      {{ cart?.product?.product_name }}
                    </p>
                    <p>
                      <span class="text-muted">MOQ :</span>
                      <span class="text-muted"> </span
                      >{{ cart?.product?.display_moq }}
                    </p>
                  </div>
                  <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <button
                      class="btn btn-link px-2"
                      style="cursor: pointer"
                      @click="decreaseQuantity(cart)"
                    >
                      <font-awesome-icon
                        icon="fa-solid fa-minus"
                        class="fa-2x"
                      />
                    </button>
                    <span class="py-2 px-3 border">{{ cart.quantity }}</span>
                    <!-- <input id="form1" min="1" disabled  :value="cartItem.quantity" type="number"
                  class="form-control form-control-sm" /> -->

                    <button
                      class="btn btn-link px-2"
                      style="cursor: pointer"
                      @click="increaseQuantity(cart)"
                    >
                      <font-awesome-icon
                        icon="fa-solid fa-plus"
                        class="fa-2x"
                      />
                    </button>
                  </div>
                  <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h5 class="mb-0">{{ cart?.product?.price }}</h5>
                  </div>
                  <div
                    class="col-md-1 col-lg-1 col-xl-1 text-end"
                    style="cursor: pointer"
                    @click="removeCartProduct(cart._id)"
                  >
                    <font-awesome-icon
                      icon="fa-solid fa-trash "
                      class="fa-2x"
                      style="color: #ed333b"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="" v-if="allCartProducts.length">
            <div class="card-body d-flex m-auto w-25">
              <button type="button" class="btn btn-warning btn-block btn-lg">
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="d-flex justify-content-center align-items-center mb-4 mt-5"
      >
        <h3 class="fw-normal mb-0 text-black text-center">
          No Product Added in Cart Yet.
        </h3>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: { ...mapGetters(["allCartProducts", "u_token"]) },
  created() {
    if (this.u_token) {
      this.fetchCartData(this.u_token);
    }
  },
  methods: {
    ...mapActions([
      "removeCartProduct",
      "increaseQuantity",
      "decreaseQuantity",
      "fetchCartData",
    ]),
  },
};
</script>

<style scoped></style>
