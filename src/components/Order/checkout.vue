<template>
  <div style="height:800px">
    <div style="width:1000px;margin-top:10px;float:left">
      <md-steppers :md-active-step.sync="active" md-linear>
        <md-step id="first" md-label="Mobile" md-description="Optional" :md-done.sync="first">
          <div style="height:500px;width:1000px">
            <div style="width:450px;padding:30px;float:left;border-right: 1px dashed #d3d3d3;">
              <form novalidate class="form" @submit.prevent="validateLogin">
                <h5 v-if="checkoutlogin=='guest'">MOBILE</h5>
                <h5 v-else>Enter Mobile Number / UserName</h5>
                <md-field
                  :class="getValidationloginguestClass('mobileno')"
                  v-if="checkoutlogin=='guest'"
                >
                  <md-input
                    placeholder="Please enter mobile number"
                    v-model="form3.mobileno"
                    :disabled="sending3"
                  />
                  <span
                    class="md-error"
                    v-if="!$v.form3.mobileno.required"
                  >Please enter a valid Mobile Number.</span>
                  <span
                    class="md-error"
                    v-else-if="!$v.form3.mobileno.alpha"
                  >Please enter a valid Mobile Number.</span>
                  <br />
                </md-field>
                <md-field :class="getValidationloginClass('logininput')" v-else>
                  <md-input
                    placeholder="Mobile / Email Address"
                    v-model="form1.logininput"
                    :disabled="sending1"
                  />
                  <span
                    class="md-error"
                    v-if="!$v.form1.logininput.required"
                  >Please enter a valid Email or Mobile Number.</span>
                  <span
                    class="md-error"
                    v-else-if="!$v.form1.logininput.alpha || !$v.form1.logininput.email"
                  >Please enter a valid Email or Mobile Number.</span>
                  <br />
                </md-field>
                <md-field
                  :class="getValidationloginClass('password')"
                  v-if="checkoutlogin!='guest'"
                >
                  <label>Password</label>
                  <md-input
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="password"
                    v-model="form1.password"
                    :disabled="sending1"
                  />
                  <span class="md-error" v-if="!$v.form1.password.required">The password is required</span>
                </md-field>
                <md-radio value="guest" class="md-primary" v-model="checkoutlogin">
                  <b>Checkout as guest</b>
                </md-radio>
                <br />
                <md-radio value="userlogin" class="md-primary" v-model="checkoutlogin">
                  <b>I Have an account (Login to checkout faster)</b>
                </md-radio>
                <div style="margin-top:50px">
                  <md-button class="md-raised md-accent" type="submit" :disabled="sending1">Proceed</md-button>
                </div>
              </form>
            </div>
            <div style="width:450px;padding:15px;margin-top:50px;float:right">
              <div style="width:213px;text-align:center">
                <h3>For faster checkout sign in with</h3>
                <facebook-login
                  class="button"
                  appId="232343078174722"
                  @login="onLogin"
                  @logout="onLogout"
                  @sdk-loaded="sdkLoaded"
                ></facebook-login>
                <p>(We'll never post to facebook without your permission)</p>
              </div>
            </div>
          </div>
        </md-step>

        <md-step
          id="second"
          md-label="Shopping Address"
          :md-error="secondStepError"
          :md-done.sync="second"
        >
          <div>
            <form novalidate class="md-layout" @submit.prevent="validateAddress">
              <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                  <div class="md-title">Shipping Address</div>
                </md-card-header>

                <md-card-content>
                  <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationAddressClass('firstName')">
                        <label for="first-name">First Name</label>
                        <md-input
                          name="first-name"
                          id="first-name"
                          autocomplete="given-name"
                          v-model="form2.firstName"
                          :disabled="sending2"
                        />
                        <span
                          class="md-error"
                          v-if="!$v.form2.firstName.required"
                        >The first name is required</span>
                        <span
                          class="md-error"
                          v-else-if="!$v.form2.firstName.minlength"
                        >Invalid first name</span>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationAddressClass('lastName')">
                        <label for="last-name">Last Name</label>
                        <md-input
                          name="last-name"
                          id="last-name"
                          autocomplete="family-name"
                          v-model="form2.lastName"
                          :disabled="sending2"
                        />
                        <span
                          class="md-error"
                          v-if="!$v.form2.lastName.required"
                        >The last name is required</span>
                        <span
                          class="md-error"
                          v-else-if="!$v.form2.lastName.minlength"
                        >Invalid last name</span>
                      </md-field>
                    </div>
                  </div>
                  <md-field :class="getValidationAddressClass('email')">
                    <label>Email</label>
                    <md-input
                      type="email"
                      name="email"
                      id="email"
                      autocomplete="email"
                      v-model="form2.email"
                      :disabled="sending2"
                    />
                    <span class="md-error" v-if="!$v.form2.email.required">The email is required</span>
                    <span class="md-error" v-else-if="!$v.form2.email.email">Invalid email</span>
                  </md-field>
                  <md-field :class="getValidationAddressClass('address')">
                    <label>Address</label>
                    <md-input
                      type="address"
                      name="address"
                      id="address"
                      autocomplete="address"
                      v-model="form2.address"
                      :disabled="sending2"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form2.address.required"
                    >The Shipping Address is required</span>
                    <span class="md-error" v-else-if="!$v.form2.address.minlength">Invalid Address</span>
                  </md-field>
                  <md-field>
                    <label for="state">State</label>
                    <md-select
                      name="state"
                      id="state"
                      v-model="stateselected"
                      @click="getStateData()"
                    >
                      <md-option v-for="state in statelist" :key="state" :value="state">{{state}}</md-option>
                    </md-select>
                  </md-field>
                  <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                      <md-field>
                        <label for="city">City</label>
                        <md-select
                          name="city"
                          id="city"
                          v-model="cityselected"
                          @click="getCityData()"
                        >
                          <md-option v-for="city in citylist" :key="city" :value="city">{{city}}</md-option>
                        </md-select>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationAddressClass('pincode')">
                        <label for="pin-code">Pin Code</label>
                        <md-input
                          name="pin-code"
                          id="pin-code"
                          v-model="form2.pincode"
                          :disabled="sending2"
                        />
                        <span
                          class="md-error"
                          v-if="!$v.form2.pincode.required"
                        >The Pincode is required</span>
                      </md-field>
                    </div>
                  </div>
                </md-card-content>
                <md-snackbar>The user was saved with success!</md-snackbar>
                <md-button class="md-raised md-primary" type="submit" :disabled="sending2">Continue</md-button>
              </md-card>
            </form>
          </div>
        </md-step>

        <md-step id="third" md-label="Payment & Discount" :md-done.sync="third">
          <div ref="paypal"></div>
          <md-button class="md-raised md-primary" @click="setDone('third')">Done</md-button>
        </md-step>
      </md-steppers>
    </div>
    <div
      style="width:550px;height:450px;border:1px solid #ccc;float:right;margin-top:10px;background-color:white"
      >
      <div style="background-color: #4b4c51;height:40px;padding: 10px 10px;">
        <span style="float: left;color: #fff;letter-spacing: 1px;">SHOPPING CART</span>
        <span style="float: right;color: #fff;letter-spacing: 1px;">ITEM ({{totalcartproduct}})</span>
      </div>
      <div style="text-align: center" v-if="totalcartproduct==0">
        <span class="noitemcart">Your shopping cart is empty</span>
        <span>Shop for products and add items to the cart</span>
        <div class="cart-footer">
          <a
            href="#"
            style="background: rgb(50, 156, 146); letter-spacing: 2px;display:block;padding:8px 0;color:#fff;text-decoration:none;margin:13px auto;cusor:pointer"
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
  data: () => ({
    paidFor: false,
    active: "first",
    first: false,
    second: false,
    third: false,
    secondStepError: null,
    checkoutlogin: "guest",
    isConnected: false,
    name: "",
    personalID: "",
    FB: undefined,
    form1: {
      logininput: "",
      password: ""
    },
    mobileno: "",
    emailid: "",
    logging: false,
    sending1: false,
    form2: {
      firstName: null,
      lastName: null,
      email: null,
      address: null,
      pincode: null
    },
    form3: {
      mobileno: ""
    },
    sending3: false,
    shoppingaddSaved: false,
    sending2: false,
    statelist: [],
    stateselected: "",
    citylist: [],
    cityselected: ""
  }),
  validations: {
    form1: {
      logininput: {
        required,
        alpha: helpers.regex("logininput", /^\d{10,10}$/),
        email
      },
      password: {
        required
      }
    },
    form2: {
      firstName: {
        required,
        minLength: minLength(4)
      },
      lastName: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      pincode: {
        required
      },
      address: {
        required,
        minLength: minLength(5)
      }
    },
    form3: {
      mobileno: {
        required,
        alpha: helpers.regex("mobileno", /^\d{10,10}$/)
      }
    }
  },
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
  methods: {
    ...mapActions("user", ["login_user"]),
    ...mapActions("checkoutdetail", ["save_checkout", "save_orderdetail"]),
    ...mapActions("products", ["removeproductfromcart"]),
    removeItem(removeproduct) {
      this.removeproductfromcart(removeproduct);
    },
    getValidationloginClass(fieldName) {
      const field = this.$v.form1[fieldName];
      if (field) {
        if (
          field.required == false ||
          (field.required == true &&
            field.email == false &&
            field.alpha == false)
        ) {
          return {
            "md-invalid": field.$invalid && field.$dirty
          };
        } else if (field.alpha == undefined) {
          return {
            "md-invalid": field.$invalid && field.$dirty
          };
        }
      }
    },
    clearForm1() {
      this.$v.$reset();
      (this.form1.logininput = null), (this.form1.password = null);
    },
    validateLogin() {
      this.$v.$touch();
      if (this.form3.mobileno != "") {
        if (!this.$v.form3.$invalid) {
          this.mobileno = this.form3.mobileno;
          this.nextPageGuest();
        }
      } else if (
        !this.$v.form1.password.$invalid &&
        this.$v.form1.logininput.required &&
        (this.$v.form1.logininput.email || this.$v.form1.logininput.alpha)
      ) {
        if (this.$v.form1.logininput.email) {
          this.emailid = this.form1.logininput;
          this.form2.email = this.form1.logininput;
          this.mobileno = "";
        } else if (this.$v.form1.logininput.alpha) {
          this.mobileno = this.form1.logininput;
          this.emailid = "";
        }
        this.loginUser();
      }
    },
    loginUser() {
      this.sending1 = true;
      let loginData = {
        password: this.form1.password,
        email: this.emailid,
        mobileno: this.mobileno
      };
      this.login_user(loginData)
        .then(data => {
          this.logging = true;
          this.sending1 = false;
          //   this.clearForm1();
          this.setDone("first", "second");
        })
        .catch(error => {
          this.logging = true;
          this.sending1 = false;
          this.clearForm1();
          alert(error);
        });
    },
    nextPageGuest() {
      this.sending3 = false;
      this.logging = false;
      this.setDone("first", "second");
    },
    getValidationloginguestClass(fieldName) {
      const field = this.$v.form3[fieldName];
      if (field) {
        //  if (field.required == true && field.alpha == false)
        // {
        if (field) {
          return {
            "md-invalid": field.$invalid && field.$dirty
          };
        }
        // else if (field.alpha == undefined) {
        //   return {
        //     "md-invalid": field.$invalid && field.$dirty
        //   };
        // }
      }
    },
    getValidationAddressClass(fieldName) {
      const field = this.$v.form2[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm2() {
      this.$v.$reset();
      (this.form2.firstName = null),
        (this.form2.lastName = null),
        (this.form2.email = null),
        (this.form2.pincode = null),
        (this.form2.address = null);
    },
    validateAddress() {
      this.$v.$touch();
      if (!this.$v.form2.$invalid) {
        this.saveShoppingAddress();
      }
    },
    saveShoppingAddress() {
      this.sending2 = true;
      const newcheckoutdetail = {
        ...this.form2,
        state: this.stateselected,
        city: this.cityselected,
        islogging: this.logging,
        mobileno: this.mobileno
      };
      this.save_checkout(newcheckoutdetail)
        .then(data => {
          this.shoppingaddSaved = true;
          this.sending2 = false;
          //   this.clearForm2();
          this.cityselected = "";
          this.stateselected = "";
          this.setDone("second", "third");
          this.createScript();
        })
        .catch(error => {
          this.shoppingaddSaved = true;
          this.sending2 = false;
          this.clearForm2();
          alert(error);
        });
    },
    createScript: function() {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=ASDIIQjpHVJ5lQu-F8vL9_VE7jDJCYFmzSyll3l7vA3_4y3NNUWTGYZCsVBxynR4Is_mNmuRfL7oYltZ";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    },
    setLoaded: function() {
      //this.loaded = true;
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
                  email: this.form2.email,
                  mobileno: this.mobileno,
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
                  //  this.$router.push("/thankyou")
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
    getStateData: function() {
      axios
        .get(`https://indian-cities-api-nocbegfhqg.now.sh/cities`)
        .then(data => {
          var statedata = [];
          statedata = data.data.map(value => {
            return value.State;
          });
          this.statelist = [...new Set(statedata)];
        })
        .catch(e => {
          alert("InValid state");
        });
    },
    getCityData: function() {
      axios
        .get(
          `https://indian-cities-api-nocbegfhqg.now.sh/cities?State_like=` +
            this.stateselected
        )
        .then(data => {
          var citydata = [];
          citydata = data.data.map(value => {
            return value.City;
          });
          this.citylist = [...new Set(citydata)];
        })
        .catch(e => {
          alert("InValid city");
        });
    },
    setDone(id, index) {
      this[id] = true;

      this.secondStepError = null;

      if (index) {
        this.active = index;
      }
    },
    setError() {
      this.secondStepError = "This is an error!";
    },
    getUserData() {
      this.FB.api(
        "/me",
        "GET",
        { fields: "id,name,email" },
        userInformation => {
          console.warn("getData From FB:", userInformation);
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.name = userInformation.name;
          this.form2.email = userInformation.email;
          this.setDone("first", "second");
        }
      );
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    },
    onLogout() {
      this.isConnected = false;
    }
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
