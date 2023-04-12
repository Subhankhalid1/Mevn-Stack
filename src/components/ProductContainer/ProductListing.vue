<template>
<div class="container-fluid d-flex mt-5 mb-5 myMain" style="width: 77%;">
<div class="row">
    <div class="col-md-3 col-sm-12 col-12 ">
     
        <LefSide  />
        
    </div>
    <div class="col-md-9 col-sm-12 col-12 ">
     
        <RightSide />
    </div>
</div>
</div>
</template>

<script>
import LefSide from "./LeftSide.vue"
import RightSide from "./RightSide.vue"


export default{
    
    components:{
        LefSide,
        RightSide
    },
    setup(){
     
       

    }
    
};

</script>

<style scoped>
@media(min-width:0px) and (max-width:767px){
   .myMain{
    width: 100%!important;
   }
  }
</style>