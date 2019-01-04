<template>
    <div class="program-list">
        <div v-if="currentUser && currentUser.profileComplete && currentUser.programs">
            <div class="boxed-content" 
                @click="activeProgram = item" 
                v-for="item in currentUser.programs" 
                v-bind:key="item.id">
                
                <h2 class="boxed-content__title">{{item.name}}</h2>

                <div v-if="item == activeProgram" v-for="ex in item.exercises" v-bind:key="ex.id">
                    {{ex.name}} : {{ex.weight}}
                </div>
            </div>  
        </div>
            
        <!-- Empty state // No Programs -->
        <div class="boxed-content" v-if="currentUser && currentUser.profileComplete && !currentUser.programs">
            <h2 class="boxed-content__title">It seems that you have no programs</h2>
            <p>Talk to your coach and get one...</p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeProgram: null,
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
