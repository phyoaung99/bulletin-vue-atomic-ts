<template>
   <FormTemplate>
    <template v-slot:form-header>
      <h4>File Upload</h4>
    </template>
    <template v-slot:form-body>
      <form class="form-wrap" @submit.prevent="onSubmitFile">
        <VFormControl label="CSV File" id="csvfile">
            <VInputFile @getFile="getFile">
            </VInputFile>
            <span class="text-danger">{{apiErr}}</span>
        </VFormControl>
        <VFormControl>
            <VBtn submit>Upload</VBtn>
        </VFormControl>
      </form>
    </template>
   </FormTemplate>
</template>

<script setup lang="ts">
import VFormControl from "@/components/molecules/VFormControl/VFormControl.vue";
import VInputFile from "@/components/atoms/VInputFile/VInputFile.vue";
import VBtn from "@/components/atoms/VBtn/VBtn.vue";
import VError from "@/components/atoms/VError/VError.vue";
import FormTemplate from "@/components/templates/FormTemplate.vue";
import { ref } from "@vue/reactivity";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import type { postRepository } from "@/repositories/postRepository";
import type { AxiosError } from "axios";
import router from "@/router";
const {postUpload} = RepositoryFactory.get('post') as postRepository;
const csvFile = ref<string>('');
const apiErr = ref<string>('');
const getFile = (e: any) => {
      csvFile.value = e.target.files[0];
       console.log(csvFile.value);
}
const onSubmitFile = () => {
      const formData = new FormData();
      formData.append("csv_file", csvFile.value as any);
      postUpload(formData)
          .then((res) => {
              router.push({name:"postList"});
          })
          .catch((error: AxiosError) => {
            console.log(error)
            const errRes = error.response as any;
            if (errRes?.status == 400) {
            apiErr.value = errRes.data.error;
            console.log(apiErr);
            }
          });
        }
</script>

<style>

</style>