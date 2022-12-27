import { createStore } from "vuex";
import type { LoginResponse } from "@/repositories/loginRepository";

interface State {
  user: LoginResponse | null;
}

const store = createStore({
  state: {
    user: null,
  },

  mutations: {
    setUserData(state: State, user: LoginResponse | null) {
      state.user = user;
    },
  },

  getters: {
    isLoggedIn: (state: State) => {
      if (state.user && new window.Date(state.user.expires_at).getTime() >= new window.Date().getTime()) {
        return true;
      }
      localStorage.clear();
      return false;
    },
    userRole: (state: State) => {
      if (state.user && state.user.user_type) {
        return state.user.user_type;
      }
      return -1;
    },
    userId: (state: State) => {
      if (state.user && state.user.user_id) {
        return state.user.user_id;
      }
    },
    userName: (state: State) => {
      if (state.user && state.user.user_name) {
        return state.user.user_name;
      }
    },
    token: (state: State) => {
      if (state.user && state.user.access_token) {
        return state.user.access_token;
      }
    },
  },
});

export default store;