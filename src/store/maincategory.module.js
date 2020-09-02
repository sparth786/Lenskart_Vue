import axios from 'axios'

const state={
    maincatnm:[],
    status:''
}

const actions={
    getmaincatnm({commit}){
        return new Promise((resolve, reject) => {
          axios({url: 'http://localhost:3000/lenskart/listmaincategory', method: 'GET' })
          .then(response => {
            var MainCategory=[];
            MainCategory = response.data.map(value => {
                return value.MainCategoryname;
              });
            commit('getmaincategory_success', MainCategory)
            resolve(response)
          })
          .catch(err => {
            commit('getmaincategory_error')
            reject(err)
          })
        })
    }
}

const mutations={
    getmaincategory_success(state, MainCategory){
        state.maincatnm=MainCategory
        state.status='success'
      },
      getmaincategory_error(state){
        state.status = 'error'
      },
}
const getters={
    maincatname: state => state.maincatnm
}
export const maincategory={
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}