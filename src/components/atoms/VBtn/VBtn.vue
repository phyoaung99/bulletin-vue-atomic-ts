<template>
  <component
    :is="baseTag"
    class="btn"
    :class="classes"
    v-bind="{ ...$attrs, ...attrs }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { AnchorHTMLAttributes } from 'vue';
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

interface Props {
  small?: boolean;
  large?: boolean;
  color?: 'primary' | 'secondary' | 'danger';
  outlined?: boolean;
  to?: RouteLocationRaw;
  href?: AnchorHTMLAttributes['href'];
  submit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  small: false,
  large: false,
  color: 'primary',
  outlined: false,
  to: undefined,
  href: undefined,
  submit: false,
});

const classes = computed(() => {
  return {
    // size
    'btn-sm': props.small,
    'btn-lg': props.large,
    // color
    'btn-primary': props.color === 'primary' && !props.outlined,
    'btn-secondary': props.color === 'secondary' && !props.outlined,
    'btn-danger': props.color === 'danger' && !props.outlined,
    'btn-outline-primary': props.color === 'primary' && props.outlined,
    'btn-outline-secondary': props.color === 'secondary' && props.outlined,
    'btn-outline-danger': props.color === 'danger' && props.outlined,
  }
});

const baseTag = computed(() => {
  if (props.to) return 'router-link';
  if (props.href) return 'a';
  return 'button';
});

const attrs = computed(() => {
  if (baseTag.value === 'router-link') return { to: props.to };
  if (baseTag.value === 'a') return { href: props.href };
  if (props.submit) return { type: 'submit' };
  return { type: 'button' };
});
</script>

<style scoped lang="scss">
</style>
