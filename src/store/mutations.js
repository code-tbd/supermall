import {ADD_TO_CART} from './mutation-types'

export default {
  [ADD_TO_CART](state, payload) {
    let overOneProdut = state.cartList.find( item => item.id === payload.id )
    if(overOneProdut) {
      overOneProdut.count ++
    }else {
      payload.count = 1
      state.cartList.push(payload)
    }
  }
}