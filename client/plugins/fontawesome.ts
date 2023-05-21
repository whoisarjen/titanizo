import { library, config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/named
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHeart,
  faChevronDown,
  faChevronRight,
  faUser,
  faBagShopping,
  faMagnifyingGlass,
  faArrowUpRightFromSquare,
  faTruckFast,
  faArrowRight,
  faFaucet
} from '@fortawesome/pro-light-svg-icons'
import { faMedal, faBoxTaped } from '@fortawesome/pro-thin-svg-icons'
import { faFire } from '@fortawesome/pro-duotone-svg-icons'

library.add(
  faTruckFast,
  faBagShopping,
  faHeart,
  faUser,
  faMagnifyingGlass,
  faFire,
  faChevronDown,
  faChevronRight,
  faArrowUpRightFromSquare,
  faMedal,
  faBoxTaped,
  faArrowRight,
  faFaucet
)

config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
