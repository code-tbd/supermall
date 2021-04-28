import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addToCart(state, payload) {
      let overOneProdut = state.cartList.find( item => item.id === payload.id )
      if(overOneProdut) {
        overOneProdut.count ++
      }else {
        payload.count = 1
        state.cartList.push(payload)
      }
    }
  }
})

export default store