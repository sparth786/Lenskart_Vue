<template>
    <div class="paymentcart">
      <div style="background-color: #4b4c51;height:40px;padding: 10px 10px;">
        <span style="float: left;color: #fff;letter-spacing: 1px;">SHOPPING CART</span>
        <span style="float: right;color: #fff;letter-spacing: 1px;">ITEM ({{totalcartproduct}})</span>
      </div>
      <div style="text-align: center" v-if="totalcartproduct==0">
        <span class="noitemcart">Your shopping cart is empty</span>
        <span>Shop for products and add items to the cart</span>
        <div class="cart-footer">
          <a
            href="#" style="color:#fff;" class="continueshopping_wrapper"
          >CONTINUE SHOPPING</a>
        </div>
      </div>
      <div style="text-align: center" v-else>
        <md-table style="width:498px">
          <md-table-row>
            <md-table-head>product</md-table-head>
            <md-table-head>Qty</md-table-head>
            <md-table-head>Price</md-table-head>
            <md-table-head>Total</md-table-head>
            <md-table-head></md-table-head>
          </md-table-row>

          <md-table-row v-for="(productcart,i) in totcartproduct" :key="i">
            <md-table-cell>
              <img
                :src="'http://localhost:3000/Upload/'+productcart.image"
                style="width:100px;height:100px"
              />
            </md-table-cell>
            <md-table-cell>
              <md-field>
                <md-input style="width:40px" v-model="productcart.qty" type="Number" />
              </md-field>
            </md-table-cell>
            <md-table-cell>{{productcart.price}}</md-table-cell>
            <md-table-cell>{{productcart.price*productcart.qty}}</md-table-cell>
            <md-table-cell>
              <md-button class="md-icon-button" @click="removeItem(productcart)">
                <md-icon>delete</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-cell colspan="3" style="text-align:right">Cart Total:</md-table-cell>
            <md-table-cell>{{Total}}</md-table-cell>
            <md-table-cell></md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    name:'CheckoutCart',
    computed: {
    ...mapState({
      totcartproduct: state => state.products.cartproducts
    }),
    ...mapGetters("products", ["totalcartproduct"]),
    Total() {
      let total = 0;
      this.totcartproduct.forEach(item => {
        total += item.price * item.qty;
      });
      return total;
    }
  },
  methods:{
      ...mapActions("products", ["removeproductfromcart"]),
    removeItem(removeproduct) {
      this.removeproductfromcart(removeproduct);
    },
  }
}
</script>
<style>
    .paymentcart{
        width:550px;
        height:450px;
        border:1px solid #ccc;float:right;
        margin-top:10px;
        background-color:white;
        font-size:14px
    }
    .continueshopping_wrapper{
        background: rgb(50, 156, 146); 
        letter-spacing: 2px;
        display:block;
        padding:8px 0;
        color:#fff;
        text-decoration:none;
        margin:13px auto;
        cursor:pointer
    }
</style>