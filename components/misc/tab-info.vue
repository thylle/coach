<template>
    <div v-if="currentUser && currentUser.coach">
        <ul class="nav-tabs">
            <li class="nav-tabs__item" 
            @click="activeTab = 0"
            v-bind:class="{active : activeTab == 0}"
            v-html="'your coach'">
            </li>
            <li class="nav-tabs__item" 
            @click="activeTab = 1"
            v-bind:class="{active : activeTab == 1}"
            v-html="'you'">
            </li>
        </ul>

        <!-- Coach info -->
        <div class="nav-tabs__content" v-if="activeTab == 0">
            <img class="rounded-image mb-3" src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p200x200/22405705_1701296646570186_3310728804208597393_n.jpg?_nc_cat=0&oh=ec31b485a2b9957f47dd6b36a929155e&oe=5C349DDE" alt="">
            <p>{{currentUser.coach.name}}</p>
            
        </div>

        <!-- User info -->
        <div class="nav-tabs__content" v-if="activeTab == 1">
            <img class="rounded-image mb-3" src="https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p160x160/36684097_10156482222809522_430148280433770496_n.jpg?_nc_cat=0&oh=c77d14c6482bce22d8b6446985699c93&oe=5C3A6C04" alt="">
            <p>{{currentUser.name}}</p>
            <p>{{currentUser.phone}}</p>
            <p>{{currentUser.height}}cm</p>
            <p>{{currentUser.weight}}kg</p>
            <p>{{currentUser.bday}}/{{currentUser.bmonth}}/{{currentUser.byear}}</p>
            <p>{{currentUser.gender}}</p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0
    };
  },

  computed: {
    status() {
      return this.$store.getters.status;
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  }
};
</script>
