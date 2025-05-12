export class RegisterUserDto {
  email: string;
  password: string;
  name: string;
}

export class UserRto {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
} 