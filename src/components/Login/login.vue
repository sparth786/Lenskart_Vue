<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <div class="md-title">
          <h2>Login</h2>
        </div>
      </div>
      <div class="titlebar"></div>
      <form novalidate class="form" @submit.prevent="validateUser">
        <md-field :class="getValidationClass('logininput')">
          <label>Mobile/Email</label>
          <md-input
            name="login-name"
            id="login-name"
            autocomplete="given-name"
            v-model="form.logininput"
            :disabled="sending"
          ></md-input>
          <span
            class="md-error"
            v-if="!$v.form.logininput.required"
          >Please enter a valid Email or Mobile Number.</span>
          <span
            class="md-error"
            v-else-if="!$v.form.logininput.alpha || !$v.form.logininput.email"
          >Please enter a valid Email or Mobile Number.</span>
        </md-field>
        <md-field :class="getValidationClass('password')">
          <label>Password</label>
          <md-input
            type="password"
            name="password"
            id="password"
            autocomplete="password"
            v-model="form.password"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
        </md-field>
        <div class="actions md-layout" styl>
          <md-button type="submit" :disabled="sending" class="md-raised md-primary">Log in</md-button>
        </div>
        <md-snackbar :md-active.sync="logging"></md-snackbar>
      </form>
      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>
    </md-content>
    <div class="background" />
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers
} from "vuelidate/lib/validators";
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  mixins: [validationMixin],
  data: () => ({
    loading: false,
    form: {
      logininput: "",
      password: ""
    },
    logging: false,
    sending: false,
    mobileno: "",
    emailid: ""
  }),
  validations: {
    form: {
      logininput: {
        required,
        alpha: helpers.regex("logininput", /^\d{10,10}$/),
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    ...mapActions("user", ["login_user"]),
    ...mapActions("products", ["getproducttocart"]),
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        if (
          field.required == false ||
          (field.required == true &&
            field.email == false && field.alpha == false)
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
    clearForm() {
      this.$v.$reset();
      (this.form.logininput = null), (this.form.password = null);
    },
    loginUser() {
      this.sending = true;
      let loginData = {
        password: this.form.password,
        email: this.email,
        mobileno: this.mobileno
      };
      this.login_user(loginData).then(() => {
        this.logging = true;
        this.sending = false;
        this.clearForm();
        this.getproducttocart();
        this.$router.push("/");
      }).catch((error)=>{
        alert(error)
      })
    },
    validateUser() {
      this.$v.$touch();
      if (
        !this.$v.form.password.$invalid &&
        this.$v.form.logininput.required &&
        (this.$v.form.logininput.email || this.$v.form.logininput.alpha)
      ) {
        if (this.$v.form.logininput.email) {
          this.email = this.form.logininput;
          this.mobileno = "";
        } else if (this.$v.form.logininput.alpha) {
          this.mobileno = this.form.logininput;
          this.email = "";
        }
        this.loginUser();
      }
    }
  },
};
</script>
<style lang="" scoped>
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
}
.title {
  text-align: center;
  margin-bottom: 30px;
}
.form {
  margin-bottom: 60px;
}
.md-content {
  z-index: 1;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: relative;
}
.loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
