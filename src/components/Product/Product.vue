<template>
  <div class="center">
    <div class="results" style="text-align:left">
      <div style="background:#ededed;height:45px;margin-top:5px">
        <div style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
          <h1
            class="subcat-info"
          >{{this.$route.params.subcat}}</h1>
        </div>
      </div>
      <div style="margin-top:10px">
        <md-card
          v-for="i in products.length"
          :key="i"
          style="align-content:center"
          v-if="i-1<currentpage*3 && i-1>=currentpage*3-3"
         >
          <md-card-media-cover md-solid>
            <md-card-media md-ratio="4:3">
              <img
                :src="'http://localhost:3000/Upload/'+products[i-1].image"
                class="image"
                @click="display_product(products[i-1])"
              />
            </md-card-media>
            <md-card-area>
              <md-card-header style="padding:8px;margin-bottom:0px;margin-left:5px">
                <div>
                  <span>
                    <span class="md-title">{{products[i-1].ProductName}}</span>
                    <br />
                    <span class="md-subhead">${{products[i-1].price}}</span>
                  </span>
                  <span style="float:right;margin-top:-15px">
                    <md-button class="md-icon-button" @click="addtocart(products[i-1])">
                      <md-icon>shopping_cart</md-icon>
                      <md-tooltip md-direction="bottom">Add to Cart</md-tooltip>
                    </md-button>
                    <md-button class="md-icon-button" @click="addtoshortlist(products[i-1])">
                      <md-icon>favorite</md-icon>
                      <md-tooltip md-direction="bottom">Add to Shortlist</md-tooltip>
                    </md-button>
                  </span>
                </div>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>
    </div>
    <div style="text-align:center">
      <Paginate
        :pageCount="products.length/3"
        :containerClass="'pagination'"
        :page-range="2"
        :margin-pages="1"
        :clickHandler="clickCallback"
      ></Paginate>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Paginate from "vuejs-paginate";

export default {
  name: "results",
  components: {
    Paginate: Paginate
  },
  methods: {
    clickCallback: function(page) {
      this.currentpage = page;
    },
    ...mapActions("products", [
      "getProducts",
      "addproducttocart",
      "addproducttoshortlist"
    ]),
    addtocart: function(cartproduct) {
      this.addproducttocart(cartproduct);
    },
    addtoshortlist: function(shortlistproduct) {
      this.addproducttoshortlist(shortlistproduct);
    },
    display_product(selectproduct) {
      this.$router.push({
        name: "Product_display",
        params: { selectproduct: selectproduct }
      });
    }
  },
  watch: {
    "$route.params.subcat": function(subcat) {
      this.getProducts(subcat);
    }
  },
  computed: {
    ...mapState({
      products: state => state.products.products,
      cartproductlist: state => state.products.cartproducts
    })
  },
  created() {
    this.getProducts(this.$route.params.subcat);
  },
  data() {
    return {
      currentpage: 1
    };
  }
};
</script>
<style scoped lang="">
.md-card {
  width: 25vw;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.image {
  width: 20vw;
  height: 20vw;
  margin-left: 40px;
}
.md-card-media.md-ratio-4-3 {
  align-content: center;
}
ul.pagination {
  font-size: 2.5rem;
}
.subcat-info{
  font-size: 14px;
  font-family: futurastd-medium,sans-serif;color: #6d6e71;
  line-height: 30px;
  text-align: left;
  margin-left:20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>