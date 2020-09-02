<template>
  <div>
    <md-dialog :md-active.sync="addcartmodal" style="width:800px;text-align:center">
      <md-dialog-title>
        <span>SHOPPING CART({{totalcartproduct}})</span>
        <div style="float:right;">
          <md-button class="md-icon-button" @click="CloseCartModal()">
            <md-icon>close</md-icon>
          </md-button>
        </div>
      </md-dialog-title>
      <div>
        <md-divider></md-divider>
        <div v-if="totalcartproduct<=0" style="width:800px;text-align:center">
          <h1>Empty Cart</h1>
        </div>
        <div v-else>
          <md-table>
            <md-table-row>
              <md-table-head md-numeric>Sr No.</md-table-head>
              <md-table-head></md-table-head>
              <md-table-head>Product</md-table-head>
              <md-table-head>Qty</md-table-head>
              <md-table-head>Price</md-table-head>
              <md-table-head></md-table-head>
              <md-table-head></md-table-head>
            </md-table-row>

            <md-table-row v-for="(productcart,index) in totcartproduct" :key="index">
              <md-table-cell md-numeric>{{index+1}}</md-table-cell>
              <md-table-cell>
                <img
                  :src="'http://localhost:3000/Upload/'+productcart.image"
                  style="width:80px;height:80px"
                />
              </md-table-cell>
              <md-table-cell>{{productcart.ProductName}}</md-table-cell>
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
              <md-table-cell colspan="5" style="text-align:right">Cart Total:</md-table-cell>
              <md-table-cell>{{Total}}</md-table-cell>
              <md-table-cell></md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
      <md-divider></md-divider>
      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="CloseCartModal()">Close</md-button>
        <md-button
          class="md-raised md-primary"
          @click="CloseCartModal();checkout_product()"
        >Shop Now</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "AddCart",
  data() {
    return {
      addcartmodal: this.addtocartmodal,
      qty: 1
    };
  },
  props:{
      addtocartmodal:{type:Boolean,required:true}
  },
  methods: {
    ...mapActions("products", [
      "removeproductfromcart",
      "getproducttocart",
    ]),
    CloseCartModal(){
        this.addcartmodal=!this.addcartmodal
        this.$emit('clicked',this.addcartmodal)
    },
    removeItem(removeproduct) {
      this.removeproductfromcart(removeproduct);
    },
    checkout_product() {
      if (this.totalcartproduct > 0) {
        this.$router.push({ path: "/checkout" });
      }
    },
  },
  computed: {
    ...mapState({
      totcartproduct: state => state.products.cartproducts,
      ...mapGetters("products", ["totalcartproduct"])
    }),
    Total() {
      let total = 0;
      this.totcartproduct.forEach(item => {
        total += item.price * item.qty;
      });
      return total;
    }
  },
  created() {
    this.getproducttocart();
  }
};
</script>