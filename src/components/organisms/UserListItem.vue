<template>
      <td>{{ user.id }}</td>
      <td><a @click="userDetail(user)" data-bs-toggle="modal" data-bs-target="#showDetail" style="cursor:pointer" class="text-success">{{ user.name }}</a></td>
      <td>{{ user.email }}</td>
      <td>{{ user.created_user }}</td>
      <!-- <td>
        <img
          :src="'http://127.0.0.1:8000/' + user.profile"
        />
      </td> -->
      <td v-if="user.type == 1">
          User
      </td>
      <td v-if="user.type == 0">
          Admin
      </td>
      <td>{{ user.phone }}</td>
      <td v-if="user.dob">{{moment(user.dob).format("YYYY/MM/DD")}}</td>
      <td v-else>{{ }}</td>
      <td>{{ user.address }}</td>
      <td>{{moment(user.created_at).format("YYYY/MM/DD")}}</td>
      <td>{{moment(user.updated_at).format("YYYY/MM/DD")}}</td>
      <td>
        <!-- <button
          class="btn btn-sm btn-info me-3"
          type="button"
          @click="editUser(user.id)"
        >
          Edit
        </button> -->
        <button
          v-if="store.getters.userId != user.id"
          class="btn btn-sm btn-danger"
          type="button"
          data-bs-toggle="modal" data-bs-target="#deleteUser"
          @click="confirmDeleteUser(user.id)"
        >
          Delete
        </button>
      </td>


     
</template>

<script lang="ts" setup>
import moment from "moment";
import { useStore } from "vuex";
interface Props{
  user:{};
  [key: string]: any;
}
defineProps<Props>();

const store = useStore();
// const confirmDeleteUser = (id:any) =>{
//   deleteUserId.value = id;
//   console.log(deleteUserId.value)
// }


const emits = defineEmits<{
  (e: 'delete', id:any): void;
  (e: 'detail' , id:any): void;
}>();


const confirmDeleteUser = (id:any) => {
  emits('delete',id);
}

const userDetail = (user:any) => {
  console.log(user)
  emits('detail',user);
}

// onMounted(()=>{
//   document.getElementById
// })


</script>

<style>

</style>