<template>
  <div class="container-fluid mt-5 px-5" style="width: 82%">
    <div class="mb-4">
      <h2>Confirm order and pay</h2>
      <span
        >please make the payment, after that you can enjoy all the features and
        benefits.</span
      >
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="card p-3">
          <h6 class="text-uppercase">Payment details</h6>
          <div class="inputbox mt-3">
            <input
              type="text"
              name="name"
              class="form-control"
              required="required"
              v-model="cardName"
            />
            <span>Name on card</span>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="inputbox mt-3 mr-2">
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  required="required"
                  v-model="cardNumber"
                />
                <i class="fa fa-credit-card"></i> <span>Card Number</span>
              </div>
            </div>

            <div class="col-md-6">
              <div class="d-flex flex-row">
                <div class="inputbox mt-3 mr-2">
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    required="required"
                    v-model="expiry"
                  />
                  <span>Expiry</span>
                </div>

                <div class="inputbox mt-3 mr-2">
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    required="required"
                    v-model="cvv"
                  />
                  <span>CVV</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 mb-4">
            <h6 class="text-uppercase">Billing Address</h6>

            <div class="row mt-3">
              <div class="col-md-6">
                <div class="inputbox mt-3 mr-2">
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    required="required"
                    v-model="streetAddress"
                  />
                  <span>Street Address</span>
                </div>
              </div>

              <div class="col-md-6">
                <div class="inputbox mt-3 mr-2">
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    required="required"
                    v-model="city"
                  />
                  <span>City</span>
                </div>
              </div>
            </div>

            <div class="row mt-2">
              <div class="col-md-6">
                <div class="inputbox mt-3 mr-2">
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    required="required"
                    v-model="state"
                  />
                  <span>State/Province</span>
                </div>
              </div>

              <div class="col-md-6">
                <div class="inputbox mt-3 mr-2">
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    required="required"
                    v-model="zipCode"
                  />
                  <span>Zip code</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="mt-4 mb-4 d-flex justify-content-between"
          style="cursor: pointer"
        >
          <span @click="backPage" style="color:rgba(0, 178, 201)">Previous step</span>

          <button class="btn btn-success p-3" @click.prevent="handleCheckout">Proceed to Pay</button>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card card-blue p-4 text-white mb-3">
          <span>You have to pay</span>
          <div class="d-flex flex-row align-items-end mb-3">
            <h1 class="mb-0 yellow">${{ this.$route.query.totalPrice }}</h1>
            <span>.00</span>
          </div>

          <span
            >Enjoy all the features and perk after you complete the
            payment</span
          >
          <a href="#" class="yellow decoration">Know all the features</a>

          <div class="hightlight">
            <span
              >100% Guaranteed support and update for the next 5 years.</span
            >
          </div>
        </div>

        <div class="card mb-4">
          <div class="card-body p-4 d-flex flex-row">
            <div class="form-outline flex-fill">
              <input
                type="text"
                id="form1"
                class="form-control form-control-lg"
                v-model="code"
              />
              <label class="form-label" for="form1">Discound code</label>
            </div>
            <button
              type="button"
              class="btn btn-outline-warning btn-lg ms-3"
              @click="handleCoupon"
            >
              Apply
            </button>
          </div>
        </div>


        <div class="card mb-4 text-white" v-if="totalPrice" style=" background-color: rgba(0, 178, 201);">
          <div class="card-body p-4 d-flex flex-row">
            <div class="form-outline flex-fill">
          Price After Discount:
            </div>
            <div class="form-outline flex-fill yellow fw-bold">
           <h3>${{ totalPrice  }}</h3>
            </div>
           
          </div>
        </div>
      </div>
    </div>
    <modal/>
  </div>

</template>

<script>
import { mapGetters,mapActions } from "vuex";


export default {
  data() {
    return {
      cardNumber:"",
      cardName:"",
      expiry:"",
      cvv:"",
      streetAddress:"",
      city:"",
      state:"",
      zipCode:"",
      payment:"",
      user:"",
      coupon:"",
      code: "",
      price: "",
    };
  },
  components:{
    name:"modal"
  },
  methods: {
    ...mapActions(["applyCoupon","postCheckoutData"]),

    backPage() {
      this.$router.push("/cart");
    },

    handleCoupon() {
      const data = {
        code: this.code,
      };
      this.applyCoupon(data);
    },
    handleCheckout(){
      const data={
      cardNumber:this.cardNumber,
      cardName:this.cardName,
      expiry:this.expiry,
      cvv:this.cvv,
      streetAddress:this.streetAddress,
      city:this.city,
      state:this.state,
      zipCode:this.zipCode,
      payment:this.totalPrice||this.$route.query.totalPrice,
      couponCode:this.code
     
      }
      this.postCheckoutData(data);
      
      // this.cardName=""
      // this.cardNumber=""
      // this.cvv=""
      // this.streetAddress=""
      // this.zipCode=""
      // this.city=""
      // this.state=""
      // this.expiry=""
      

    }
  },
  computed: { ...mapGetters(["totalPrice","userInfo"]) },
};
</script>

<style scoped>
body {
  background-color: #eee;
}

.container {
  height: 100vh;
}

.card {
  border: none;
}
.form-control {
  border-bottom: 2px solid #eee !important;
  border: none;
  font-weight: 600;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #8bbafe;
  outline: 0;
  box-shadow: none;
  border-radius: 0px;
  border-bottom: 2px solid rgba(0, 178, 201) !important;
}

.inputbox {
  position: relative;
  margin-bottom: 20px;
  width: 100%;
}

.inputbox span {
  position: absolute;
  top: 7px;
  left: 11px;
  transition: 0.5s;
}

.inputbox i {
  position: absolute;
  top: 13px;
  right: 8px;
  transition: 0.5s;
  color: rgba(0, 178, 201);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.inputbox input:focus ~ span {
  transform: translateX(-0px) translateY(-15px);
  font-size: 12px;
}

.inputbox input:valid ~ span {
  transform: translateX(-0px) translateY(-15px);
  font-size: 12px;
}

.card-blue {
  background-color: rgba(0, 178, 201);
}

.hightlight {
  background-color: rgba(0, 178, 201);
  padding: 10px;
  border-radius: 10px;
  margin-top: 15px;
  font-size: 14px;
}

.yellow {
  color: #fdcc49;
}

.decoration {
  text-decoration: none;
  font-size: 14px;
}

.btn-success {
  color: #fff;
  background-color: rgba(0, 178, 201);
  border-color: rgba(0, 178, 201);
}

.btn-success:hover {
  color: #fff;
  background-color: rgba(0, 178, 201);
  border-color: rgba(0, 178, 201);
}

.decoration:hover {
  text-decoration: none;
  color: #fdcc49;
}
</style>
