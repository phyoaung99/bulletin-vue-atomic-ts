<template>
  <div class="textarea">
    <textarea
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      class="textarea__input form-control"
      @input="onInput"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import type { TextareaHTMLAttributes } from 'vue';

interface Props {
  modelValue: TextareaHTMLAttributes['value'];
  rows?: number;
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  rows: 5,
  placeholder: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: TextareaHTMLAttributes['value']): void;
}>();

const onInput = (e: Event) => {
  const { target } = e;
  if (!(target instanceof HTMLTextAreaElement)) return;
  emit('update:modelValue', target.value);
};
</script>

<style scoped lang="scss">
.textarea {
  &__input {
    appearance: none;
    color: #000000;
    background: transparent;
    max-width: 100%;
    width: 100%;
    border: 1px solid #dedede;
    border-radius: 5px;
    resize: none;
    font-size: 16px;
    line-height: 1.5;
    padding: 15px;
  }
}
</style>
