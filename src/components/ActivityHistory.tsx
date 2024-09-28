import React from 'react';

const ActivityHistory: React.FC = () => {
    return (
        <div className="flex border-2 rounded-xl bg-slate-900 border-gray-300 lg:p-10 p-5 my-10">
            <div className="w-40 h-40 flex-shrink-0 hidden lg:mr-12 mr-6 lg:ml-5 mt-20 lg:block">
                <h2 className="text-xl font-bold mb-4">Activity History</h2>
            </div>
            <div className="w-full lg:mx-8 min-w-[400px]">
                <h2 className="text-xl font-bold mb-4 lg:hidden">Activity History</h2>
                <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-white">Lịch sử hoạt động</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            {/* Lịch sử đăng nhập */}
                            <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Lịch sử đăng nhập</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    {/* Thay thế dữ liệu mẫu với dữ liệu thực tế */}
                                    <ul>
                                        <li>Đăng nhập thành công vào 12/09/2024</li>
                                        <li>Đăng nhập thất bại vào 11/09/2024</li>
                                    </ul>
                                </dd>
                            </div>
                            {/* Hoạt động tài khoản */}
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Hoạt động tài khoản</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    {/* Thay thế dữ liệu mẫu với dữ liệu thực tế */}
                                    <ul>
                                        <li>Cập nhật thông tin cá nhân vào 10/09/2024</li>
                                        <li>Thay đổi mật khẩu vào 09/09/2024</li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityHistory;
