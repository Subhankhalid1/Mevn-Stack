

<template>
<Header/>
<SearchBox/>
  <router-view/>
</template>

<script>
import Header from "./components/Header/Header.vue";
import SearchBox from "./components/SearchBox/SearchBox.vue"


export default {
components: {
  Header,
  SearchBox
},

  
 
 

}
</script>

<style>
#app {
  font-family: Avenir LT Pro,sans-serif!important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:RGB(35, 31, 32);
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
