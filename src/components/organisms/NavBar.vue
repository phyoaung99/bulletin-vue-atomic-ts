<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link :to="{ name: 'postList' }" class="navbar-brand"
        >Bulletin Board</router-link
      >
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link
            :active-class="'active'"
            :to="{ name: 'userList' }"
            class="nav-item nav-link"
            v-if="store.getters.isLoggedIn && store.state.user.user_type == 0"
          >
            User
          </router-link>
        </div>
        <div class="navbar-nav">
          <router-link
            :active-class="'active'"
            :to="{ name: 'postList' }"
            class="nav-item nav-link"
          >
            Post
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
            <ul class="navbar-nav">
              <li class="nav-item  dropdown"  v-if="store.getters.isLoggedIn">
                <a class="nav-link nav-item dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ store.getters.userName }}
                </a>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li>
                    <router-link
                      class="nav-item nav-link"
                      :to="{ name: 'userProfile' }"
                      :active-class="'active'"
                      >Profile</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="nav-item nav-link"
                      :to="{ name: 'changePassword' }"
                      :active-class="'active'"
                      >Change Password</router-link
                    >
                  </li>
                  <li><a
                    class="nav-item nav-link"
                    @click.prevent="logoutAction"
                    href="javascript:void(0)"
                    v-if="store.getters.isLoggedIn"
                    >Logout</a
                  ></li>
                </ul>
              </li>
            </ul>
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
.dropdown-menu {
  --bs-dropdown-min-width: 9rem;
}
.dropdown-menu[data-bs-popper] {
    left: -56px !important;
}
</style>
