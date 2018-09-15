<template>
  <div class="page-container">
    <header class="main-header">
      <div class="container">
        <!-- <h1 v-html="$t('home.introduction')"></h1> -->

        <div v-if="!currentUser">
          <h1 class="main-header__title" v-html="$t('steps.step1')"></h1>
          <p class="main-header__byline" v-html="$t('steps.step1Desc')"></p>
        </div>

        <div v-if="currentUser && !currentUser.profileComplete">
          <h1 class="main-header__title" v-html="$t('steps.step2')"></h1>
          <p class="main-header__byline" v-html="$t('steps.step2Desc')"></p>
        </div>

        <div v-if="currentUser && currentUser.profileComplete">
          <h1 class="main-header__title" v-html="$t('steps.step3')"></h1>
          <p class="main-header__byline" v-html="$t('steps.step3Desc')"></p>
        </div>
        <!-- <button class="btn btn-secondary" @click="googleSignUp">Sign in with Google</button> -->
      </div>
    </header>

    <main class="container  main-content text-center">
      <!-- Step Form -->
      <step-form></step-form>

      <!-- Program List -->
      <program-list></program-list>

      <!-- Tabs info -->
      <tab-info></tab-info>
    </main>
  </div>
</template>

<script>
import ProgramList from "~/components/user/program-list.vue";
import StepForm from "~/components/user/step-form.vue";
import TabInfo from "~/components/user/tab-info.vue";

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
    return {};
  },

  mounted(){
    //Waiting for mounted beacuse localstorage is not defined at "created"
    //TODO: Add LS name to config
    LS.getLocalStorageByName("coach-app-current-user").then((result) =>{
      this.$store.commit('SET_CURRENTUSER', result)

      //Get fresh data even though we have LS data
      API.getUserById(this.$store, this.currentUser.id)
    })
    .catch(() =>{
      console.log("**** no local storage data **** Hide loading")

      setTimeout(() => {
        this.$store.state.status.loading = false
      },1000);
    });
  },

  computed: {
    status(){
      return this.$store.getters.status;
    },
    currentUser(){
      return this.$store.state.currentUser;
    }
  }  
}
</script>
