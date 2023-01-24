<template>
  <th v-for="(header,index) in headers" :key="index">{{header.text}}</th>
</template>

<script lang="ts" setup>
interface Props{
  headers:[]
}
defineProps<Props>();

</script>

<style>

</style>