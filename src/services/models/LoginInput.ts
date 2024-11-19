export default interface LoginInput {
  email: string;
  password: string;
}

export const loginInputDefault: LoginInput = {
  email: "",
  password: "",
};
