<template>
  <div>
    <span v-for="(err, index) in error" class="text-danger text--small d-block" :key="index">
      {{ err }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error: string[];
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.text {
  &--small {
    font-size: 14px;
  }
}
</style>
