import type { ChangePassword } from "@/modules/ChangePassword";
import { computed, reactive } from "vue";

interface ChangePasswordForm {
    current_password?: string;
    new_password?: string;
    new_confirm_password?: string;
}

export const UseChangePassword = () => {
    const form = reactive<ChangePasswordForm>({
        current_password: undefined,
        new_password: undefined,
        new_confirm_password: undefined,
    });

    const changePasswordData = computed<ChangePassword>(() => {
        return {
            current_password:form.current_password || '',
            new_password:form.new_password || '',
            new_confirm_password:form.new_confirm_password || '',
        };
    });

    return {
        form,
        changePasswordData
    };
};