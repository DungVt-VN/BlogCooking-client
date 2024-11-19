import { useMsal } from "@azure/msal-react";

const SignOut = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect().catch((e) => {
      console.log("Logout error:", e);
    });
  };

  return <button onClick={handleLogout}>Sign Out</button>;
};

export default SignOut;
