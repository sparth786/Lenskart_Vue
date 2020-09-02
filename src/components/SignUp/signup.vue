<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <div class="md-title">
          <h2>Sign Up</h2>
        </div>
      </div>
      <div class="titlebar"></div>

      <form novalidate class="form" @submit.prevent="validateUser">

        <md-field :class="getValidationClass('firstname')">
          <label>First Name</label>
          <md-input
            name="first-name"
            id="first-name"
            autocomplete="given-name"
            v-model="form.firstname"
            :disabled="sending"
          ></md-input>
          <span class="md-error" v-if="!$v.form.firstname.required">The first name is required</span>
          <span class="md-error" v-else-if="!$v.form.firstname.minlength">Invalid first name</span>
        </md-field>

        <md-field :class="getValidationClass('lastname')">
          <label>Last Name</label>
          <md-input
            name="last-name"
            id="last-name"
            autocomplete="given-name"
            v-model="form.lastname"
            :disabled="sending"
          ></md-input>
          <span class="md-error" v-if="!$v.form.lastname.required">The last name is required</span>
          <span class="md-error" v-else-if="!$v.form.lastname.minlength">Invalid last name</span>
        </md-field>

        <md-field :class="getValidationClass('mobileno')">
          <label>MobileNo</label>
          <md-input
            name="mobile-no"
            id="mobile-no"
            autocomplete="given-name"
            v-model="form.mobileno"
            :disabled="sending"
          ></md-input>
          <span class="md-error" v-if="!$v.form.mobileno.required">Mobile No is required</span>
          <span
            class="md-error"
            v-else-if="!$v.form.mobileno.minlength"
          >Mobile Number must be 10 character long</span>
          <span
            class="md-error"
            v-else-if="!$v.form.mobileno.maxlength"
          >Mobile Number must be 10 character long</span>
        </md-field>

        <md-field :class="getValidationClass('email')">
          <label>Email</label>
          <md-input
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            v-model="form.email"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
          <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
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

        <div class="actions md-layout md-alignment-center-space-between">
          <md-button type="submit" :disabled="sending" class="md-raised md-primary">Register</md-button>
        </div>
        <md-snackbar :md-active.sync="userSaved"></md-snackbar>
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
  maxLength
} from "vuelidate/lib/validators";

import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  mixins: [validationMixin],
  data: () => ({
    loading: false,
    form: {
      firstname: null,
      lastname: null,
      mobileno: null,
      email: null,
      password: null
    },
    userSaved: false,
    sending: false
  }),
  validations: {
    form: {
      firstname: {
        required,
        minLength: minLength(4)
      },
      lastname: {
        required,
        minLength: minLength(4)
      },
      mobileno: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      (this.form.firstname = null),
        (this.form.lastname = null),
        (this.form.mobileno = null),
        (this.form.email = null),
        (this.form.password = null);
    },
    saveUser() {
      this.sending = true;

      this.registration_user(this.form).then(() => {
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
        this.$router.push("/login");
      });
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    ...mapActions("user", ["registration_user"])
  }
};
</script>
<style lang="">
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
