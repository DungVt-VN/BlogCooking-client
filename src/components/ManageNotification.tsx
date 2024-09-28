import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ManageNotificationsData {
    email: boolean;
    sms: boolean;
    app: boolean;
}

const ManageNotificationsForm: React.FC = () => {
    const [notifications, setNotifications] = useState<ManageNotificationsData>({
        email: true,
        sms: false,
        app: true,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setNotifications({ ...notifications, [name]: checked });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="flex border-2 rounded-xl bg-slate-900 border-gray-300 lg:p-10 px-5 my- py-5">
            <div className="w-40 h-auto flex-shrink-0 hidden lg:mr-12 mr-6 lg:ml-5 mt-5 lg:block">
                <h2 className="text-xl font-bold mb-4">Manage Notifications</h2>
            </div>
            <div className="w-full lg:mx-8 min-w-[400px]">
                <h2 className="text-xl font-bold mb-4 block lg:hidden">Manage Notifications</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="email"
                            checked={notifications.email}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-3 text-sm font-medium text-gray-700">Thông báo qua email</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="sms"
                            checked={notifications.sms}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-3 text-sm font-medium text-gray-700">Thông báo qua SMS</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="app"
                            checked={notifications.app}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-3 text-sm font-medium text-gray-700">Thông báo qua ứng dụng</label>
                    </div>
                    <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700">Cập nhật</button>
                </form>
            </div>
        </div>
    );
};

export default ManageNotificationsForm;
