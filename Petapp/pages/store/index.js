

import Vue from "vue";
import Vuex from "vuex";

import pet from './pet.js'
Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		pet
	}
});
