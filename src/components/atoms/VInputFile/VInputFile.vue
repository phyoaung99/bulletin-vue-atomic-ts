<template>
  <div class="input-text">
    <input  accept=".jpg, .jpeg, .png, .csv" type="file" name="myfile" @change="onChange" class="input-text__input form-control"/>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string;
}

withDefaults(defineProps<Props>(), {
  id: undefined,
});

const emit = defineEmits<{
  (e: 'getFile', id:string): void;
}>();

const onChange = (e: any) => {
  emit('getFile',e);
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
