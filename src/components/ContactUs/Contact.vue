<template>
  <div class="container-fluid mt-5"  style="width:76%">
    <!--Section: Contact v.2-->
    <section class="mb-4">
      <!--Section heading-->
      <h2 class="h1-responsive font-weight-bold text-center my-4">
        Contact us
      </h2>
      <!--Section description-->
      <p class="text-center w-responsive mx-auto mb-5">
        Do you have any questions? Please do not hesitate to contact us
        directly. Our team will come back to you within a matter of hours to
        help you.
      </p>

      <div class="row">
        <!--Grid column-->
        <div class="col-md-9 mb-md-0 mb-5">
          <form
            id="contact-form"
            name="contact-form"
          >
            <!--Grid row-->
            <div class="row">
              <!--Grid column-->
              <div class="col-md-6">
                <div class="md-form mb-0">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="form-control"
                    placeholder="Your Name"
                    v-model="name"
                    required
                  />
                </div>
              </div>
              <!--Grid column-->

              <!--Grid column-->
              <div class="col-md-6">
                <div class="md-form mb-0">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    class="form-control"
                    placeholder="Your Email Address"
                    v-model="email"
                    required
                  />
                </div>
              </div>
              <!--Grid column-->
            </div>
            <!--Grid row-->

            <!--Grid row-->
            <div class="row mt-4 mb-4">
              <div class="col-md-6">
                <div class="md-form mb-0">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    class="form-control"
                    placeholder="Your Phone Number"
                    v-model="phone"
                    required
                  />
                </div>
              </div>
            </div>
            <!--Grid row-->

            <!--Grid row-->
            <div class="row">
              <!--Grid column-->
              <div class="col-md-12 mb-3">
                <div class="md-form">
                  <textarea
                    type="text"
                    id="message"
                    name="message"
                    rows="5"
                    class="form-control md-textarea"
                    placeholder="Write Down Your Query..."
                    v-model="description"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <!--Grid row-->
          </form>

          <div class="text-center text-md-left">
            <a
              class="btn btn-primary"
              @click.prevent=" handleFormData()"
              >Submit</a
            >
          </div>
          <div class="status"></div>
        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-md-3 text-center border">
          <ul class="list-unstyled mb-0">
            <li>
              <i class="fas fa-map-marker-alt fa-2x"></i>
              <p>San Francisco, CA 94126, USA</p>
            </li>

            <li>
              <i class="fas fa-phone mt-4 fa-2x"></i>
              <p>+ 01 234 567 89</p>
            </li>

            <li>
              <i class="fas fa-envelope mt-4 fa-2x"></i>
              <p>contact@buyhive.com</p>
            </li>
          </ul>
        </div>
        <!--Grid column-->
      </div>
    </section>
    <!--Section: Contact v.2-->
  </div>
</template>

<script>
  import {  mapActions } from "vuex";
export default{
  data(){
    return{
      email:"",
      name:"",
      phone:"",
      description:""
    }
  },
  methods:{
    ...mapActions([
        "sendContact"
      ]),
    handleFormData(){
      const data={
        email:this.email,
        name:this.name,
        phone:this.phone,
        description:this.description
      }
      this.sendContact(data)

    }
  }
}
</script>
<style scoped></style>
