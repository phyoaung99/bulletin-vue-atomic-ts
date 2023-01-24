import type { ChangePassword } from '@/modules/ChangePassword';
import Repository from "./client/ApiAxiosClient";

export interface LoginResponse {
 
}

export const usePasswordRepository = () => {
  /**
   * User Login
   * @param survey
   */
  const changePassword = async (data: ChangePassword) => {
    return await Repository.post('/user/change-password', data);
  };


  return {
    changePassword
  };
};

export type PasswordRepository = ReturnType<typeof usePasswordRepository>;
