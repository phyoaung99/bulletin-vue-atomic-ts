export class Login {
  constructor(
    public email: string | null,
    public password: string | null,
  ) { }
}
export class Post{
  constructor(
    public title:string,
    public description: string,
    public status:string,
  ){ }
}