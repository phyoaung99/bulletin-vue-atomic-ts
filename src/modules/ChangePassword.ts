export class ChangePassword {
    constructor (
        public current_password: string | null,
        public new_password: string | null,
        public new_confirm_password: string | null,
    ){ }
}