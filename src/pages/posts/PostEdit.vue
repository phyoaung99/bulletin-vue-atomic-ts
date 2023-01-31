<template>
   <FormTemplate>
    <template v-slot:form-header>
      <h4>Post Create</h4>
    </template>
    <template v-slot:form-body>
      <VAlert v-if="apiErr">{{ apiErr }}</VAlert>
      <form class="form-wrap" @submit.prevent="updatePost">
        <VFormControl label="Title" id="title">
          <VInputText
            type="text"
            v-model="form.title"
            placeholder="Enter Title"
            id="title"
          />
          <VError :error="titleError" />
        </VFormControl>
        <VFormControl label="Description" id="description">
          <VTextArea
            type="text"
            v-model="form.description"
            placeholder="Enter Description"
            id="description"
          />
         <VError :error="descriptionError" />
        </VFormControl>
        <VFormControl>
          <VBtn submit>Update</VBtn>
        </VFormControl>
      </form>
    </template>
  </FormTemplate>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated, ref } from "vue";
import VInputText from "@/components/atoms/VInputText/VInputText.vue";
import VAlert from "@/components/atoms/VAlert/VAlert.vue";
import VFormControl from "@/components/molecules/VFormControl/VFormControl.vue";
import VBtn from "@/components/atoms/VBtn/VBtn.vue";
import VError from "@/components/atoms/VError/VError.vue";
import VTextArea from "@/components/atoms/VTextArea/VTextArea.vue";
import FormTemplate from "@/components/templates/FormTemplate.vue"
import { usePost } from "@/composables/usePost";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import type { postRepository } from "@/repositories/postRepository";
import { useRoute, useRouter } from "vue-router";
import type { AxiosError } from "axios";

const router = useRouter();
const route = useRoute();
const {form, postData} = usePost();
const titleError = ref<string[]>([]);
const descriptionError = ref<string[]>([]);
const apiErr = ref<string>();
const postId = <number|string>(route.params.post_id);
const { getPost, postUpdate } = RepositoryFactory.get("post") as postRepository;
onMounted(() => {
    getPost(postId)
      .then((data) => {
        form.title = data.data.title;
        form.description = data.data.description;
        form.status = data.data.status;
      })
      .catch((err) => {
        console.log(err);
    });
});
const updatePost = ()=>{
    postUpdate(postData.value,postId).then(()=>{
        router.push({ name: 'postList' })
    }).catch((error: AxiosError)=>{
    const errRes = error.response as any;
        console.log(errRes.data.errors.title)
        if (errRes?.status == 422) {
          if (errRes.data.errors?.title) titleError.value = errRes.data.errors?.title;
          if (errRes.data.errors?.description) descriptionError.value = errRes.data.errors?.description;
        } else {
          apiErr.value = errRes.data.errors.message;
        }
    })
}
</script>

<style>

</style>