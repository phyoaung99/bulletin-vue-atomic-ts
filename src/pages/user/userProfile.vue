<template>
    <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Profile</div>
          <div class="card-body my-3">
            <div class="row">
              <div class="col-lg-4 col-md-12 col-sm-6 text-center">
                <img class="" :src="`http://127.0.0.1:8000/profile/${userInfo.id}/${userInfo.profile}`" alt="profile" />
              </div>
              <div class="col-lg-8 col-md-12 col-sm-6">
                <div class="row">
                  <label class="col-md-4 text-md-left">Name</label>
                  <label class="col-md-8 text-md-left">
                    <i class="profile-text">{{userInfo.name}}</i>
                  </label>
                </div>
                <br>
                <div class="row">
                  <label class="col-md-4 text-md-left">Type</label>
                  <label v-if="userInfo.type == 0" class="col-md-8 text-md-left">
                    <i class="profile-text">Admin</i>
                  </label>
                  <label v-if="userInfo.type == 1" class="col-md-8 text-md-left">
                    <i class="profile-text">User</i>
                  </label>
                </div>
                <br>
                <div class="row">
                  <label class="col-md-4 text-md-left">Email</label>
                  <label class="col-md-8 text-md-left">
                    <i class="profile-text">{{userInfo.email}}</i>
                  </label>
                </div>
                <br>
                <div class="row">
                  <label class="col-md-4 text-md-left">Phone</label>
                  <label class="col-md-8 text-md-left">
                    <i class="profile-text">{{userInfo.phone}}</i>
                  </label>
                </div>
                <br>
                <div class="row">
                  <label class="col-md-4 text-md-left">Date of Birth</label>
                  <label class="col-md-8 text-md-left">
                    <i class="profile-text">{{userInfo.dob}}</i>
                  </label>
                </div>
                <br>
                <div class="row">
                  <label class="col-md-4 text-md-left">Address</label>
                  <label class="col-md-8 text-md-left">
                    <i class="profile-text">{{userInfo.address}}</i>
                  </label>
                </div>
                <br>
                <div class="">
                    <router-link
                      class="btn btn-primary"
                      :to="{ name: 'userEdit'}"
                      :active-class="'active'"
                      >Edit Profile</router-link
                    >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "@vue/runtime-core";
// import type { User } from "@/modules/User";
import type { UserRepository } from "@/repositories/userRepository";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const { userProfile } = RepositoryFactory.get("user") as UserRepository;
const userInfo = ref({});

onMounted(()=>{
    userProfile().then((data) => {
        userInfo.value = data.data;
    })
    .catch((err) => {
      console.log(err);
    });


})

</script>

<style>
.image{
    width: 150px;
    height: 150px;
}
</style>