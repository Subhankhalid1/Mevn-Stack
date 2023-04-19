<template>
     <div class="card m-3" style="width: 27.5rem">
        <div class="card-body">
          <!-- <h5 class="card-title">Order #: {{  index }}</h5> -->

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

          <a href="#" class="btn btn-primary mt-2"  @click="$emit('toggleShow', order._id)"
            >See Order Detail</a
          >
        </div>
        <div
          v-if="show"
          class="d-flex m-2 justify-content-between"
          v-for="(product, index) in order.products"
          :key="index"
        >
        {{ show }}
          <span class="text-dark"
            ><span class="text-primary">#</span>{{ index + 1 }}</span
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
      </div>
</template>

<script>
export default{
    name: "OrderCard",
  props: {
    order:Object,
    show:Boolean
    
  },
    data(){
        return{

        }
    }
}

</script>

<style scoped>
</style>