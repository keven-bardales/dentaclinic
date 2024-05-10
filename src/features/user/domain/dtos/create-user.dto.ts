export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  userRoles: number[];

  constructor(email: string, password: string, name: string, userRoles: number[]) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.userRoles = userRoles;
  }

  static create(email: string, password: string, name: string, userRoles: number[]) {
    return new CreateUserDto(email, password, name, userRoles);
  }
}
