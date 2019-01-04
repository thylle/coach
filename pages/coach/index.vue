<template>
  <div class="page-container">

    <main-header v-if="!coach" 
      :title="'Make a difference'" 
      :desc="'more text here'">
    </main-header>
    
    <main-header v-if="coach" 
      :title="'You are the coach'" 
      :desc="'bla bla bla more here'">
    </main-header>    

    <main class="container  main-content">
      <login></login>

      <create-user></create-user>

      <user-list v-if="coach"></user-list>

      <nuxt-child/>
    </main>
  </div>
</template>

<script>
import MainHeader from "~/components/base/header.vue";
import Login from "~/components/coach/login.vue";
import CreateUser from "~/components/user/create-user.vue";
import UserList from "~/components/user/user-list.vue";


import APIService from "~/services/api-service.js";
const API = new APIService();

export default {
  transition: "slide-right",
  components: {
    MainHeader,
    CreateUser,
    UserList,
    Login
  },
  
  data() {
    return {};
  },

  created() {
    setTimeout(() => {
      this.$store.state.status.loading = false
    },1000);
  },

  computed: {
    status() {
      return this.$store.getters.status;
    },
    coach() {
      return this.$store.getters.coach;
    }
  }
};
</script>
