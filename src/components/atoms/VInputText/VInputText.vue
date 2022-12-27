<template>
  <div class="input-text">
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      :id="id"
      class="input-text__input form-control"
      @input="onInput"
    >
  </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

interface Props {
  modelValue: InputHTMLAttributes['value'];
  type: InputHTMLAttributes['type'];
  placeholder?: string;
  id?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: undefined,
  id: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: InputHTMLAttributes['value']): void;
}>();

const onInput = (e: Event) => {
  const { target } = e;
  if (!(target instanceof HTMLInputElement)) return;
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
