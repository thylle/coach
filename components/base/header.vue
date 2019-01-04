<template>
  <header class="main-header">
    <div class="container">
      <h1 class="main-header__title" v-html="title"></h1>
      <p class="main-header__byline" v-html="desc"></p>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      userId: null
    };
  },
  props: ['title', 'desc']
};
</script>
