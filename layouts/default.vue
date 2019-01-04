<template>
  <div class="wrapper">
    <!-- <nav class="header-nav">
      <button class="header-nav__button" @click="routeBack"><span class="icon icon-chevron-left"></span></button>
    </nav> -->

    <!-- Views will render here -->
    <nuxt/>

    <!-- Global nav bar -->
    <nav class="nav-bar" v-if="currentUser">
      <!-- <nuxt-link class="nav-bar__item" to="/">
        <span class="icon icon-dumbbell"></span>
      </nuxt-link> -->
      <button class="nav-bar__item" @click="clearLocalStorage()">
        <span class="icon icon-trash2"></span>
        <!-- <small>Clear storage</small> -->
      </button>
      
      <button class="nav-bar__item" @click="logOut()">
        <span class="icon icon-lock"></span>
        <!-- <small>Log out</small> -->
      </button>
      
      <!-- <button class="nav-bar__item  nav-bar__item--highlight" v-on:click="openNewExerciseDialog()">
        <span class="icon icon-plus"></span>
      </button> -->
    </nav>

    <!-- Status container for loading and errors -->
    <transition name="fade">
      <div class="status__container" v-if="status.loading || status.error">
        <div class="status__content">
          <strong>{{status.title}}</strong>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Config from '~/config.js'
import LSService from "~/services/local-storage-service.js";
const LS = new LSService();

export default {
  computed: {
    status(){
      return this.$store.getters.status;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },

  methods: {
    routeBack(){
      history.back();
    },

    logOut(){
      LS.setLocalStorage(Config.lsCurrentUser, null)
      this.$router.push({path: '/'})
    },

    clearLocalStorage() {
      localStorage.clear();
      window.location.reload();
    },
  }
}
</script>