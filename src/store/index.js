import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import vuexPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters,
	plugins: [
		vuexPersistedstate({
			storage: window.localStorage,
			reducer(val) {
				return {
					user: val.user
				}
			}
		})
	],
})
