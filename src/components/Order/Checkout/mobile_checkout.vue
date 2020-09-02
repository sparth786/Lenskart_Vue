<template>
  <div style="height:500px;width:1000px">
    <div style="width:450px;padding:30px;float:left;border-right: 1px dashed #d3d3d3;font-size:14px">
      <form novalidate class="form" @submit.prevent="validateLogin">
        <h5 v-if="checkoutlogin=='guest'">MOBILE</h5>
        <h5 v-else>Enter Mobile Number / UserName</h5>
        <md-field :class="getValidationloginguestClass('mobileno')" v-if="checkoutlogin=='guest'">
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
        <md-field :class="getValidationloginClass('password')" v-if="checkoutlogin!='guest'">
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
    <div style="width:450px;padding:15px;margin-top:50px;float:right;font-size:12px">
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
    form2:{
        email:""
    },
    mobileno: "",
    emailid: "",
    logging: false,
    sending1: false,
    form3: {
      mobileno: ""
    },
    sending3: false,
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
    form3: {
      mobileno: {
        required,
        alpha: helpers.regex("mobileno", /^\d{10,10}$/)
      }
    }
  },
  methods: {
    ...mapActions("user", ["login_user"]),

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
          return {
            "md-invalid": field.$invalid && field.$dirty
          };
        }
    },
    setDone(id, index) {
      this.$emit('clicked',id,index,this.form2.email,this.mobileno,this.logging)
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

