<template>
    <div class="input-text">
      <select :value="modelValue" @input="onInput" class="input-text__input form-control">
       <option value="" selected disabled>--- Select one ---</option>
         <option v-for="(type,i) in types" :key="i" :value="type.id">{{ type.text}}</option>
    </select>
    </div>
  </template>
  
<script setup lang="ts">
import type { SelectHTMLAttributes } from 'vue';

interface Props {
  modelValue: SelectHTMLAttributes['value'];
  id?: string;
  types:[];
}

withDefaults(defineProps<Props>(), {
  placeholder: undefined,
  id: undefined,
  types: undefined
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: SelectHTMLAttributes['value']): void;
}>();

const onInput = (e: Event) => {
  const { target } = e;
  if (!(target instanceof HTMLSelectElement)) return;
  emit('update:modelValue', target.value);
};
</script>

<style scoped lang="scss">
.input-text {
  &__input {
    max-width: 100%;
    width: 100%;
  }
}
</style>
