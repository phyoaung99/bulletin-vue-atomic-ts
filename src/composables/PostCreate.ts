import { reactive, computed } from 'vue';
import type { Post } from '@/modules/Login'

interface Form {
  title?: string;
  description?: string;
  status?: string;
}

export const usePost = () => {
  const form = reactive<Form>({
    title: undefined,
    description: undefined,
    status:undefined
  });

  const postData = computed<Post>(() => {
    return {
      title: form.title || null,
      description: form.description || null,
      status: form.status || null,
    };
  });

  return {
    form,
    postData,
    };
};
