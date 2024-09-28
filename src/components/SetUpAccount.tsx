import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import useApiRequest from '../hooks/useApiRequest';

const CHANGE_PASSSWORD = '/api/account/change-password';

interface SetUpAccountFormData {
    oldPassword: string;
    newPassword: string;
}

const SetUpAccountForm: React.FC = () => {
    const [formData, setFormData] = useState<SetUpAccountFormData>({
        oldPassword: '',
        newPassword: ''
    });

    const [executeRequest, { data, error, code }] = useApiRequest<SetUpAccountFormData>(
        CHANGE_PASSSWORD,
        "PUT",
    );

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [messenge, setMessage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
        executeRequest(formData);
    };

    useEffect(() => {
        if (code == 200) {
            setMessage('Thay doi mat khau thanh cong!');
        }
    }, [code, data, executeRequest, error])

    return (
        <div className="flex border-2 rounded-xl bg-slate-900 border-gray-300 lg:p-10 p-5 my-10">
            <div className="w-40 h-40 flex-shrink-0 hidden lg:block lg:mr-12 mr-6 lg:ml-5 mt-20">
                <h2 className="text-xl font-bold mb-4">Set Up Account</h2>
            </div>
            <div className="w-full lg:mx-8 min-w-[400px] mx-5">
                <h2 className="text-xl font-bold mb-4 lg:hidden block">Set Up Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className='border-white border-2 px-2 rounded-md'>{error}</p>}
                    {messenge}
                    <div className="relative lg:w-[80%] w-full">
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            name="oldPassword"
                            placeholder="Mật khẩu hiện tại"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(prev => !prev)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showCurrentPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>
                    <div className="relative lg:w-[80%] w-full">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            name="newPassword"
                            placeholder="Mật khẩu mới"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(prev => !prev)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>
                    <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700">Cập nhật</button>
                </form>
            </div>
        </div>
    );
};

export default SetUpAccountForm;
