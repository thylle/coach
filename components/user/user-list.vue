<template>
  <div v-if="coach">
    <h2 class="sub-title  pt-4  mb-3  text-center">User list</h2>

    <p v-if="coach && !coach.users">It seems that you don't have any customers yet</p>

    <a v-on:click="goToUser(item)" class="card card--link row no-gutters" v-for="item in coach.users" v-bind:key="item.id">
      <img v-if="item.id == '26333636'" class="rounded-image mr-3" src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p160x160/36684097_10156482222809522_430148280433770496_n.jpg?_nc_cat=0&oh=c77d14c6482bce22d8b6446985699c93&oe=5C3A6C04" alt="">
      <img v-else-if="item.id == '27626523'" class="rounded-image mr-3" src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p160x160/29472635_10211599958135896_6435358608669540352_n.jpg?_nc_cat=0&oh=fed186d69a688d42ebe9b6b459a2686c&oe=5BF23D2E" alt="">
      <img v-else class="rounded-image mr-3" src="http://placeimg.com/160/160/people" alt="">
      <div class="col mt-1">
        <span>{{item.name}}</span><br>
        <span class="small muted">#{{item.id}}</span>
      </div>
    </a>
  </div>
</template>

<script>
import APIService from "~/services/api-service.js";
const API = new APIService();

export default {

  data() {
    return {};
  },

  computed: {
    status() {
      return this.$store.getters.status;
    },
    coach() {
      return this.$store.getters.coach;
    }
  },

  mounted() {
    API.getUsersByCoach(this.coach.id).then(users => {
      this.coach.users = users;
      this.$store.commit("SET_COACH", this.coach);
    })
    .catch(() => {});
  },

  methods: {
    goToUser(user){
      this.$store.commit('SET_COACH_ACTIVE_USER', user)
      this.$router.push({path: '/user/' + user.id})
    }
  }

};
</script>
