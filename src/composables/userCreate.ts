import { reactive,computed } from "vue";
import type { User } from "@/modules/User";

interface createForm {
    name?: string;
    email?: string;
    password?: string;
    profile?: string;
    type?: number;
    phone?: string;
    address?: string;
    dob?: string;
}

export const useUserCreate = () => {
    const form = reactive<createForm>({
        name: undefined,
        email: undefined,
        password: undefined,
        profile: undefined,
        type: undefined,
        phone: undefined,
        address: undefined,
        dob: undefined,
    });
    
    const userData = computed<User>(() => {
        return {
          name: form.name || null,
          email: form.email || null,
          password: form.password || null,
          profile: form.profile || null,
          type: form.type || '',
          phone: form.phone || '',
          address:form.address || '',
          dob: form.dob || '',
        };
    });
    
      return {
        form,
        userData
      };
};




