import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../configs/authConfig";
import { useEffect, useState } from "react";
import axios from "axios";

const MICROSOFTLOGINURL =
  "http://localhost:5029/api/user/login-with-microsoft/";

const MicrosoftSignIn = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [accessToken, setAccessToken] = useState<string>();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log("Login error:", e);
    });
  };

  useEffect(() => {
    if (isAuthenticated && accounts.length > 0) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          setAccessToken(response.accessToken);
        })
        .catch((error) => {
          console.error("Token acquisition error:", error);
        });
    }
  }, [isAuthenticated, accounts, instance]);

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.post(`${MICROSOFTLOGINURL}`, {
          accessToken: accessToken,
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <button
      className="border-[2px] w-[full] bg-gray-200/20 py-2 px-5 text-black rounded-md text-[14px] flex items-center justify-center gap-2 border-yellow-400 hover:bg-yellow-100 hover:text-black transition"
      onClick={handleLogin}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-5 w-5"
      >
        <path fill="#F25022" d="M12 12H1V1h11z" />
        <path fill="#7FBA00" d="M23 12H12V1h11z" />
        <path fill="#00A4EF" d="M12 23H1V12h11z" />
        <path fill="#FFB900" d="M23 23H12V12h11z" />
      </svg>
      Sign in with Microsoft
    </button>
  );
};

export default MicrosoftSignIn;
