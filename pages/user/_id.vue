<template>
  <div class="page-container">
    <main-header v-if="currentUser"
      :title="currentUser.name" 
      :desc="telLink(currentUser.phone)">
    </main-header>

    <main class="container  main-content">
      <create-program></create-program>

      <program-list></program-list>

      <tab-info></tab-info> 
    </main>
  </div>
</template>

<script>
import Config from '~/config.js'

import MainHeader from "~/components/base/header.vue";
import CreateProgram from "~/components/misc/create-program.vue";
import ProgramList from "~/components/misc/program-list.vue";
import TabInfo from "~/components/misc/tab-info.vue";

import APIService from "~/services/api-service.js";
import APICreateService from "~/services/api-create-service.js";
import LSService from "~/services/local-storage-service.js";
const API = new APIService();
const APICreate = new APICreateService();
const LS = new LSService();

export default {
  transition: "slide-right",
  components: {
    MainHeader,
    CreateProgram,
    ProgramList,
    TabInfo
  },
  data() {
    return {};
  },

  computed: {
    status() {
      return this.$store.getters.status;
    },
    coach() {
      return this.$store.state.coach;
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  },

  mounted() {
    let userId = this.$route.params.id;
    console.log("userId", userId);

    //Get fresh data even though we have LS data
    API.getUserById(userId).then((result) => {
      
      LS.setLocalStorage(Config.lsCurrentUser, {
        id: userId,
        routeName: 'user'
      })

      //TODO Move to one function... (step-form "Get User")
      // let coachId = result.coach.id;

      // API.getCoachById(coachId).then((coach) => {
      //   result.coach = coach;
      //   this.$store.commit('SET_CURRENTUSER', result)

      //   //TODO add LS name to config
      //   let localStorageName = "coach-app-current-user";
      //   LS.setLocalStorage(localStorageName, {
      //     id: result.awd,
      //     type: 'user'
      //   })
      // });

      this.$store.commit('SET_CURRENTUSER', result)
      this.$store.state.status.loading = false
    });
  },

  methods: {
    telLink(phoneNumber){
      return 'tel: <a href="tel:' + phoneNumber + '">' + phoneNumber + '</a>'
    }
  }

};
</script>
