<template>
  <div style="height:800px">
    <div style="width:1000px;margin-top:10px;float:left">
      <md-steppers :md-active-step.sync="active" md-linear>
        <md-step id="first" md-label="Mobile" md-description="Optional" :md-done.sync="first">
          <MobileCheckout @clicked="onClickMobileCheckout"/>
        </md-step>

        <md-step
          id="second"
          md-label="Shopping Address"
          :md-error="secondStepError"
          :md-done.sync="second"
        >
        <ShippingAddress :mobilenum="mobilno" :saveemail="form2.email" @clicked="onClickShippingAdd" :logginged="loginuser"/>
        </md-step>

        <md-step id="third" md-label="Payment & Discount" :md-done.sync="third">
          <PaymentCheckout :logging="loginuser" @clicked="childpayment"/>
        </md-step>
      </md-steppers>
    </div>
    <CheckoutCart/>
  </div>
</template>

<script>
import axios from "axios";
import MobileCheckout from './Order/Checkout/mobile_checkout.vue'
import ShippingAddress from './Order/Checkout/ShippingAddress.vue'
import PaymentCheckout from './Order/Checkout/Payment_checkout.vue'
import CheckoutCart from './Order/Checkout_cart.vue'

export default {
  name: "StepperLinear",
  components:{
    MobileCheckout,
    ShippingAddress,
    PaymentCheckout,
    CheckoutCart
  },
  data: () => ({
     active: "first",
     first: false,
     second: false,
     third: false,
     secondStepError: null,
     mobilno:"",
     loginuser:false,
        form2:{
          email:""
        },
  }),
  
  methods: {
    onClickMobileCheckout(id,index,emailadd,mobileno,logging){
      emailadd!=""?this.form2.email=emailadd:""
      mobileno!=""?this.mobilno=mobileno:""
      this.loginuser=logging
      this.setDone(id,index)
    },
    onClickShippingAdd(id,index){
      this.setDone(id,index)
    },
    childpayment(id,index){
      this.setDone(id,index)
    },
    setDone(id, index) {
      this[id] = true;

      this.secondStepError = null;

      if (index) {
        this.active = index;
      }
    },
    
  }

};
</script>

<style lang="" scoped>
.facebookbtn {
  background-image: url("~@/assets/facebookbutton.jpg");
  width: 213px;
  height: 40px;
}
.noitemcart {
  font-size: 16px;
  text-transform: uppercase;
  color: rgb(240, 67, 67);
  margin-bottom: 0px;
  margin-top: 100px;
  display: block;
  text-align: center;
}
.cart-footer {
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  overflow: hidden;
  display: block;
  width: 350px;
  margin-left: 80px;
}
.md-content.md-table-content.md-scrollbar.md-theme-default {
  width: 498px;
}
.md-content {
  padding: 0px;
}
.md-field {
  margin: 4px 0px 8px;
}
</style>
