<template>
  <NavBar />
  <main class="main">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import NavBar from '@/components/organisms/NavBar.vue';
</script>

<style scoped lang="scss">
.main {
  min-height: calc(100vh - $nav-bar-height);
}
</style>
