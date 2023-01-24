export class User {
    constructor(
      public name:string,
      public email: string,
      public password: string,
      public profile: string,
      public type: number,
      public phone: string,
      public address: string,
      public dob: string,
      public created_at: string
    ) { }
}