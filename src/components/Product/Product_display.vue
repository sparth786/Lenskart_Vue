<template>
  <div style="margin-top:20px;height:800px">
    <div>
      <div style="background:#ededed;height:45px;margin-top:5px">
        <div style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
          <h1 class="product_info">{{selectproduct.ProductName}}</h1>
        </div>
      </div>
    </div>
    <div>
      <div style="margin-left:100px;float:left;width:800px;height:500px">
        <image-magnifier
          :src="'http://localhost:3000/Upload/'+selectproduct.image"
          :zoom-src="'http://localhost:3000/Upload/'+selectproduct.image"
          width="800"
          height="500"
          zoom-width="600"
          zoom-height="400"
        ></image-magnifier>
      </div>
      <div class="product_wrapper">
        <h3 class="product-info-title">{{selectproduct.ProductName}}</h3>
        <p class="product-subtitle">{{selectproduct.description}}</p>
        <p class="product_price">
          Price:
          <span style="font-size: 2.0rem;">${{selectproduct.price}}</span>
        </p>
        <div style="text-align:center;margin-top:50px">
          <md-button
            class="md-raised"
            style="width:320px;background-color:#0da9c4;color:white"
            @click="addtocart(selectproduct)"
          >Add To Cart</md-button>
          <br />
          <md-button
            class="md-raised"
            style="width:320px;background-color:#0da9c4;color:white"
            @click="continue_shopping()"
          >Continue Shopping</md-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["selectproduct"],
  data() {
    return {};
  },
  methods: {
    ...mapActions("products", ["getProducts", "addproducttocart"]),
    addtocart: function(cartproduct) {
      this.addproducttocart(cartproduct);
    },
    continue_shopping() {
      this.$router.replace({ path: "/" });
    }
  }
};
</script>
<style scoped>
.product-info-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 8px;
}
.product-subtitle {
  color: #8f8f8f;
  margin-bottom: 8px;
  font-size: 1.5rem;
}
.product_info {
  font-size: 14px;
  font-family: futurastd-medium, sans-serif;
  color: #6d6e71;
  line-height: 30px;
  text-align: left;
  margin-left: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.product_wrapper {
  margin-right: 80px;
  width: 500px;
  height: 400px;
  float: right;
  margin-top: 100px;
  padding-left: 60px;
}
.product_price {
  padding-top: 10px;
  padding-right: 10px;
  font-size: 1.8rem;
  font-weight: bold;
}
</style>