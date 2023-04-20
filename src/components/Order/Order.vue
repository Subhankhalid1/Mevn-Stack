<template>
  <div class="mt-5 d-flex m-auto p-2 flex-wrap" style="width: 78%">
    <!-- {{ allOrders }} -->
   
        <OrderCard v-for="(order, ind) in allOrders" :key="ind" 
        :order="order" 
        :index="ind"
        :selectedItem="selectedItem" 
        :show="show"
        @toggleShow="toggleShow" 
        />
      <!-- <div class="card m-3" style="width: 27.5rem">
        <div class="card-body">
          <h5 class="card-title">Order #: {{ index + 1 }}</h5>

          <p class="card-text text-primary mt-2 mb-3">
            <span class="text-dark">Order Created: </span
            >{{ new Date(order?.createdAt).toLocaleString() }}
          </p>

          <div class="d-flex justify-content-between">
            <span>
              <p class="card-text text-success">
                Total Order Products: {{ order?.products?.length }}
              </p>
            </span>
            <span>
              <h5 class="card-title text-danger">Total: {{ order.total }}</h5>
            </span>
          </div>
          <p class="card-text text-dark mt-2 mb-4">Order_ID: {{ order._id }}</p>

          <a href="#" class="btn btn-primary mt-2" @click.prevent="toggleShow()"
            >See Order Detail</a
          >
        </div>
        <div
          v-if="show"
          class="d-flex m-2 justify-content-between"
          v-for="(product, ind) in order.products"
          :key="ind"
        >
          <span class="text-dark"
            ><span class="text-primary">#</span>{{ ind + 1 }}</span
          >
          <span
            ><span class="text-danger">Slug: </span
            >{{ product?.product_name }}</span
          >
          <span
            ><span class="text-success">Price: </span>${{
              product?.price
            }}</span
          >
        </div>
      </div> -->
   
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OrderCard from "./OrderCard.vue"
export default {
  data() {
    return {
      show: false,
      selectedItem:null
    };
  },
  components:{
OrderCard
  },
  created() {
    this.getOrders();
  },
  computed: { ...mapGetters(["allOrders"]) },
  methods: {
    ...mapActions(["getOrders"]),
    toggleShow(id) {
    const getId= this.allOrders.find(order=>order._id===id)
    if(id){
    this.selectedItem=getId.products
    this.show=true
    }
    else{
      this.show=false
    }
    },
  },
};
</script>

<style></style>
