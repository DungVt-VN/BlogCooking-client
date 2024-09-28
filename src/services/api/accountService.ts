import { ENVIROMENT } from "../../environment/enviroment";
import LoginInput from "../models/LoginInput";
import { User } from "../models/user";
import { Response } from "../models/response";
import getInstanceAxios from "./getInstanceAxios";

export default class AccountService {
  baseUrl = ENVIROMENT.BASE_API;
  private http = getInstanceAxios(this.baseUrl);

  login = async (loginDto : LoginInput) => {
    try {
      const response = await this.http.post<Response<User>>(`${this.baseUrl}api/account/login`, loginDto);
      console.log(response)
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

//   setCurrentUser(user: User, remember: boolean = false) {
//     user.roles = [];
//     const roles = this.getDecodedToken(user.token).role;
//     Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
//     this.currentUserSource.next(user);
//   }

//   refreshToken(refreshToken: string) {
//     return this.http.post<Response<User>>(
//       this.baseUrl + "account/refesh-token",
//       { refreshToken }
//     );
//   }

//   logout() {
//     this.cookie.deleteAll();
//     this.currentUserSource.next(null);
//   }

//   setAccessToken(accessToken: string) {
//     const expireDate = new Date();
//     expireDate.setHours(expireDate.getHours() + 1);
//     this.cookie.set("accessToken", accessToken, expireDate);
//   }

//   getDecodedToken(token: string) {
//     return JSON.parse(atob(token.split(".")[1]));
//   }

//   loginOauth2(loginOauth2Input: LoginOauth2Input) {
//     return this.http
//       .post<
//         Response<User>
//       >(this.baseUrl + "account/login-oauth2", loginOauth2Input)
//       .pipe(
//         map((response: Response<User>) => {
//           const user = response?.data;
//           if (user) {
//             this.setCurrentUser(user);
//             this.setAccessToken(user.token);
//             this.cookie.set("refreshToken", user.refreshToken, 1);
//           }
//         })
//       );
//   }
}