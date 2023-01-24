<template>
  <div class="container" id="app">
    <div class="my-3 row">
      <div class="col-2">
        <input type="text" class="form-control" name="searchName" id="searchName" placeholder="Name"
          v-model="searchName" />
      </div>
      <div class="col-2">
        <input type="text" class="form-control" name="searchEmail" id="searchEmail" placeholder="Email"
          v-model="searchEmail" />
      </div>
      <div class="col">from:</div>
      <div class="col-2">
        <input type="date" class="form-control" name="createdfrom" id="createdfrom" v-model="fromDate" />
      </div>
      <div class="col">to:</div>
      <div class="col-2">
        <input type="date" class="form-control" name="createdto" id="createdto" v-model="toDate" />
      </div>
      <div class="col-1">
        <VBtn @click="Search">Search</VBtn>
      </div>
      <div class="col-2">
        <router-link class="nav-item nav-link btn btn-primary p-2 text-white" :to="{ name: 'userCreate' }">User Create
        </router-link>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr class="text-center">
          <ListHeader :headers="headers" />
        </tr>
      </thead>
      <tbody class="text-center" v-if="users && users.length > 0">
        <tr v-for="(user, index) in users" :key="index">
          <UserListItem :user="user" @delete="confirmDelete" @detail="userDetail" />
        </tr>
      </tbody>
      <td v-else class="text-center fs-5" colspan="11">
        <p class="mt-3">No matching records found</p>
      </td>
    </table>
    <paginate :page-count="pageCount" :click-handler="userListItem" :prev-text="'Prev'" :next-text="'Next'"
      :container-class="'pagination'" :page-class="'page-item'">
    </paginate>


    <VModal id="deleteUser" :visible="isDelete">
      <template v-slot:headerTitle> User Delete </template>
      <template v-slot:bodyContent>
        <p>Are You Sure Want To Delete ?</p>
      </template>
      <template v-slot:actionButton>
        <VBtn @click="deleteUser" data-bs-dismiss="modal" class="btn-danger">Delete</VBtn>
      </template>
    </VModal>

    <VModal id="showDetail" :visible="isShow">
      <template v-slot:headerTitle> User Detail</template>
      <template v-slot:bodyContent>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-10">
              <div class="row">
                <div class="col-lg-4 col-md-12 col-sm-6 text-center">
                  <img class="" :src="`http://127.0.0.1:8000/profile/${userInfo.id}/${userInfo.profile}`"
                    alt="profile" />
                </div>
                <div class="col-lg-7 col-md-12 col-sm-6 ms-5">
                  <div class="row">
                    <label class="col-md-5 text-md-left">Name</label>
                    <label class="col-md-7 text-md-left">
                      <i class="profile-text text-success">{{
                        userInfo.name
                      }}</i>
                    </label>
                  </div>
                  <br />
                  <div class="row">
                    <label class="col-md-5 text-md-left">Type</label>
                    <label v-if="userInfo.type == 0" class="col-md-7 text-md-left">
                      <i class="profile-text text-success">Admin</i>
                    </label>
                    <label v-if="userInfo.type == 1" class="col-md-7 text-md-left">
                      <i class="profile-text text-success">User</i>
                    </label>
                  </div>
                  <br />
                  <div class="row">
                    <label class="col-md-5 text-md-left">Email</label>
                    <label class="col-md-7 text-md-left">
                      <i class="profile-text text-success">{{
                        userInfo.email
                      }}</i>
                    </label>
                  </div>
                  <br />
                  <div class="row">
                    <label class="col-md-5 text-md-left">Phone</label>
                    <label class="col-md-7 text-md-left">
                      <i class="profile-text text-success">{{
                        userInfo.phone
                      }}</i>
                    </label>
                  </div>
                  <br />
                  <div class="row">
                    <label class="col-md-5 text-md-left">Date of Birth</label>
                    <label class="col-md-7 text-md-left">
                      <i class="profile-text text-success">{{
                        userInfo.dob
                      }}</i>
                    </label>
                  </div>
                  <br />
                  <div class="row">
                    <label class="col-md-5 text-md-left">Address</label>
                    <label class="col-md-7 text-md-left">
                      <i class="profile-text text-success">{{
                        userInfo.address
                      }}</i>
                    </label>
                  </div>
                  <br />
                  <div class="row">
                    <label class="col-md-5 text-md-left">Created Date</label>
                    <label class="col-md-7 text-md-left">
                      <i class="profile-text text-success">{{
                        moment(userInfo.created_at).format("YYYY/MM/DD")
                      }}</i>
                    </label>
                  </div>
                  <br />
                  <div class="row">
                    <label class="col-md-5 text-md-left">Created User</label>
                    <label class="col-md-7 text-md-left">
                      <i class="profile-text text-success">{{
                        userInfo.created_user
                      }}</i>
                    </label>
                  </div>
                  <br />
                  <div class="row">
                    <label class="col-md-5 text-md-left">Updated Date</label>
                    <label class="col-md-7 text-md-left">
                      <i class="profile-text text-success">{{
                        moment(userInfo.updated_at).format("YYYY/MM/DD")
                      }}</i>
                    </label>
                  </div>
                  <br />
                  <div class="row">
                    <label class="col-md-5 text-md-left">Updated User</label>
                    <label class="col-md-7 text-md-left">
                      <i class="profile-text text-success">{{
                        userInfo.updated_user
                      }}</i>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </VModal>
  </div>
