<template>
    <form class="boxed-content  text-center  mb-3" v-on:submit.prevent="createUser" v-if="coach">
      <input v-model="userId" class="form-control form-control-lg mb-3" type="number" placeholder="Customer phone number">
      <button class="btn btn-success">Create new user</button>
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
      userId: null
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
    createUser() {
      APICreate.createUser(this.userId, this.coach).then(() => {

        API.getUsersByCoach(this.coach.id).then(users => {
            this.userId = null;
            this.coach.users = users;
            console.log("get user by coach", this.coach);
            this.$store.commit("SET_COACH", this.coach);
          })
          .catch(() => {});
      });
    }
  }
};
</script>
