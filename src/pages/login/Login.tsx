import { Fragment, useEffect, useState } from "react";
import LoginInput, {
  loginInputDefault,
} from "../../services/models/LoginInput";
import useApiRequest from "../../hooks/useApiRequest";
import AccountService from "../../services/api/accountService";
import MicrosoftSignIn from "../../components/MicrosoftSignIn";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../../configs/authConfig";
import { Link } from "react-router-dom";

const LOGIN = "/api/account/login";

const accountService = new AccountService();

const Login = () => {
  const [executeRequest, { data, loading, error, code }] =
    useApiRequest<LoginInput>(LOGIN, "POST");

  const [email, setEmail] = useState<string>(""); // Trạng thái cho email
  const [password, setPassword] = useState<string>(""); // Trạng thái cho password
  const [formValue, setFormValue] = useState<LoginInput>(loginInputDefault);

  const msalInstance = new PublicClientApplication(msalConfig);

  useEffect(() => {
    setFormValue({
      email: email,
      password: password,
    });
  }, [email, password, code]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ngăn chặn reload trang
    accountService.login(formValue);
    // await executeRequest(formValue);
  };

  useEffect(() => {}, [data, loading, error, executeRequest]);

  return (
    <Fragment>
      <div className="flex justify-center pt-32">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Sign in to your account
          </h1>
          {error && (
            <p className="text-red-500 text-sm text-center border border-red-400 p-2 rounded-md">
              {error}
            </p>
          )}
          <MsalProvider instance={msalInstance}>
            <MicrosoftSignIn />
          </MsalProvider>
          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your username
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username"
                className="block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-800"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-800"
              />
            </div>
            <div className="flex justify-end">
              <Link
                to="/forgotPassword"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
