import Repository from "./client/ApiAxiosClient";
import type { User } from "@/modules/User";

export interface CreateResponse {
    name: string;
    email: string;
    profile: string;
    type: number;
    phone: string;
    dob: string;
    address: string;
    created_user_id: number;
    updated_user_id: number;
    updated_at: string;
    created_at: string;
    id: number;
  }
  
  export const useUserRepository = () => {
    /**
     * User Login
     * @param survey
     */
    const createUser = async (userData: User ) => {
      console.log(userData)
      return await Repository.post<CreateResponse>('/user/create', userData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    };
  
    const userList = async () => {
      return await Repository.get<CreateResponse>(`/user/list`);
    };

    const userDelete = async (id:string|undefined) => {
      return await Repository.delete<CreateResponse>(`/user/delete/${id}`);
    };

    const editUser = async (data: User ) => {
      console.log(data)
      return await Repository.post<CreateResponse>('/user/profile/edit', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    };
    // const editUser = async () => {
    //   return await Repository.post<CreateResponse>(`/user/profile/edit`);
    // };

    const userProfile = async () => {
      return await Repository.get<CreateResponse>('/user/profile');
    };

    return {
      createUser,
      userList,
      userDelete,
      editUser,
      userProfile,
  
    };
  };
  
  export type UserRepository = ReturnType<typeof useUserRepository>;

