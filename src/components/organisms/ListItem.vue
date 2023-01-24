<template>
      <td>{{ index+1 }}</td>
      <td>
        <a @click="postDetail(post.id)" class="text-danger" 
        data-bs-toggle="modal" :data-bs-target="store.getters.isLoggedIn?`#showDetail`:''" 
        style="cursor:pointer;">{{ post.title }}
        </a>
      </td>
      <td>{{ post.description }}</td>
      <td>{{ post.created_user}}</td>
      <td>
        <button v-show="store.getters.isLoggedIn"
          class="btn btn-sm btn-info me-3"
          @click="editItem(post.id)"
          >Edit</button
        >
        <button v-show="store.getters.isLoggedIn"
          class="btn btn-sm btn-danger"
          type="button"
          data-bs-toggle="modal" :data-bs-target="store.getters.isLoggedIn?`#deletePost`:''"
          @click="deleteItem(post.id)"
        >
          Delete
        </button>
      </td>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";


interface Props{
  post : {}
  index : number
}
const store = useStore();
defineProps<Props>();
const emits = defineEmits<{
  (e: 'delete', id:number): void;
  (e: 'edit', id:number): void;
  (e: 'detail', id:number): void;
}>();

const deleteItem = (id:number) => {
  emits('delete',id);
}

const editItem = (id:number) => {
  emits('edit',id);
}

const postDetail = (id: number) => {
  emits('detail',id);
}
</script>

<style>

</style>