import { ENVIROMENT } from "../../environment/enviroment";
import LoginInput from "../models/LoginInput";
import getInstanceAxios from "./getInstanceAxios";
import Cookies from "js-cookie";

  const baseUrl = ENVIROMENT.BASE_API;
  const http = getInstanceAxios(baseUrl);

  export const login = async (loginDto : LoginInput) => {
    try {
      const response = await http.post(`${baseUrl}api/account/login`, loginDto);
      if(response.data){
        const accessTokenDate = new Date();
        accessTokenDate.setHours(accessTokenDate.getHours() + 1);
        const refreshTokenDate = new Date();
        refreshTokenDate.setDate(refreshTokenDate.getDate() + (loginDto.remember ? 7 : 1))
        Cookies.set("accessToken",response.data.token,{expires:accessTokenDate});
        Cookies.set("refreshToken",response.data.refreshToken,{expires:refreshTokenDate});
        return true;
      }

      return false
    } catch (error) {
      return error;
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