import Vue from 'vue';
import Vuex from 'vuex';

import { user } from './user.module';
import {maincategory} from './maincategory.module';
import {subcategory} from './subcategory.module';
import {products} from'./product.module'
import {checkoutdetail} from './checkout.module'

Vue.use(Vuex);

let initialState = {
    // user: {...user.state},
    // maincategory: {...maincategory.state},
    // subcategory: {...subcategory.state},
    products:{...products.state},
    checkoutdetail:{...checkoutdetail.state}
  }
export default new Vuex.Store({
    modules: {
        user,
        maincategory,
        subcategory,
        products,
        checkoutdetail
    },
    mutations: {
        reset (state) {
          Object.keys(state).forEach(key => {
            Object.assign(state[key], initialState[key])
          })
          localStorage.removeItem('CarProduct')
        }
      }
});