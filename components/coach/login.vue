<template>
    <form class="boxed-content  text-center  mb-3" v-on:submit.prevent="getCoach" v-if="!coach">
      <h2 class="boxed-content__title">Login</h2>

      <input v-model="coachId" class="form-control form-control-lg mb-3" type="number" placeholder="Enter your coach id">
      <button class="btn btn-success">Go go go</button>
    </form>
</template>

<script>
import APIService from "~/services/api-service.js";
const API = new APIService();

export default {
  data() {
    return {
      coachId: null
    };
  },

  computed: {
    status() {
      return this.$store.getters.status;
    },
    coach() {
      return this.$store.getters.coach;
    }
  },

  methods: {
    getCoach() {
      API.getCoachById(this.coachId)
        .then(result => {
          result.users = null;
          this.$store.commit("SET_COACH", result);
        })
        .catch(() => {
          alert("error getting coach by id when logging in: " + this.coachId);
        });
    }
  }
};
</script>
