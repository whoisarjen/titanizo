import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faChevronDown, faUser, faBagShopping, faMagnifyingGlass, faTruckFast, faArrowRight } from '@fortawesome/pro-light-svg-icons'
import { faMedal, faBoxTaped } from '@fortawesome/pro-thin-svg-icons'
import { faFire } from '@fortawesome/pro-duotone-svg-icons';

library.add(faTruckFast, faBagShopping, faHeart, faUser, faMagnifyingGlass, faFire, faChevronDown, faMedal, faBoxTaped, faArrowRight);
// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})