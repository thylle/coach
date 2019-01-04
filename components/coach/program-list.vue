<template>
  <div v-if="coachActiveUser">
    <h2 class="sub-title  pt-4  mb-3  text-center">Program list</h2>

    <p class="text-center" v-if="coachActiveUser && !coachActiveUser.programs">It seems that you don't have any programs yet</p>

    <a v-on:click="alert('click')" class="card card--link row no-gutters" v-for="item in coachActiveUser.programs" v-bind:key="item.key">
      <img class="rounded-image mr-3" v-bind:src="'http://placeimg.com/120/120/arch/grayscale?' + item.key" alt="">
      <div class="col mt-1">
        <span>{{item.name}}</span><br>
        <span class="small muted">something</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {

  data() {
    return {};
  },

  computed: {
    status() {
      return this.$store.getters.status;
    },
    coachActiveUser() {
      return this.$store.getters.coachActiveUser;
    }
  },

  methods: {
    
  }

};
</script>
