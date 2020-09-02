<template>
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
                <span class="md-error" v-else-if="!$v.form2.firstName.minlength">Invalid first name</span>
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
                <span class="md-error" v-if="!$v.form2.lastName.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form2.lastName.minlength">Invalid last name</span>
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
            <md-select name="state" id="state" v-model="stateselected" @click="getStateData()">
              <md-option v-for="state in statelist" :key="state" :value="state">{{state}}</md-option>
            </md-select>
          </md-field>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="city">City</label>
                <md-select name="city" id="city" v-model="cityselected" @click="getCityData()">
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
                <span class="md-error" v-if="!$v.form2.pincode.required">The Pincode is required</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-snackbar>The user was saved with success!</md-snackbar>
        <md-button class="md-raised md-primary" type="submit" :disabled="sending2">Continue</md-button>
      </md-card>
    </form>
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

export default {
  name: "ShippingAddress",
  mixins: [validationMixin],
  props:{
      mobilenum:{type:String,required:true},
      logginged:{type:Boolean,required:true},
      saveemail:{type:String,required:true}
  },
  data: () => ({
    mobileno: this.mobilenum,
    emailid: "",
    logging: false,
    form2: {
      firstName: null,
      lastName: null,
      email: null,
      address: null,
      pincode: null
    },
    shoppingaddSaved: false,
    sending2: false,
    statelist: [],
    stateselected: "",
    citylist: [],
    cityselected: ""
  }),
  validations: {
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
  },
  methods: {
    ...mapActions("checkoutdetail", ["save_checkout"]),
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
      this.mobilenum!=""?this.mobileno=this.mobilenum:""
      this.sending2 = true;
      const newcheckoutdetail = {
        ...this.form2,
        state: this.stateselected,
        city: this.cityselected,
        islogging: this.logginged,
        mobileno: this.mobileno
      };
      this.save_checkout(newcheckoutdetail)
        .then(data => {
          this.shoppingaddSaved = true;
          this.sending2 = false;
          this.cityselected = "";
          this.stateselected = "";
          this.setDone("second", "third");
        })
        .catch(error => {
          this.shoppingaddSaved = true;
          this.sending2 = false;
          this.clearForm2();
          alert(error);
        });
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
      this.$emit('clicked',id,index)
    },
  }
};
</script>