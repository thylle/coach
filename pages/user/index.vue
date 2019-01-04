<template>
  <div class="page-container">


    <main class="container  main-content text-center">
      <!-- Step Form -->
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <div class="boxed-content  step-form  mb-3" v-if="!currentUser">
        <form v-if="!currentUser"  v-on:submit.prevent="goToUser()">
          <h2 class="boxed-content__title">Find your programs</h2>

          <input v-model="userId" autofocus class="form-control form-control-lg mb-3" type="number" placeholder="Enter your mobile number">

          <button class="btn btn-success  next-step">Next step</button>
        </form>
      </div>

      <!-- <step-form></step-form> -->

      <!-- Program List -->
      <!-- <program-list></program-list> -->

      <!-- Tabs info -->
      <!-- <tab-info></tab-info> -->
    </main>
  </div>
</template>

<script>
import ProgramList from "~/components/misc/program-list.vue";
import StepForm from "~/components/misc/step-form.vue";
import TabInfo from "~/components/misc/tab-info.vue";

import APIService from "~/services/api-service.js";
import LSService from "~/services/local-storage-service.js";
const API = new APIService();
const LS = new LSService();

export default {
  transition: 'slide-right',
  components: {
    ProgramList,
    StepForm,
    TabInfo
  },

  data() {
    return {
      userId: null
    };
  },

  computed: {
    status(){
      return this.$store.getters.status;
    },
    currentUser(){
      return this.$store.state.currentUser;
    }
  },

  created() {
    this.$store.state.status.loading = false
  },

  methods:{
    goToUser() {
      console.log("get user by id", this.userId);

      this.$router.push({path: '/user/' + this.userId})
    }
  }
}
</script>
