<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }" class="navbar-brand"
        >Bulletin Board</router-link
      >
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link
            :active-class="'active'"
            :to="{ name: 'home' }"
            class="nav-item nav-link"
            v-if="store.getters.isLoggedIn"
          >
            Home
          </router-link>
        </div>

        <div class="ms-auto">
          <ul class="nav navbar-nav">
            <router-link
              class="nav-item nav-link"
              :to="{ name: 'login' }"
              :active-class="'active'"
              v-if="!store.getters.isLoggedIn"
              >Login</router-link
            >
            <a
              class="nav-item nav-link"
              href="javascript:void(0)"
              v-if="store.getters.isLoggedIn"
              >{{ store.getters.userName }}</a
            >
            <a
              class="nav-item nav-link"
              @click.prevent="logoutAction"
              href="javascript:void(0)"
              v-if="store.getters.isLoggedIn"
              >Logout</a
            >
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import type { LoginRepository } from "@/repositories/loginRepository";

const store = useStore();
const router = useRouter();
const { logout } = RepositoryFactory.get("login") as LoginRepository;
const logoutAction = () => {
  logout()
    .then(() => {
      store.commit('setUserData', null);
      router.push({ name: 'login' });
    });
};
</script>

<style scoped lang="scss">
.navbar {
  height: $nav-bar-height;
}
</style>
