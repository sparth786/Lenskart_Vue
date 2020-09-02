import axios from 'axios'
import jwt from 'jwt-simple'

const state={
    products:[],
    subcatwiseproduct:[],
    cartproducts:[],
    shortlistproducts:[],
    status:''
}

const actions={
    getProducts({commit},subcat){
        return new Promise((resolve, reject) => {
          axios({url: 'http://localhost:3000/lenskart/listproduct/'+subcat, method: 'GET' })
          .then(response => {
              var AllProducts=[];
              AllProducts=response.data;
            commit('getproductlist_success', AllProducts)
            resolve(response)
          })
          .catch(err => {
            commit('getproductlist_error')
            reject(err)
          })
        })
    },
    getSubcatwiseProduct({commit}){
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:3000/lenskart/listproductsucatwise', method: 'GET' })
        .then(response => {
          commit('getproductsubcatwise_success', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('getproductlist_error')
          reject(err)
        })
      })
  },
  getproducttocart({commit}){
      let gettoken=localStorage.getItem('token')
      if(gettoken){
        return new Promise((resolve, reject) => {
          axios({ url: 'http://localhost:3000/lenskart/getproductcart', data: {"accesstoken":gettoken}, method: 'PUT' })
            .then(resp => {
              commit('getproductcart_success',resp.data)
              resolve(resp)
            })
            .catch(err => {
              commit('getproductcart_error',[])
              reject(err.response.data)
            })
        })
      }
       else{
        return new Promise((resolve, reject) => {
          let products = [];
          if(localStorage.getItem('CarProduct')){
              products = JSON.parse(jwt.decode(localStorage.getItem('CarProduct'),'secret'));
          }
          commit('getproductcart_error',products)
          resolve()
        })
       }
  },
    addproducttocart({commit},products){
      if(products){
        products.qty=1
        let gettoken=localStorage.getItem('token')
        if(gettoken){
        return new Promise((resolve, reject) => {
          axios({ url: 'http://localhost:3000/lenskart/addtocart', data: {"cartproduct":products,"accesstoken":gettoken}, method: 'PUT' })
            .then(resp => {
              commit('addtocart_success',resp.data)
              resolve(resp)
            })
            .catch(err => {
              commit('cartsave_error',[])
              reject(err.response.data)
            })
        })
      }
      else{
        return new Promise((resolve, reject) => {
             let NewCart = [];
            if(localStorage.getItem('CarProduct')){
              NewCart = JSON.parse(jwt.decode(localStorage.getItem('CarProduct'),'secret'));
             }
             NewCart.push(products);  
             localStorage.setItem('CarProduct', jwt.encode(JSON.stringify(NewCart),'secret'));
          commit('cartsave_error',NewCart)
          resolve()
        })
       }
      }
    },
    removeproductfromcart({commit},products){
      if(products){
        let gettoken=localStorage.getItem('token')
        if(gettoken){
        return new Promise((resolve, reject) => {
          axios({ url: 'http://localhost:3000/lenskart/removecartproduct', data: {"cartproduct":products,"accesstoken":gettoken}, method: 'PUT' })
            .then(resp => {
              commit('removecartproduct_sucess',products)
              resolve(resp)
            })
            .catch(err => {
              commit('removecartproduct_error',[])
              reject(err.response.data)
            })
        })
      }
      else{
        return new Promise((resolve, reject) => {
          let storageProducts = JSON.parse(jwt.decode(localStorage.getItem('CarProduct'),'secret'));
          let newproducts = storageProducts.filter(product => product._id !== products._id );
          localStorage.setItem('CarProduct', jwt.encode(JSON.stringify(newproducts),'secret'));
          if(JSON.parse(jwt.decode(localStorage.getItem('CarProduct'),'secret')).length==0){
            localStorage.removeItem('CarProduct')
          }
          commit('removecartproduct_error',newproducts)
          resolve()
        })
       }
      }
    },
    addproducttoshortlist({commit},products){
      if(products){
        return new Promise((resolve, reject) => {
             let shortlistproduct = [];
            if(localStorage.getItem('ShortListProduct')){
              shortlistproduct = JSON.parse(jwt.decode(localStorage.getItem('ShortListProduct'),'secret'));
             }
            shortlistproduct.push(products);  
             localStorage.setItem('ShortListProduct', jwt.encode(JSON.stringify(shortlistproduct),'secret'));
          commit('shortlistsave_success',shortlistproduct)
          resolve()
        })
      }
    },
    updateproducttoshortlist({commit}){
        return new Promise((resolve, reject) => {
          let products = [];
          if(localStorage.getItem('ShortListProduct')){
              products = JSON.parse(jwt.decode(localStorage.getItem('ShortListProduct'),'secret'));
          }
          commit('getproductshortlist_success',products)
          resolve()
        })
  },
  removeproductfromshortlist({commit},products){
    if(products){
      return new Promise((resolve, reject) => {
        let storageProducts = JSON.parse(jwt.decode(localStorage.getItem('ShortListProduct'),'secret'));
        let newproducts = storageProducts.filter(product => product._id !== products._id );
        localStorage.setItem('ShortListProduct', jwt.encode(JSON.stringify(newproducts),'secret'));
        if(JSON.parse(jwt.decode(localStorage.getItem('ShortListProduct'),'secret')).length==0){
          localStorage.removeItem('ShortListProduct')
        }
        commit('removeshortlistproduct_success',newproducts)
        resolve()
      })
     }
  },
  removeallfromshortlist({commit}){
      return new Promise((resolve, reject) => {
        if(JSON.parse(jwt.decode(localStorage.getItem('ShortListProduct'),'secret')).length!=0){
          localStorage.removeItem('ShortListProduct')
        }
        commit('removeshortlistproduct_success',[])
        resolve()
      })
  },
}

const mutations={
    getproductlist_success(state, AllProducts){
        state.products=AllProducts
        state.status='success'
      },
      getproductlist_error(state){
        state.status = 'error'
      },
      getproductcart_success(state,cartproducts){
        state.cartproducts=cartproducts
      },
      getproductcart_error(state,cartproducts){
        state.cartproducts=cartproducts
        state.status = 'error'
      },
      addtocart_success(state,products){
         state.cartproducts=products
      },
      cartsave_error(state,cartproduct){
        state.cartproducts=cartproduct
       // state.status='error'
      },
      removecartproduct_sucess(state,products){
          state.cartproducts=state.cartproducts.filter(value=>value._id!==products._id)
      },
      removecartproduct_error(state,cartproduct){
        state.cartproducts=cartproduct
       // state.status='error'
      },
      getproductsubcatwise_success(state,Productsub){
        state.subcatwiseproduct=Productsub
        state.status='success'
      },
      shortlistsave_success(state,products){
        state.shortlistproducts=products
     },
     getproductshortlist_success(state,shortproducts){
      state.shortlistproducts=shortproducts
    },
    removeshortlistproduct_success(state,shortproducts){
      state.shortlistproducts=shortproducts
    },
}
const getters={
    productlist: state => state.products,
    cartproductlist:state=>state.cartproducts,
    totalcartproduct:state=>state.cartproducts.length,
    totalshortlistproduct:state=>state.shortlistproducts.length
}
export const products={
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}