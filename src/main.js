import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/js/bootstrap.js'
import store from './store'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCartShopping, faUser, faSearch, faBars, faCaretDown, faTableList, faTableColumns, faCaretRight, faCaretLeft, faListUl, faGrip, faChevronLeft, faChevronRight, faBasketShopping, faTableCellsLarge, } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUser, faCartShopping,faSearch,faBars,faCaretDown, faTableList, faTableColumns,faTableCellsLarge, faCaretRight, faCaretLeft, faListUl, faGrip,faChevronLeft, faChevronRight,faBasketShopping,  )


createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app')
