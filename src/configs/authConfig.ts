// Code snippet 1 – src/authConfig.js
export const msalConfig = {
  auth: {
    clientId: "f417ef79-8a86-480d-a180-cde7d8c9621e", // client ID của ứng dụng Azure AD
    authority:
      "https://login.microsoftonline.com/374c8e2e-b28d-4fa0-9e32-02cb0f048229", // Thay bằng tenantId của bạn
    redirectUri: "https://2s96lh-5002.csb.app/", // URI đã đăng ký trong Azure
    postLogoutRedirectUri: "/", // Trang sau khi đăng xuất
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache   will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};
/** Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 */
export const loginRequest = {
  scopes: ["User.Read"],
};
