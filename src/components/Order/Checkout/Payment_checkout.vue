<template>
    <div>
        <div ref="paypal"></div>
        <md-button class="md-raised md-primary" @click="setDone('third')">Done</md-button>
    </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers
} from "vuelidate/lib/validators";

import { mapState, mapActions, mapGetters } from "vuex";
import facebookLogin from "facebook-login-vuejs";
export default {
  name: "StepperLinear",
  mixins: [validationMixin],
  components: {
    facebookLogin
  },
  props:{
     logging:{type:Boolean,required:true}
  },
  data: () => ({
    paidFor: false,
    third: false,
    name: "",
    personalID: "",
    FB: undefined,
    mobileno: "",
    emailid: "",
    loggingcheck: this.logging,
  }),
  computed: {
    ...mapState({
      totcartproduct: state => state.products.cartproducts,
      userdetail:state=>state.checkoutdetail.Checkoutdetail
    }),
    Total() {
      let total = 0;
      this.totcartproduct.forEach(item => {
        total += item.price * item.qty;
      });
      return total;
    }
  },
  created(){
    this.createScript()
  },
  methods: {
    ...mapActions("checkoutdetail", ["save_orderdetail"]),

    createScript: function() {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=ASDIIQjpHVJ5lQu-F8vL9_VE7jDJCYFmzSyll3l7vA3_4y3NNUWTGYZCsVBxynR4Is_mNmuRfL7oYltZ";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    },
    setLoaded: function() {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: this.Total
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            if (order.status == "COMPLETED") {
              const orderbody = {
                order: {
                  islogging: this.logging,
                  email: this.userdetail.email,
                  mobileno: this.userdetail.mobileno,
                  tot_price: this.Total,
                  paypal_orderid: order.id,
                  payer: order.payer,
                  paypal_status: order.status,
                  purchase_units: order.purchase_units
                },
                orderdetail: this.totcartproduct
              };
              console.log("orderbody==", orderbody);
              this.save_orderdetail(orderbody)
                .then(data => {
                  alert("Order Complete");
                  this.$store.commit("reset");
                  this.$router.push({
                    name: "Thankyou",
                    params: { fblogin: this.personalID }
                  });
                })
                .catch(error => {
                  alert("order error occured");
                });
            }
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    },
    
    setDone(id, index) {
      this.$emit('clicked',id,index)
    },
  }
};
</script>

<style lang="" scoped>

</style>
