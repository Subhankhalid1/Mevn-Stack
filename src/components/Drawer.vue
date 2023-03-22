<template>
  <div class="container d-flex justify-content-center">

    <ul class="div-absolute shadow">
      <section class="d-flex justify-content-start p-3">
        <ul class="ul1 p-2" v-for="(cate ,index ) in allCategories">
          <a class="pb-2 border-none d-flex justify-content-start" style="font-size: 0.875rem; text-decoration: none; color:#080808;font-weight: 600;">{{ cate.category }}</a>

          <li v-for="sub in cate.subCategory "  class=" li-hover d-flex justify-content-start" style="font-size: 0.75rem; padding-top: 0.25rem;">
         
              {{ sub.subCategory }}
           
          </li>
          <!-- <li>
            <p class="li-hover" style="text-transform: capitalize">Coverall</p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">Face Mask</p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Face Shield
            </p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">Gloves</p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">Goggles</p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">Shoe Cover</p>
          </li>
          <li>
            

            <p class="li-hover" style="text-transform: capitalize">Gown</p>
          </li>

          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Head Cover
            </p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Mask Straps
            </p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">PPE Kit</p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Shoe Cover
            </p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Surgical Scrubs
            </p>
          </li> -->
        </ul>

        <!-- <ul class="p-4 ">
          <h6 class="fw-bold pb-2">Health & Medical</h6>

          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Beard Covers
            </p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">Coverall</p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">Face Mask</p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Face Shield
            </p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">Medical Equipment & Hospital Supplies </p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">Goggles</p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">Shoe Cover</p>
          </li>
          <li>
            

            <p class="li-hover" style="text-transform: capitalize">Gown</p>
          </li>

          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Head Cover
            </p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Mask Straps
            </p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">PPE Kit</p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Shoe Cover
            </p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Surgical Scrubs
            </p>
          </li>
        </ul>
        <ul class="p-4">
          <h6 class="fw-bold pb-2">Garden & Outdoor</h6>

          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Beard Covers
            </p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">Patio Furniture & Accessories </p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">Face Mask</p>
          </li>

        </ul>
        <ul class="p-4">
          <h6 class="fw-bold pb-2">Sports & Fitness</h6>

          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Pilates
            </p>
          </li>
          <li>
            <p class="li-hover" style="text-transform: capitalize">Strength Training & Equipment</p>
          </li>
          

        </ul>

        <ul class="p-4">
          <h6 class="fw-bold pb-2">Other</h6>

          <li>
            <p class="li-hover" style="text-transform: capitalize">
              Miscellaneous
            </p>
          </li>
         

        </ul>
        <ul class="p-4">
          <h6 class="fw-bold pb-2">Baby</h6>

          <li>
            <p class="li-hover" style="text-transform: capitalize">
                Feeding Products 
            </p>
          </li>
         

        </ul>

        <ul class="p-4">
          <h6 class="fw-bold pb-2">Beauty & Personal Care</h6>

          <li>
            <p
              className="li-hover"
              style="text-transform: capitalize"
            >
            Electric Copper Combs 
            </p>
          </li>
          <li>
            <p
              className=" li-hover"
              style="text-transform: capitalize"
            >
              Skin Care
            </p>
          </li>
          <li>
            <p
              className=" li-hover"
              style="text-transform: capitalize"
            >
              Eye Brow Trimmers
            </p>
          </li>
          <li>
            <p
              className=" li-hover"
              style="text-transform: capitalize"
            >
              Feminine Care
            </p>
          </li>
        </ul>
        <ul class="p-4">
          <h6 class="fw-bold pb-2"> Home, Kitchen & Office</h6>

          <li>
            <p class="li-hover" style="text-transform: capitalize">
                Home & Office Decor 
            </p>
          </li>
         

        </ul> -->
        
       
      </section>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import {mapGetters, mapActions} from "vuex"

export default {
  setup() {
    const showDown = ref(false);

    const handleDrawer = (e) => {
      console.log("toggle", e);
      if (e === false) {
        showDown.value = true;
      } else {
        showDown.value = false;
      }
    };

    return { showDown, handleDrawer };
  },
  methods:{
    ...mapActions(['fetchCategories'])
   
  }
  ,
  computed:{...mapGetters(['allCategories'])

},
  created(){
     this.fetchCategories()

    
  },
};
</script>

<style scoped>
h6{
    display: flex;
    justify-content: start;
}
li{
    display: flex;
    justify-content: start;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-size: x-small;
}

ul li a {
  text-decoration: none;
  color: white;
}

ul li a:hover {
  color: white;
}

.main-after-nav {
  background-color: rgb(69 70 70);
  color: white;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: x-small;
  font-style: bold;
}

.li-relative {
  position: relative;
  font-size: x-small;
  /* font-style: bold; */
}

.border-bottom {
  text-transform: uppercase;
  border-bottom: 1px solid gray;
  font-size: 12px;
}

.div-absolute {
  position: absolute;
  width: 76%;
  background-color: #eee;
  color: black;
  margin: auto !important;
  height: fit-content;
  display: flex;
  justify-content: start;
  overflow: auto;
}

/* .div-absolute1 {
  position: absolute;
  width: 12rem;
  top: 100%;
  background-color: white;
  color: black;
} */

ul li ul {
  display: none !important;
}

.li-hover:hover {
  color: rgb(135, 242, 217);
  cursor: pointer;
}

ul li:hover ul {
  display: block !important;
  z-index: 999;
}

.text-white {
  color: white !important;
}

@media(min-width:0px) and (max-width:767px){
   .div-absolute{
    width: 94%!important;
   }
   .ul1{
    display: flex;
    flex-direction: column;
    width: 42vw!important;
 
   }
   li{
    font-size: 8px!important;
    padding-top: 0.25rem!important;
    
   }
   a{
  
    
    font-size: 12px!important;
   }
  }
  @media(min-width:768px) and (max-width:1323px){
    .div-absolute{
    width: 76%!important;
   }
   .ul1{
    display: flex;
    flex-direction: column;
    width: 22vw!important;
 
   }
   li{
    font-size: 8px!important;
    padding-top: 0.25rem!important;
    
   }
   a{
  
    
    font-size: 12px!important;
   }
  }
</style>

