<template>
  <div class="page-container">
    <header class="main-header">
      <div class="container">
        <div v-if="!coach">
          <h1 class="main-header__title">Make a difference</h1>
          <p class="main-header__byline">bla bla bla more here</p>
        </div>

        <div v-if="coach">
          <h1 class="main-header__title">You are the coach</h1>
          <p class="main-header__byline">bla bla bla more here</p>
        </div>
      </div>
    </header>

    <main class="container  main-content">
      <form class="boxed-content  text-center  mb-3" v-on:submit.prevent="getCoach" v-if="!coach">
        <h2 class="boxed-content__title">Login</h2>

        <input v-model="coachId" class="form-control form-control-lg mb-3" type="number" placeholder="Enter your coach id">
        <button class="btn btn-success">Go go go</button>
      </form>

      <form class="boxed-content  text-center  mb-3" v-on:submit.prevent="createUser" v-if="coach">
        <input v-model="userId" class="form-control form-control-lg mb-3" type="number" placeholder="Customer phone number">
        <button class="btn btn-success">Create new user</button>
      </form>

      <div v-if="coach">
        <h2 class="sub-title  pt-4  mb-3  text-center">Customer list</h2>

        <p v-if="coach && !coach.users">It seems that you don't have any customers yet</p>

        <div class="card row no-gutters" v-for="item in coach.users" v-bind:key="item.id">
          <img v-if="item.id == '26333636'" class="rounded-image mr-3" src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p160x160/36684097_10156482222809522_430148280433770496_n.jpg?_nc_cat=0&oh=c77d14c6482bce22d8b6446985699c93&oe=5C3A6C04" alt="">
          <img v-else-if="item.id == '27626523'" class="rounded-image mr-3" src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p160x160/29472635_10211599958135896_6435358608669540352_n.jpg?_nc_cat=0&oh=fed186d69a688d42ebe9b6b459a2686c&oe=5BF23D2E" alt="">
          <img v-else class="rounded-image mr-3" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="">
          <div class="col mt-1">
            <span>{{item.name}}</span><br>
            <span class="small muted">#{{item.id}}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import APIService from "~/services/api-service.js";
const API = new APIService();

export default {
  transition: "slide-right",
  data() {
    return {
      userId: null,
      coachId: null
    };
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
  },

  methods: {
    getCoach() {
      API.getCoachById(this.coachId).then(result => {
        result.users = null;
        this.$store.commit("SET_COACH", result);

        API.getUsersByCoach(this.coach.id).then((users) =>{
          this.coach.users = users;
          this.$store.commit("SET_COACH", this.coach);
        }).catch(() => {

        });
      })
      .catch(() => {
        alert("error getting coach by id when logging in: " + this.coachId);
      });
    },
    createUser() {
      API.createUser(this.userId, this.coach.id).then((result) =>{
        API.getUsersByCoach(this.coach.id).then((users) =>{
          this.coach.users = users;
          this.$store.commit("SET_COACH", this.coach);
        }).catch(() => {
            
        });
      });
    }
  }
};
</script>
