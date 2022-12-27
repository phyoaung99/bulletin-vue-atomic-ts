import type { Login } from '@/modules/Login';
import Repository from "./client/ApiAxiosClient";

export interface LoginResponse {
  access_token: string;
  expires_at: string;
  token_type: string;
  user_id: number
  user_name: string
  user_type: string
}

export const useLoginRepository = () => {
  /**
   * User Login
   * @param survey
   */
  const login = async (loginData: Login) => {
    return await Repository.post<LoginResponse>('/auth/login', loginData);
  };

  const logout = async () => {
    return await Repository.post('/auth/logout');
  };

  return {
    login,
    logout,
  };
};

export type LoginRepository = ReturnType<typeof useLoginRepository>;
