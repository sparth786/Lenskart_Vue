<template>
  <div>
    <md-toolbar md-elevation="1" style="background-color:white">
      <h6 class="md-title" style="flex: 1">
        <img :src="require('@/assets/logo.jpg')" style="width:200px;height:60px" />
      </h6>
      <div v-if="!isLoggedIn">
        <md-button class="md-primary" @click="loginopen('login')">Sign In</md-button>
        <md-button class="md-primary" @click="loginopen('signup')">SignUp</md-button>
      </div>
      <div v-else>
        <md-button class="md-primary" @click="logout_user">Logout</md-button>
      </div>
    </md-toolbar>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      login: state => state.user
    }),
    ...mapGetters("user", ["isLoggedIn"])
    // isLoggedIn: function() {
    //   return this.$store.getters.isLoggedIn;
    // }
  },
  methods: {
    ...mapActions("user", ["logout"]),
    ...mapActions("products", ["getproducttocart"]),
    loginopen: function(checklogin) {
      if (checklogin == "login") {
        this.$router.push({ path: "/login" });
      } else if (checklogin == "signup") {
        this.$router.push({ path: "/signup" });
      }
    },
    logout_user: function() {
      //   this.$store.dispatch('logout')
      //   .then(() => {
      //     this.$router.push('/login')
      //   })
      this.logout().then(() => {
        this.getproducttocart()
          .then(() => {
            this.$router.push("/");
          })
          .catch(err => {
            this.$router.push("/");
          });
      });
    }
  }
};
</script>
<style scoped>
</style>