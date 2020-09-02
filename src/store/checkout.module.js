import axios from 'axios'

const state={
    Checkoutdetail:[],
    status:''
}

const actions={
    save_checkout({ commit }, checkout) {
        return new Promise((resolve, reject) => {
          axios({ url: 'http://localhost:3000/lenskart/createcheckout', data: checkout, method: 'POST' })
            .then(resp => {
              commit('checkoutsave_success', resp.data)
              resolve(resp)
            })
            .catch(err => {
              commit('checkoutsave_error')
              reject(err.response.data)
            })
        })
      },
      save_orderdetail({ commit }, orderdetail) {
        return new Promise((resolve, reject) => {
          axios({ url: 'http://localhost:3000/lenskart/createorder', data: orderdetail, method: 'POST' })
            .then(resp => {
              commit('ordersave_success', resp.data)
              resolve(resp)
            })
            .catch(err => {
              commit('ordersave_error')
              reject(err.response.data)
            })
        })
      },
}

const mutations={
    checkoutsave_success(state, checkoutdetail){
        state.Checkoutdetail=checkoutdetail
        state.status='success'
      },
      checkoutsave_error(state){
        state.status = 'error'
      },
      ordersave_success(state,orderdetail){
        state.status='success'
      },
      ordersave_error(state){
        state.status='error'
      }
}
const getters={
    checkoutdetalis: state => state.Checkoutdetail,
}
export const checkoutdetail={
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}