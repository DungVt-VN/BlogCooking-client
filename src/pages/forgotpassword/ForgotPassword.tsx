import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useApiRequest from "../../hooks/useApiRequest";

const FORGOTPASSWORD = "http://localhost:5001/api/account/forgot-password";

const ForgotPassword = () => {
  const [executeRequest, { data, error }] = useApiRequest<string>(
    FORGOTPASSWORD,
    "POST"
  );

  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resetCodeError, setResetCodeError] = useState(""); // Trạng thái lỗi cho reset code
  const navigate = useNavigate();

  const handleSendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Vui lòng nhập email của bạn!");
      return;
    }
    setEmailError(""); // Reset lỗi khi email hợp lệ
    console.log(email);
    executeRequest(email);
  };

  const handleSendCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!resetCode) {
      setResetCodeError("Vui lòng nhập mã xác nhận!");
      return;
    }
    setResetCodeError(""); // Reset lỗi khi mã xác nhận hợp lệ
    console.log("Reset code:", resetCode);
    // Thực hiện gửi mã reset ở đây (có thể là gọi API)
  };

  useEffect(() => {
    if (data) {
      alert("Email đã được gửi thành công");
      navigate("/"); // Điều hướng tới trang chủ hoặc trang đăng nhập sau khi thành công
    }
  }, [data, navigate]);

  return (
    <Fragment>
      <div className="flex justify-center pt-32">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Recover Password
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-4 md:space-y-5">
              <div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p> // Hiển thị thông báo lỗi email
                  )}
                  <div className="inline-flex space-x-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="border rounded-lg h-full py-2.5 px-5 bg-blue-700 hover:bg-blue-600 text-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-700"
                    >
                      Send
                    </button>
                  </div>

                  <label
                    htmlFor="resetcode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Reset Code
                  </label>
                  {resetCodeError && (
                    <p className="text-red-500 text-sm mt-1">
                      {resetCodeError}
                    </p> // Hiển thị thông báo lỗi reset code
                  )}
                  <input
                    type="text"
                    name="resetcode"
                    id="resetcode"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full mb-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="123456"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="bg-blue-700 hover:bg-blue-600 border border-gray-300 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-700"
                  >
                    Send Reset Code
                  </button>
                </div>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Have an account yet?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
