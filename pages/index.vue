<template>
  <div class="page-container  no-header">
    <div class="onboarding">
      <div class="container">
        <h1 class="main-header__title">Hvordan vil du bruge appen?</h1>
        <p class="main-header__byline"></p>
      </div>

      <main class="container  main-content text-center">
        <br>
        <br>
        <br>
        <nuxt-link to="/coach" class="btn onboarding-btn">Træner</nuxt-link>
        <br>
        <nuxt-link to="/user" class="btn onboarding-btn onboarding-btn-success">Bruger</nuxt-link>


        <!-- Step Form -->
        <!-- <step-form></step-form> -->

        <!-- Program List -->
        <!-- <program-list></program-list> -->

        <!-- Tabs info -->
        <!-- <tab-info></tab-info> -->
      </main>
    </div>
  </div>
</template>

<script>
import Config from '~/config.js'
import StepForm from "~/components/misc/step-form.vue";
import LSService from "~/services/local-storage-service.js";
const LS = new LSService();

export default {
  transition: 'slide-right',
  components: {
    StepForm
  },

  data() {
    return {};
  },

  created() {
    //Waiting for mounted beacuse localstorage is not defined at "created"
    LS.getLocalStorageByName(Config.lsCurrentUser).then((user) =>{
      console.log("Local storage found - go to user", user);
      this.$router.push({path: user.routeName + '/' + user.id})
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
