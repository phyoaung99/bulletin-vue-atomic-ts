<template>
   <FormTemplate>
     <template v-slot:form-header>
        <h4>User Create</h4>
     </template>
     <template v-slot:form-body>
        <VAlert v-if="apiErr">{{ apiErr }}</VAlert>
        <form class="form-wrap" @submit.prevent="onSubmit">
            <VFormControl label="Name" id="name">
                <VInputText v-model="form.name" type="text" placeholder="Enter Your Name" id="name" />
                <VError :error="nameError" />
            </VFormControl>
            <VFormControl label="Email" id="email">
                <VInputText v-model="form.email" type="email" placeholder="Enter Your Email" id="email" />
                <VError :error="emailError" />
            </VFormControl>
            <VFormControl label="Password" id="password">
                <VInputText v-model="form.password" type="password" placeholder="Enter Your Password" id="password" />
                <VError :error="pwdError" />
            </VFormControl>
            <VFormControl label="Proflie" id="pofile">
                <VInputFile @getFile="getFile">
                </VInputFile>
                <img :src="profile_photo_filepath" alt="" class="w-25 mt-3" />
                <VError :error="profileError" />
            </VFormControl>
            <VFormControl label="Type" id="type">
                <VSelectOption v-model="form.type" id="profile" :types="types"/>
                <VError :error="typeError" />
            </VFormControl>
            <VFormControl label="Phone" id="phone">
                <VInputText v-model="form.phone" type="text" placeholder="Enter Your Phone Number" id="phone" />
                <VError :error="phoneError" />
            </VFormControl>
            <VFormControl label="Address" id="name">
                <VInputText v-model="form.address" type="text" placeholder="Enter Your Address" id="address" />
                <VError :error="addressError" />
            </VFormControl>
            <VFormControl label="Date of Birth" id="dob">
                <VInputText v-model="form.dob" type="date" placeholder="Enter Your Birthday" id="dob" />
                <VError :error="dobError" />
            </VFormControl>
            <VFormControl>
                <VBtn submit>Create</VBtn>
            </VFormControl>
        </form>
     </template>
   </FormTemplate>
</template>

<script lang="ts" setup>
import FormTemplate from '@/components/templates/FormTemplate.vue';
import VFormControl from '@/components/molecules/VFormControl/VFormControl.vue';
import VInputText from '@/components/atoms/VInputText/VInputText.vue';
import VInputFile from '@/components/atoms/VInputFile/VInputFile.vue';
import VSelectOption from '@/components/atoms/VSelectOption/VSelectOption.vue';
import VBtn from '@/components/atoms/VBtn/VBtn.vue';
import VError from "@/components/atoms/VError/VError.vue";
import VAlert from "@/components/atoms/VAlert/VAlert.vue";
import { useUserCreate } from "@/composables/userCreate";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import type { UserRepository } from "@/repositories/userRepository";
import type { AxiosError } from "axios";
import { useRouter } from 'vue-router';
import { ref } from "vue";

const { form, userData } = useUserCreate();
const { createUser } = RepositoryFactory.get("user") as UserRepository; 
const nameError = ref<string[]>([]);
const emailError = ref<string[]>([]);
const pwdError = ref<string[]>([]);
const profileError = ref<string[]>([]);
const typeError = ref<string[]>([]);
const phoneError = ref<string[]>([]);
const addressError = ref<string[]>([]);
const dobError = ref<string[]>([]);
const isValid = ref<boolean>(true);
const apiErr = ref<string>();
const imageFile = ref();
const profile_photo_filepath = ref();
const router = useRouter();
const types = [
    {id:0,text:"Admin"},
    {id:1,text:"User"}
]

const getFile = (e: any) => {
      imageFile.value = e.target.files[0]
      const file = e.target.files[0]
      let reader = new FileReader()
      reader.onloadend = () => {
        profile_photo_filepath.value = reader.result
      }
      reader.readAsDataURL(file)
    }

const onSubmit = () => {
    userData.value.profile = imageFile.value;
    apiErr.value = undefined;
    // validated();
    // if(isValid.value){
        createUser(userData.value)
    .then(() => {
        router.push({ name: 'userList' });
    })
    .catch((error: AxiosError) => {
        console.log(error);
        const errRes = error.response as any;
        if (errRes?.status == 422) {
          if (errRes.data.errors?.name) nameError.value = errRes.data.errors?.name;
          if (errRes.data.errors?.email) emailError.value = errRes.data.errors?.email;
          if (errRes.data.errors?.password) pwdError.value = errRes.data.errors?.password;
          if (errRes.data.errors?.profile) profileError.value = errRes.data.errors?.profile;
          if (errRes.data.errors?.type) typeError.value = errRes.data.errors?.type;
          if (errRes.data.errors?.phone) phoneError.value = errRes.data.errors?.phone;
          if (errRes.data.errors?.address) addressError.value = errRes.data.errors?.address;
          if (errRes.data.errors?.dob) dobError.value = errRes.data.errors?.dob;
        } else {
          apiErr.value = errRes.data.errors.message;
        }
      });
    }  
// }

const validated = () => {
  isValid.value = true;

};
</script>

<style>

</style>