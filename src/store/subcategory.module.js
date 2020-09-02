import axios from 'axios'

const state={
    subcatnm:[],
    Allsubcat:[],
    status:''
}

const actions={
    getsubcatnm({commit},maincat){
        return new Promise((resolve, reject) => {
          axios({url: 'http://localhost:3000/lenskart/listsubcategory/'+maincat, method: 'GET' })
          .then(response => {
            var SubCategory=[];
            SubCategory = response.data.map(value => {
                return value.SubCategoryname;
              });
            commit('getsubcategory_success', SubCategory)
            resolve(response)
          })
          .catch(err => {
            commit('getsubcategory_error')
            reject(err)
          })
        })
    },
    getAllsubcatnm({commit}){
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:3000/lenskart/listallsubcategory', method: 'GET' })
        .then(response => {
          var AllSubCategory=[];
          AllSubCategory = response.data.map(value => {
              return value.SubCategoryname;
            });
          commit('getAllsubcategory_success', AllSubCategory)
          resolve(response)
        })
        .catch(err => {
          commit('getsubcategory_error')
          reject(err)
        })
      })
    }
}

const mutations={
    getsubcategory_success(state, SubCategory){
        state.subcatnm=SubCategory
        state.status='success'
      },
      getsubcategory_error(state){
        state.status = 'error'
      },
      getAllsubcategory_success(state, AllSubCategory){
        state.Allsubcat=AllSubCategory
        state.status='success'
      }
}
const getters={
    subcatname: state => state.subcatnm,
    Allsubcatnm:state=>state.Allsubcat
}
export const subcategory={
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}