import type { Post } from '@/modules/Post';
import axios from 'axios';
import Repository from "./client/ApiAxiosClient";

export interface PostResponse {
  title?: string;
  description?: string;
  status?: string;
}

export const usePostRepository = () => {

  const postCreate = async (postData: Post) => {
    return await Repository.post<PostResponse>('/post/create', postData);
  };

  const postList = async () => {
    return await Repository.get('/post/list');
  }

  const postDelete = async (id:number) => {
    return await Repository.delete(`/post/delete/${id}`);
  }
  const getPost = async (id:number|string) => {
    return await Repository.get<PostResponse>(`/post/${id}`);
  }

  const postUpdate = async (postData:Post,id:number|string) => {
    return await Repository.post(`/post/edit/${id}`,postData);
  }

  const postUpload =async (formData:any) => {
    return await Repository.post<PostResponse>("/post/upload",formData, {
      headers: {
          "Content-Type": "multipart/form-data"
      }
    });
  }
  return {
    postCreate,
    postList,
    postDelete,
    getPost,
    postUpdate,
    postUpload,
  };

};

export type postRepository = ReturnType<typeof usePostRepository>;
