<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view class="pageView"/>
  </div>
</template>

<style lang="scss">
@import "./styles/main.scss";
</style>

<script>
import Parse from "parse";
window.Parse = Parse
import ParseUtility from "./utilities/parse";
window.ParseUtility = ParseUtility

export default {
  name: "App",
  async mounted() {
    
  }
}
</script>