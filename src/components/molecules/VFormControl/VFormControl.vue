<template>
  <div class="mb-3 row">
    <label :for="id" class="col-form-label col-sm-2">{{ label }}</label>
    <div class="col-sm-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  id?: string;
}

defineProps<Props>();
</script>
