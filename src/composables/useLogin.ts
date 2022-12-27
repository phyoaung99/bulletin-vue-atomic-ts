import { reactive, computed } from 'vue';
import type { Login } from '@/modules/Login';

interface Form {
  email?: string;
  password?: string;
}

export const useLogin = () => {
  const form = reactive<Form>({
    email: undefined,
    password: undefined
  });

  const loginData = computed<Login>(() => {
    return {
      email: form.email || null,
      password: form.password || null,
    };
  });

  return {
    form,
    loginData
  };
};
