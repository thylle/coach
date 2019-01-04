<template>
    <form class="boxed-content  text-center  mb-3" v-on:submit.prevent="createProgram" v-if="coach">
      <h2 class="boxed-content__title">Create Program</h2>

      <input v-model="programName" class="form-control form-control-lg mb-3" type="text" placeholder="Name the new program">

      <button class="btn btn-success">Let's do it!</button>
    </form>
</template>

<script>
import APIService from "~/services/api-service.js";
import APICreateService from "~/services/api-create-service.js";
const API = new APIService();
const APICreate = new APICreateService();

export default {
  data() {
    return {
      programName: null
    };
  },

  computed: {
    status() {
      return this.$store.getters.status;
    },
    coach() {
      return this.$store.getters.coach;
    },
    coachActiveUser() {
      return this.$store.getters.coachActiveUser;
    }
  },

  methods: {
    createProgram() {
      APICreate.createProgram(this.coachActiveUser.id, this.programName).then(result => {
        
        API.getUserById(this.coachActiveUser.id).then((result) => {
          console.log("CREATE-PROGRAM > get user by id", result)
          this.$store.commit('SET_COACH_ACTIVE_USER', result)
        }).catch(() =>{
          alert("CREATE-PROGRAM > Error getting user by id");
        });

      });
    }
  }
};
</script>
