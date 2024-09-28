import LoginOauth2Type from "../../data/enum/LoginOauth2Type";

export default interface LoginOauth2Input {
  loginOauth2Type: LoginOauth2Type.GoogleLogin;
  id: string;
  email: string;
}
