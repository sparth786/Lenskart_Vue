<template>
  <div id="app">
    <loginTab></loginTab>
    <menuHeader></menuHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import menuHeader from "./Header/menuHeader.vue";
import loginTab from "./Header/loginTab.vue";
export default {
  components: {
    menuHeader: menuHeader,
    loginTab: loginTab
  },
  name: "app"
};
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
</style>

<!-- Global CSS -->
<style>
code {
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 0.9em;
  white-space: pre-wrap;
  color: #2c3e50;
}

code::before,
code::after {
  content: "`";
}
</style>
