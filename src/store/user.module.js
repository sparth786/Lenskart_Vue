import axios from 'axios'

const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  useremail: '',
  userrole: ''
}

const actions = {
  login_user({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios({ url: 'http://localhost:3000/lenskart/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const userrole = resp.data.userrole
          localStorage.setItem('token', token)
          localStorage.setItem('userrole', userrole)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', {token, userrole})
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err.response.data)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('userrole')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  },
  registration_user({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios({ url: 'http://localhost:3000/lenskart/createUser', data: user, method: 'POST' })
        .then(resp => {
          const email = resp.data.email
          commit('regiteration_success', email)
          resolve(resp)
        })
        .catch(err => {
          commit('registration_error')
          reject(err)
        })
    })
  },
}

const mutations = {
  auth_success(state, logindata) {
    state.status = 'success'
    state.token = logindata.token
    state.userrole = logindata.userrole
  },
  auth_error(state) {
    state.status = 'error'
  },
  logout(state) {
    state.status = ''
    state.token = ''
  },
  regiteration_success(state,email){
    state.useremail=email,
    state.status = 'success'
  },
  registration_error(state){
    state.status='error'
  }
}
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
}
export const user = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}