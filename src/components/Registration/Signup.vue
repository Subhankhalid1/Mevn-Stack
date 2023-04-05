<template>
    <section class="vh-100">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4" @submit.prevent="submitRegisterForm">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" class="form-control" v-model="form.name"/>
                      <label class="form-label" for="form3Example1c">Your Name</label>
                      <span v-if="errors.username">{{ errors.name }}</span>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" class="form-control" v-model="form.email" />
                      <label class="form-label" for="form3Example3c">Your Email</label>
                      <span v-if="errors.email">{{ errors.email }}</span>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" class="form-control" v-model="form.password"/>
                      <label class="form-label" for="form3Example4c">Password</label>
                      <span v-if="errors.password">{{ errors.password }}</span>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="phone" id="form3Example4cd" class="form-control" v-model="form.phone" />
                      <label class="form-label" for="form3Example4cd">Phone Number</label>
                      <span v-if="errors.password">{{ errors.phone }}</span>
                    </div>
                  </div>

                  <!-- <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div> -->

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" class="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { mapActions } from "vuex";
import { useFormkit } from 'formkit';
export default {
  data() {
    return{
      form: {
        name: '',
        email: '',
        password: '',
        phone:'',
      },
      validationRules:{
        name: [
          { rule: 'required', message: 'Username is required' },
          { rule: 'minLength:3', message: 'Username must be at least 3 characters long' }
        ],
        email: [
          { rule: 'required', message: 'Email is required' },
          { rule: 'email', message: 'Email is invalid' }
        ],
        password: [
          { rule: 'required', message: 'Password is required' },
          { rule: 'minLength:6', message: 'Password must be at least 6 characters long' }
        ],
        phone: [
          { rule: 'required', message: 'Phone is required' },
          { rule: 'minLength:14', message: 'Password must be at least 14 characters long' }
        ],
      },
      errors: {}
    };
  },
  methods: {
    ...mapActions([
    "registerUser"
    ]),


    async submitRegisterForm() {
     const {form}=this
      // validate form using Formkit
      const { isValid, errors } = await useFormkit(form,this.validationRules );

      const regData={
        name:this.form.name,
        email:this.form.email,
        password:this.form.password,
        phone:this.form.phone
      }
      if (isValid) {
        // submit form data to server
        this.registerUser(regData)
      } else {
        // set form validation errors
        this.errors = errors;
      }

      // this.registerUser(regData)
    }
  }
}

</script>

<style scoped>

</style>