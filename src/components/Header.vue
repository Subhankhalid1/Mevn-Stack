<template>
  <nav id="navbar" class="navbar navbar-expand-xl p-3 ">
    <div class="container-fluid myCont " style="width: 80%">
      <a
        class="navbar-brand bold px-2"
        style="font-size: 24px; color: aqua"
        href="#"
        >LOGO IS HERE</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse " id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">Expert Sourcing</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">Contract Manufacturing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" style="color: rgba(0,178,201)" href="#">Buy</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Financing</a>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              AboutUs
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item bold" href="#">Our Story</a></li>
              <li><a class="dropdown-item bold" href="#">How to Buy</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
         
        </ul>
        <div class="d-flex justify-content-end">
          <div class="submit m-2 p-2">
            <button>Register</button>
          </div>
          <div class="submit m-2 p-2">
            <button class="button1 d-flex">
              <font-awesome-icon
                icon="fa-user "
                class="text-gray-400 d-flex m-1"
              />
              Sign In
            </button>
          </div>
          <div class="d-flex m-auto m-2 p-2">
            <font-awesome-icon
              icon="fa-basket-shopping "
              class="text-gray-300 fa-2x d-flex m-1"
            />
            <span class="badge badge-warning mt-4" id="lblCartCount">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  // name: "Header",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background: rgb(255, 255, 255);
  padding: 5px 20px;
  margin-top: 10px;
  border-radius: 20px;
  color: rgb(28, 214, 214);
  border: 1px solid rgb(28, 214, 214);
}
.button1 {
  box-sizing: border-box;
  background: rgb(255, 255, 255);
  padding: 5px 20px;
  margin-top: 10px;
  border-radius: 20px;
  color: #2d2d84;
  border: 1px solid #2d2d84;
}
.submit {
  text-align: center;
}
#navbar {
  background-color: white;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  font-size: 16px;
  font-family: "AvenirLTPro", Sans-serif;
  font-weight: 300;
  line-height: 16px;
}
a {
  color: #54595f;
}
.badge {
  padding-left: 9px;
  padding-right: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 10px;
  text-align: center;
  
}

.label-warning[href],
.badge-warning[href] {
  background-color: #c67605;
}
#lblCartCount {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  background: #080808;
  text-align: center;
  color: #fff;
  height: 4px;
  padding: 10px;
  text-align: center;
  margin-left: -18px;
}

@media(min-width:0px) and (max-width:767px){
   .myCont{
    width: 100%!important;
   }
  }
</style>
