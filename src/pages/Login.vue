<template>
  <FormTemplate>
    <template v-slot:form-header>
      <h4>Login</h4>
    </template>
    <template v-slot:form-body>
      <VAlert v-if="apiErr">{{ apiErr }}</VAlert>
      <form class="form-wrap" @submit.prevent="onSubmit">
        <VFormControl label="Email" id="email">
          <VInputText
            type="email"
            v-model="form.email"
            placeholder="Enter Email Address"
            id="email"
          />
          <VError :error="emailError" />
        </VFormControl>
        <VFormControl label="Password" id="password">
          <VInputText
            type="password"
            v-model="form.password"
            placeholder="Enter Password"
            id="password"
          />
          <VError :error="pwdError" />
        </VFormControl>
        <VFormControl>
          <VBtn submit>Login</VBtn>
        </VFormControl>
      </form>
    </template>
  </FormTemplate>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import VInputText from "@/components/atoms/VInputText/VInputText.vue";
import VAlert from "@/components/atoms/VAlert/VAlert.vue";
import VFormControl from "@/components/molecules/VFormControl/VFormControl.vue";
import VBtn from "@/components/atoms/VBtn/VBtn.vue";
import VError from "@/components/atoms/VError/VError.vue";
import FormTemplate from "@/components/templates/FormTemplate.vue"
import { useLogin } from "@/composables/useLogin";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import type { LoginRepository } from "@/repositories/loginRepository";
import type { AxiosError } from "axios";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const { form, loginData } = useLogin();
const { login } = RepositoryFactory.get("login") as LoginRepository;
const emailError = ref<string[]>([]);
const pwdError = ref<string[]>([]);
const isValid = ref<boolean>(true);
const apiErr = ref<string>();
const store = useStore();
const router = useRouter();

const onSubmit = () => {
  apiErr.value = undefined;
  validated();
  if (isValid.value) {
    login(loginData.value)
      .then(({ data }) => {
        store.commit('setUserData', data);
        router.push({ name: 'home' });
      })
      .catch((error: AxiosError) => {
        const errRes = error.response as any;
        if (errRes?.status == 422) {
          if (errRes.data.errors?.email) emailError.value = errRes.data.errors?.email;
          if (errRes.data.errors?.password) pwdError.value = errRes.data.errors?.password;
        } else {
          apiErr.value = errRes.data.errors.message;
        }
      });
  }
};

const isValidEmail = () => {
  emailError.value = [];
  !loginData.value.email
    ? emailError.value.push("Email is required")
    : !(loginData.value.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
      ? emailError.value.push("Invalid Email format")
      : (emailError.value = []);
  if (emailError.value.length > 0) {
    return false;
  }
  return true;
};

const isValidPwd = () => {
  pwdError.value = [];
  !loginData.value.password
    ? pwdError.value.push("Password is required")
    : (pwdError.value = []);
  if (pwdError.value.length > 0) {
    return false;
  }
  return true;
};

const validated = () => {
  isValid.value = true;
  if (!isValidEmail()) isValid.value = false;
  if (!isValidPwd()) isValid.value = false;
};
</script>

<style lang="scss" scoped>
.wrap {
  min-height: calc(100vh - $nav-bar-height);
}
.form-wrap {
  display: contents;
}
</style>
