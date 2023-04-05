<template>
  <div class="container-fluid d-flex m-auto row myCont p-1" style="background: #eee; width: 76%; border-radius: 10px;">
    <div class="cateSec col-md-1 col-sm-12 d-flex m-auto" style="width:12%">
      <div
        class="d-flex justify-content-start"
        @click="handleDrawer(showDown)"
      >
        <font-awesome-icon
          style="color: rgba(0,178,201);cursor: pointer;"
          class="fa-2x p-2 d-flex justify-content-start"
          icon="fa-solid fa-table-cells-large"
        />
        <p style="font-size: 16px; cursor: pointer;" class="d-flex m-auto">Categories</p>
      </div>
    </div>
    <div class="inputSec col-md-10 col-sm-12 d-flex text-center p-2" style="width:56vw">
      <div
        class="input-group rounded-pill bg-white "
        style="border: 1px solid #ddd;"
      >
        <input
          type="text"
          class="form-control m-2 p-1"
          placeholder="    What are you looking for?"
          style="border: none"
          v-model="search"
        />

        <div class="m-1" style="border-left: 3px solid #ddd"></div>
        <div class="input-group-append w-25 m-1 cateComp">
          <select
            placeholder="All Categories"
           
            style="width: 94%; height: 100%; border: none; cursor: pointer; background-color: white;"
           v-model="cateSelect"
          >
            <option value="" disabled >All Categories</option>
          
            <option  v-for="cate in allCategories">{{ cate.category }}</option>
           
          </select>
        </div>
      </div>
    </div>
    
    <div class="btnSec col-md-1 col-sm-12 d-flex m-auto justify-content-end searchBtn" style="width:12%">
      <div class="submit d-flex justify-content-end " @click="categoryWithName({search,cateSelect})">
        <button>Search</button>
      </div>
    </div>
  </div>
  <div v-if="showDown">
    <Drawer />
  </div>
</template>

<script>
import { ref } from "vue";
import Drawer from "../Drawer/Drawer.vue";
import {mapGetters, mapActions} from "vuex"
export default {
  components: {
    Drawer,
  },
  setup() {
    const showDown = ref(false);
    const cateSelect=ref("")
    const search=ref("")

    const handleDrawer = (e) => {
      // console.log("toggle", e);
      if (e === false) {
        showDown.value = true;
        // themeBorder.value=true
      } else {
        showDown.value = false;
        // themeBorder.value=false
      }
    };

    return { showDown, handleDrawer,cateSelect, search };
  },
  methods:{
    ...mapActions(['fetchCategories','categoryWithName']),
    
   
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
button {
  background: rgba(0,178,201);
  padding: 8px 40px;
  /* margin-top: 10px; */
  border-radius: 20px;
  color: white;
  border: none;
}
.submit {
  text-align: center;
}

@media(min-width:0px) and (max-width:1397px){
   .myCont{
    width: 100%!important;
   }
   .cateComp{
    width: 10rem!important;
   }
   .searchBtn{
    display: flex !important;
    margin: auto !important;
    padding: 10px!important;
    justify-content: start !important;
   }
   .btnSec{
    width: 100% !important;
   }
   .cateSec{
    width: 100% !important;
   }
   .inputSec{
    width: 100% !important;
   }
}
</style>
