<template>
  <div
    v-if="OpenClose"
    class="modal fade show"
    tabindex="-1"
    aria-modal="true"
    aria-labelledby="exampleModalLable"
    role="dialog"
    style="display: block"
  >
    <div class="modal-dialog" style="border: 1px solid rgba(0, 178, 201)">
      <div class="modal-content">
        <!-- <div class="modal-header"> -->
        <h3 class="modal-title pt-3 pb-3" style="color: rgba(0, 178, 201)">
          BuyHive Return Page
        </h3>
        <!-- <button
            type="button"
            @click="OpenCloseFunc()"
            class="btn-close"
            aria-label="Close"
          ></button> -->
        <!-- </div> -->
        <div class="modal-body">
          <form class="row g-3">
            <div class="col-md-12">
              <label for="inputEmail4" class="form-label d-flex p-1"
                >Upload an image
              </label>
              <input
                type="file"
                class="form-control"
                id="inputGroupFile02"
                @change="(e) => handleFileUpload(e)"
              />
              <!-- <label class="input-group-text" for="inputGroupFile02">Upload</label> -->
            </div>
            <div class="col-12">
              <label
                for="exampleFormControlTextarea1"
                class="form-label d-flex text-mute p-1"
                >Description (Why do you want to return this product?)</label
              >
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="6"
                v-model="description"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="OpenCloseFunc()"
            :class="'btn btn-+variant'"
          >
            Close
          </button>
          <button
            type="button"
            @click="submitForm"
            class="btn fw-bold"
            style="color: rgba(0, 178, 201)"
          >
            Submit Now
          </button>
        </div>
      </div>
    </div>
  </div>

  <button

    type="button"
    @click="OpenCloseFunc()"
    :class="'btn active btn-+variant'"
  >
  Return
  </button>

</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Modal",
  props: {
    visible: Boolean,
    variant: String,
    product: String,
    order: Object,
  },
  data() {
    return {
      OpenClose: this.visible,
      productPic: null,

      description: "",
      order: this.order,
      product: this.product,
    };
  },
  methods: {
    ...mapActions(["returnQuery"]),
    OpenCloseFunc() {
      this.OpenClose = !this.OpenClose;
    },
    handleFileUpload(event) {
      this.productPic = event.target.files[0];
    },
    submitForm() {
      let formData = new FormData();
      formData.append("product", this.product);
      formData.append("order", this.order?._id);
      formData.append("productPic", this.productPic);

      formData.append("description", this.description);

      console.log("formData---------->", formData);
      this.returnQuery(formData);
    },

  },
  computed(){
// const unique=this.order?.find(item=>item.product===this.product)
// console.log("uniques---->", unique)
  },
  watch: {
    visible: function (newVal, oldVal) {
      this.OpenClose = newVal;
      console.log("newVal---->" + newVal + "==" + oldVal);
    },
  },
};
</script>
<style scoped></style>
