import Vue from 'vue'
import App from './App'
import commonData from '@/components/addShopcar/common-data.js'
import store from '@/pages/store/index.js'
Vue.prototype.$commonData = commonData
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	...App,
	// store
})
app.$mount()
