import { Fragment, useEffect, useState} from 'react';
import GoogleLogin from '../components/GoogleLogin';
import FacebookLogin from '../components/FacebookLogin';
import LoginInput, { loginInputDefault } from '../services/models/LoginInput';
import useApiRequest from '../hooks/useApiRequest';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ENVIROMENT } from '../environment/enviroment';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api/accountService';

const LOGIN = '/api/account/login';

const Login = () => {
    const [executeRequest, { data, loading, error, code }] = useApiRequest<LoginInput>(
        LOGIN,
        "POST"
    );

    const router = useNavigate();

    const [email, setEmail] = useState<string>(''); // Trạng thái cho email
    const [password, setPassword] = useState<string>(''); // Trạng thái cho password
    const [rememberMe, setRememberMe] = useState<boolean>(false); // Trạng thái cho Remember Me
    const [formValue, setFormValue] = useState<LoginInput>(loginInputDefault);

    useEffect(() => {
        setFormValue({
            email: email,
            password: password,
            remember: rememberMe,
        });
    }, [email, password, rememberMe, code]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Ngăn chặn reload trang
        const res = await login(formValue);
        console.log(res);
        if(res == true){
            router("/home")
        }
        else{
            console.error(res);
        }
        // await executeRequest(formValue);
    };

    useEffect(() => {
    }, [data, loading, error, executeRequest])

    return (
        <Fragment>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <p className='border-white border-2 px-2 rounded-md'>
                                {error}
                            </p>
                            <div className='flex place-content-between'>
                                <GoogleOAuthProvider clientId={ENVIROMENT.GOOGLE_CLIENT_ID}>
                                    <GoogleLogin />
                                </GoogleOAuthProvider>
                                <FacebookLogin />
                            </div>
                            <div className='relative'>
                                <div className='flex place-content-between'>
                                    <div className='border-[1px] w-[43%] border-gray-500 rounded-md'></div>
                                    <div className='border-[1px] w-[43%] border-gray-500 rounded-md'></div>
                                </div>
                                <div className='absolute -top-4 left-0 w-full flex justify-center items-center text-xl text-gray-300'>
                                    or
                                </div>
                            </div>
                            <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}> {/* Thêm onSubmit */}
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        value={email} // Gán giá trị từ state
                                        onChange={(e) => setEmail(e.target.value)} // Cập nhật state khi người dùng nhập
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        required
                                        value={password} // Gán giá trị từ state
                                        onChange={(e) => setPassword(e.target.value)} // Cập nhật state khi người dùng nhập
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                checked={rememberMe} // Gán giá trị từ state
                                                onChange={() => setRememberMe(!rememberMe)} // Cập nhật trạng thái khi checkbox được chọn
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="/forgotPassword" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Login;
