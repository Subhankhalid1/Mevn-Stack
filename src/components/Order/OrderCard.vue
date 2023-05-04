<template>
  <div class="card m-3" style="width: 42rem">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <h6 class="card-title">Order #: {{ index + 1 }}</h6>
        <h6 class="card-title ">Status: <span  :style="{ color: order?.status[0]?.status? 'green' : 'blue' }" class="fw-bold"> {{ order?.status.length!=0?order.status[0]?.status:"In Progress"}} </span></h6>
      </div>
    

      <p class="card-text text-primary mt-2 mb-3">
        <span class="text-dark">Order Created At: </span
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

      <a href="#" class="btn btn-primary mt-2" @click.prevent="toggleShow"
        >See Order Detail</a
      >
    </div>
    <div
      v-if="show"
      class="d-flex m-2 pb-2 justify-content-between"
      v-for="(product, index) in order.products"
      :key="product._id"
    >
      <!-- {{ show }} -->
      <span class="text-dark"
        ><span class="text-primary">Product #: </span>{{ index + 1 }}</span
      >
      <span
        ><span class="text-danger">Slug: </span
        >{{ product?.product_name }}</span
      >
      <span><span class="text-success">Cost: </span>${{ product?.price }}</span>
      <span v-for="item in order.returnOrder">
        <span v-if="item.product===product?._id" class="text-danger fw-bold">
          Requested
        </span>
      </span>
      <span v-if="order.status[0]?.status">
      <Modal :visible="false" :variant="success" :product="product._id" :order="order">

      </Modal>
      </span>
      
     
    </div>
  </div>
</template>

<script>
import Modal from '../Modal/Modals.vue';
export default {
  name: "OrderCard",
  components: {
    Modal,
  },
  props: {
    order: Object,
    index: Number,
  },
  data() {
    return {
      show: false,
      showModal: false,
      
    };
  },
 
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
  
  },
};
</script>

<style scoped></style>
