<template>
  <div class="container" id="app">
    <div class="my-3 row">
         <div class="col-6" >
            <form action="" class="d-flex" @submit.prevent="filterPosts">
            <div class="col-2 mt-1">
              <label class="" for="">Keyword:</label>
            </div>
            <div class="col-7">
              <input type="text" placeholder="Enter title or description" v-model="keyword" id="keyword" class="form-control" />
            </div>
            <div class="col-2 ms-3">
              <button type="submit" class="nav-item nav-link btn btn-sm btn-primary p-2"
                style="width: 150px;">Search</button>
            </div>
          </form>
         </div>
       <div class="col-2">
         <a class="btn btn-primary text-dark p-2" href="http://127.0.0.1:8000/post/download" style="width: 150px;" download>Download</a>
       </div>
      <div class="col-2">
        <router-link
            class="nav-item nav-link btn btn-sm btn-primary p-2"
            :to="{ name: 'postUpload' }"
            >Upload</router-link>
      </div>
      <div class="col-2">
       <router-link
            class="nav-item nav-link btn btn-sm btn-primary p-2"
            :to="{ name: 'postCreate' }"
            >Post Create</router-link>
      </div>

      <div class="col-md-10 mx-auto">
            <table class="table table-striped">
                <thead>
                    <tr class="text-center">
                        <ListHeader :headers="headers" />
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="(post,index) in posts" :key="index">
                        <ListItem :post="post" :index="index" @delete="comfirmDelete" @edit="editPost" @detail="postDetail"/>
                    </tr>
                </tbody>
            </table>
          <paginate
            :page-count="pageCount"
            :click-handler="postListItem"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'"
            >
        </paginate>
      </div>
    </div>
    </div>
    <VModal id="showDetail" :visible="isShowDetail">
        <template #headerTitle>
            Post Detail
        </template>
        <template #bodyContent v-if="post">
            <p><span>Post ID :</span> <span>{{ post.id }}</span></p>
            <br>
            <p><span>Title :</span> <span>{{ post.title }}</span></p>
            <br>
            <p><span>Description :</span> <span>{{ post.description }}</span></p>
            <br>
        </template>
    </VModal>

    <VModal id="deletePost" :visible="isDelete"> 
    <template #headerTitle>
        Post Delete
    </template>
    <template #bodyContent>
        <p> Are You Sure Want To Delete ? </p>
    </template>
    <template #actionButton>
        <VBtn @click="deletePost" data-bs-dismiss="modal" class="btn-danger">Delete</VBtn>
    </template>
    </VModal>
</template>

<script setup lang="ts">
import paginate from "vuejs-paginate-next";
import VModal from "@/components/molecules/VModal/VModal.vue"
import VInputText from "@/components/atoms/VInputText/VInputText.vue"
import ListItem from "@/components/organisms/ListItem.vue";
import ListHeader from "@/components/organisms/ListHeader.vue";
import VBtn from "@/components/atoms/VBtn/VBtn.vue";
import VFormControl from "@/components/molecules/VFormControl/VFormControl.vue";
import type { Post } from "@/modules/Login";
import type { postRepository, PostResponse } from "@/repositories/postRepository";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import { computed, defineComponent, onMounted, ref } from "@vue/runtime-core";
import router from "@/router";
import { useStore } from "vuex";
const headers = [
    {text:'Title'},
    {text:'Description'},
    {text:'Posted User'},
    {text:'Option'},
]
const store = useStore();
const posts = ref<Post[]>([]);
const postItems = ref<Post[]>([]);
const post = ref<PostResponse>();
const deleteSuccess = ref<string>();
const keyword = ref<string>('');
const deleteId = ref<number>(0);
const isShowDetail = ref<boolean>(false);
const isDelete = ref<boolean>(false);
const pageChange = ref<number>(8);
const currentPage = ref<number>(1);
const { postList, postDelete, getPost } = RepositoryFactory.get('post') as postRepository;

if(!store.getters.isLoggedIn){
    headers.pop();
}
const comfirmDelete = (id:number)=>{
    deleteId.value = id;
    isDelete.value = true;
}
const deletePost = ()=> {
    postDelete(deleteId.value).then((data)=>{
    if(data.status == 200){
        deleteSuccess.value = data.data.message;
    }
    postListItem(currentPage.value);
  }).catch((errors)=>{
    console.log('error',errors);
  })
};

const postListItem = (pageNum:number)=>{
    postList().then((data)=>{
    posts.value = data.data;
    postItems.value = data.data;
    const start = Math.max((pageNum - 1) * pageChange.value, 0);
    const end = Math.max(pageNum * pageChange.value, pageChange.value);
    posts.value = postItems.value.slice(start, end);
    })
    .catch((err)=>{
        console.log(err);
    });
};

const pageCount = computed(()=> Math.ceil(postItems.value.length / pageChange.value));

const editPost = (id:number) => {
    router.push({name:"postEdit", params: { post_id: id } })
}
const postDetail = (id:number) => {
    getPost(id).then((data) => {
        isShowDetail.value = true;
        post.value = data.data
    }).catch((err) => {
        console.log("err");
    })
}

onMounted(()=>{
    postListItem(currentPage.value);
    const pageChange = (oldArg:number, newArg:number) =>{
      postListItem(currentPage.value);
    }
});

const filterPosts = () =>{
    if(keyword.value){
        posts.value = postItems.value.filter(postItem => {
        return (
            postItem.title.includes(keyword.value) ||
            postItem.description.includes(keyword.value)
        );
        });
    }else{
        postListItem(currentPage.value);
    }
};

</script>

<style>
td{
    text-align: center;
}
.search{
    display: inline-block;
}
</style>