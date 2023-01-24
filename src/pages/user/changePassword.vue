<template>
    <FormTemplate>
      <template v-slot:form-header>
        <h4>Change Password</h4>
      </template>
      <template v-slot:form-body>
        <VAlert v-if="apiErr">{{ apiErr }}</VAlert>
        <form class="form-wrap" @submit.prevent="onSubmit">
          <VFormControl label="Current Password" id="currentPassword">
            <VInputText
              type="password"
              id="currentPassword"
              v-model="form.current_password"
            />
            <VError :error="oldPwdError" />
          </VFormControl>
          <VFormControl label="New Password" id="newPassword">
            <VInputText
              type="password"
              id="newPassword"
              v-model="form.new_password"
            />
            <VError :error="newPwdError" />
          </VFormControl>
          <VFormControl label="New Confirm Password" id="confirmPassword">
            <VInputText
              type="password"
              id="confirmPassword"
              v-model="form.new_confirm_password"
            />
            <VError :error="confirmPwdError" />
          </VFormControl>
          <VFormControl>
            <VBtn submit>Change</VBtn>
            <router-link
                :to="{ name: 'userProfile' }"
                class="btn btn-outline-primary ms-3"
                >
                Cancel
                </router-link>
          </VFormControl>
        </form>
      </template>
    </FormTemplate>
  </template>
  
  <script lang="ts" setup>
  import VInputText from "@/components/atoms/VInputText/VInputText.vue";
  import VAlert from "@/components/atoms/VAlert/VAlert.vue";
  import VFormControl from "@/components/molecules/VFormControl/VFormControl.vue";
  import VBtn from "@/components/atoms/VBtn/VBtn.vue";
  import VError from "@/components/atoms/VError/VError.vue";
  import FormTemplate from "@/components/templates/FormTemplate.vue";
  import { UseChangePassword } from "@/composables/useChangePassword";
  import { RepositoryFactory } from "@/repositories/RepositoryFactory";
  import type { PasswordRepository } from "@/repositories/PasswordRepository";
  import type { AxiosError } from "axios";
  import { ref } from "@vue/reactivity";
  import { useRouter } from "vue-router";

  const {form,changePasswordData}  = UseChangePassword();
  const { changePassword } = RepositoryFactory.get("password") as PasswordRepository;
  const apiErr = ref<string>();
  const oldPwdError = ref<string[]>([]);
  const newPwdError = ref<string[]>([]);
  const confirmPwdError = ref<string[]>([]);
  const router = useRouter();

  const onSubmit = () => {
  apiErr.value = undefined;
    changePassword(changePasswordData.value)
      .then(({ data }) => {
        router.push({ name: 'userProfile' });
      })
      .catch((error: AxiosError) => {
        const errRes = error.response as any;
        if (errRes?.status == 422) {
          if (errRes.data.errors?.current_password) oldPwdError.value = errRes.data.errors?.current_password;
          if (errRes.data.errors?.new_password) newPwdError.value = errRes.data.errors?.new_password;
          if (errRes.data.errors?.new_confirm_password) confirmPwdError.value = errRes.data.errors?.new_confirm_password;
        } else {
          apiErr.value = errRes.data.errors.message;
        }
      });
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
  