</template>
  
<script setup lang="ts">
import UserListItem from "@/components/organisms/UserListItem.vue";
import ListHeader from "@/components/organisms/ListHeader.vue";
import VBtn from "@/components/atoms/VBtn/VBtn.vue";
import VModal from "@/components/molecules/VModal/VModal.vue";
import type { User } from "@/modules/User";
import type { UserRepository } from "@/repositories/userRepository";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
import paginate from "vuejs-paginate-next";
import { computed } from "@vue/reactivity";

const headers = [
  { text: "ID" },
  { text: "Name" },
  { text: "Email" },
  { text: "Created User" },
  { text: "Type" },
  { text: "Phone" },
  { text: "Data Of Birth" },
  { text: "Address" },
  { text: "Created Date" },
  { text: "Updated Date" },
  { text: "Operation" },
];
const deleteUserId = ref<string | undefined>();
const isShow = ref<boolean>(false);
const isDelete = ref<boolean>(false);
const router = useRouter();
const users = ref<User[]>([]);
const userItems = ref<User[]>([]);
const userInfo = ref({});
const searchName = ref<string>("");
const searchEmail = ref<string>("");
const fromDate = ref<string>("");
const toDate = ref<string>("");
const pageChange = ref<number>(3);
const currentPage = ref<number>(1);
const { userList, userDelete } = RepositoryFactory.get(
  "user"
) as UserRepository;
const confirmDelete = (id: string) => {
  console.log(id);
  deleteUserId.value = id;
  isDelete.value = true;
};

const pageCount = computed(() => Math.ceil(userItems.value.length / pageChange.value));

const deleteUser = () => {
  userDelete(deleteUserId.value)
    .then((data) => {
      userListItem(currentPage.value);
    })
    .catch((errors) => {
      console.log("error", errors);
    });
};

const userDetail = (a: any) => {
  isShow.value = true;

  userInfo.value = a;
};

const userListItem = (pageNum: number) => {
  userList()
    .then((data) => {
      users.value = data.data;
      userItems.value = data.data;
      const start = Math.max((pageNum - 1) * pageChange.value, 0);
      const end = Math.max(pageNum * pageChange.value, pageChange.value);
      users.value = userItems.value.slice(start, end);
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  userListItem(currentPage.value);
  const pageChange = (oldArg: number, newArg: number) => {
    userListItem(currentPage.value);
  }
});

const Search = () => {
  users.value = userItems.value.filter((userItem) => {
    let isBetweenDuration = true;
    if (fromDate.value || toDate.value) {
      if (
        moment(userItem.created_at).valueOf() >=
        moment(fromDate.value).valueOf() ||
        moment(userItem.created_at).valueOf() <= moment(toDate.value).valueOf()
      ) {
        isBetweenDuration = true;
      } else {
        isBetweenDuration = false;
      }
    }
    return (
      userItem.name.includes(searchName.value) &&
      userItem.email.includes(searchEmail.value) &&
      isBetweenDuration
    );
  });
};
</script>
  
<style scoped lang="scss">
td {
  text-align: center;
}
</style>