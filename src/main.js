import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/js/bootstrap.js'
import 'mdb-ui-kit/css/mdb.min.css'
import 'mdb-ui-kit/js/mdb.min.js'
import store from './store'
import Toastify from 'vue3-toastify'
import { plugin, defaultConfig } from '@formkit/vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCartShopping, faUser, faSearch, faBars, faCaretDown, faTableList, faTableColumns, faCaretRight, faCaretLeft, faListUl, faGrip, faChevronLeft, faChevronRight, faBasketShopping, faTableCellsLarge, faTrash, faMinus, faPlus, faHeart, } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUser, faCartShopping,faSearch,faBars,faCaretDown, faTableList, faTableColumns,faTableCellsLarge, faCaretRight, faCaretLeft, faListUl, faGrip,faChevronLeft, faChevronRight,faBasketShopping,faTrash, faMinus,faPlus,faHeart  )


createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).use(Toastify).use(plugin, defaultConfig).mount('#app')
