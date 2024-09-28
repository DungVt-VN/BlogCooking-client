export default interface LoginInput {
  email: string;
  password: string;
  remember: boolean;
}

export const loginInputDefault: LoginInput = {
  email: "",
  password: "",
  remember: false,
};
