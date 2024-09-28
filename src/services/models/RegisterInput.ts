import { Gender } from "../../data/enum/Gender";

export default interface RegisterInput {
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: number;
}

export const registerInput: RegisterInput = {
  nickName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  dateOfBirth: "2024-09-27T20:27:57.717Z",
  gender: Gender.Other,
};
