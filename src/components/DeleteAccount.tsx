import React, { useState, FormEvent } from 'react';

const DeleteAccount: React.FC = () => {
    const [confirmation, setConfirmation] = useState(false);

    const handleChange = (e: FormEvent) => {
        setConfirmation((e.target as HTMLInputElement).checked);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (confirmation) {
            // Handle account deletion
            console.log('Tài khoản đã được xóa.');
        }
    };

    return (
        <div className="flex border-2 rounded-xl bg-slate-900 border-gray-300 lg:p-10 p-5 my-10">
            <div className="w-40 h-auto flex-shrink-0 hidden lg:block lg:mr-12 mr-6 lg:ml-5 mt-5">
                <h2 className="text-xl font-bold mb-4">Delete Account</h2>
            </div>
            <div className="w-full lg:mx-8 min-w-[400px]">
                <h2 className="text-xl font-bold mb-4 block lg:hidden">Delete Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="confirm-delete"
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="confirm-delete" className="ml-3 text-sm font-medium text-gray-700">Tôi hiểu rằng việc xóa tài khoản là không thể hoàn tác.</label>
                    </div>
                    <button type="submit" className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700" disabled={!confirmation}>Xóa tài khoản</button>
                </form>
            </div>
        </div>
    );
};

export default DeleteAccount;
