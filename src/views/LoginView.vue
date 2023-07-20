<template>
    <div class="home">
    </div>
  </template>
  
  <script>
  import Parse from "parse";
  import HelloWorld from '@/components/HelloWorld.vue'
  
  export default {
    name: 'HomeView',
    data() {
      return {
        loginInfo: {
            email: "kickbutt.js@gmail.com",
            password: "TestPassword"
        }
      }
    },
    components: {
      HelloWorld
    },
    methods: {
        async createUser() {
            var user = new Parse.User();
            user.set("username", this.$data.loginInfo.email);
            user.set("email", this.$data.loginInfo.email);
            user.set("password", this.$data.loginInfo.password);
            user.signUp().then(async () => {
                this.login(true)
            })
        },
        login(isFirstLogin) {
            Parse.User.logIn(this.$data.loginInfo.username, this.$data.loginInfo.password).then(x => {
            }).catch(async e => {
            $$("input").forEach(x => x.blur());
            await alert(e.message);
          });
        }
    }
  }
  </script>
  