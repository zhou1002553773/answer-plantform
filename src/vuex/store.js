import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    userInfo: {},
    selectCity: {
      cityName:'',
      cityCode:''
    },
    userRole: {},
    cityList: [],
    selectSource: {},
    initPlatformStep: 0
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    getSelectCity (state) {
      return state.selectCity
    },
    getCityList (state) {
      return state.cityList
    },
    getSelectSource (state) {
      return state.selectSource
    },
    getUserRole (state) {
      return state.userRole
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setSelectCity (state, selectCity) {
      state.selectCity = selectCity
    },
    setCityList (state, cityList) {
      return state.cityList = cityList
    },
    setSelectSource (state, selectSource) {
      return state.selectSource = selectSource
    },
    setUserRole (state, userRole) {
      return state.userRole = userRole
    }
  },
  actions: {
    setUserInfo ({ commit }, userInfo) {
      commit('setUserInfo', userInfo)
    },
    setSelectCity ({ commit }, selectCity) {
      commit('setSelectCity', selectCity)
    },
    setCityList ({ commit }, cityList) {
      commit('setCityList', cityList)
    },
    setSelectSource ({ commit }, selectSource) {
      commit('setSelectSource', selectSource)
    },
    setUserRole ({ commit }, userRole) {
      commit('setUserRole', userRole)
    }
  }
})

export default userStore
