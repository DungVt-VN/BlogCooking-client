import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import UpdateInfor, { defaultUpdateInfor } from '../services/models/UpdateInfor';
import useApiRequest from '../hooks/useApiRequest';
import { Gender } from '../data/enum/Gender';

const UPDATE_INFOR = '/api/account/update-info';

const PersonalInformationForm: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<number>(2024);
    const [selectedMonth, setSelectedMonth] = useState<number>(9);
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [, setFileName] = useState<string | null>(null);

    const isLeapYear = (year: number) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    const getDaysInMonth = (month: number, year: number) => {
        if (month === 2 && isLeapYear(year)) {
            return 29;
        }
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return daysInMonth[month - 1];
    };

    const getDayOptions = () => {
        const days = getDaysInMonth(selectedMonth, selectedYear);
        return Array.from({ length: days }, (_, i) => i + 1);
    };

    const getYearOptions = () => {
        const years = [];
        for (let year = 1900; year <= new Date().getFullYear(); year++) {
            years.push(year);
        }
        return years;
    };

    const getMonthOptions = () => {
        return Array.from({ length: 12 }, (_, i) => ({
            value: i + 1,
            label: `Tháng ${i + 1}`,
        }));
    };

    const [executeRequest, { data, loading, error, code }] = useApiRequest<UpdateInfor>(
        UPDATE_INFOR,
        "PUT"
    );

    const [formValue, setFormValue] = useState<UpdateInfor>(defaultUpdateInfor);

    useEffect(() => {
        const updatedDateOfBirth = new Date(selectedYear, selectedMonth - 1, selectedDay);
        const dateOfBirthString = updatedDateOfBirth.toISOString();

        setFormValue((prev) => ({
            ...prev,
            dateOfBirth: dateOfBirthString,
            gender: prev.gender,
        }));
    }, [selectedYear, selectedMonth, selectedDay]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Nếu là radio button cho giới tính, cập nhật tương ứng
        if (name === 'gender') {
            setFormValue({ ...formValue, gender: Number(value) });
        } else {
            setFormValue({ ...formValue, [name]: value });
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setFileName(file.name);
            // Có thể xử lý logic tải lên tệp ở đây
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        executeRequest(formValue);
    };

    return (
        <div className="flex border-2 rounded-xl bg-slate-900 border-gray-300 lg:p-10 p-5 my-10">
            <div className="w-40 h-40 flex-shrink-0 hidden lg:mr-12 mr-6 lg:ml-5 mt-40 custom:block">
                <div className="w-full h-full flex items-center justify-center">
                    <img
                        // src={formValue.profilePictureURL || '/default-avatar.png'}
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full border-2 border-gray-300"
                    />
                </div>
                <input type="file" id="fileInput" onChange={handleFileChange} className="hidden" />
                <label
                    htmlFor="fileInput"
                    className="cursor-pointer mt-4 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 text-center bg-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Chọn ảnh
                </label>
            </div>
            <div className="w-full lg:mx-8 min-w-[400px]">
                <h2 className="text-xl font-bold mb-4">Thông Tin Cá Nhân</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Biệt danh</label>
                        <input
                            type="text"
                            name="nickName"
                            value={formValue.nickName}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Biệt danh"
                        />
                    </div>

                    <div className='flex w-full'>
                        <div className='w-[50%]'>
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formValue.firstName}
                                onChange={handleChange}
                                className="w-[96%] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tên"
                            />
                        </div>
                        <div className='w-[50%]'>
                            <label htmlFor="lastName" className="ml-[4%] block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formValue.lastName}
                                onChange={handleChange}
                                className="ml-[4%] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[96%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Họ"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày sinh</label>
                        <div className="flex space-x-6">
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={selectedDay}
                                onChange={(e) => setSelectedDay(Number(e.target.value))}
                            >
                                {getDayOptions().map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                            >
                                {getMonthOptions().map((month) => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                            >
                                {getYearOptions().map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giới tính</label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={Gender.Male}
                                    checked={formValue.gender === Gender.Male}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Nam
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={Gender.Female}
                                    checked={formValue.gender === Gender.Female}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Nữ
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={Gender.Other}
                                    checked={formValue.gender === Gender.Other}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Khác
                            </label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={formValue.address}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Địa chỉ"
                        />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formValue.phoneNumber}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Số điện thoại"
                        />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giới thiệu bản thân</label>
                        <textarea
                            name="bio"
                            value={formValue.description}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Một chút về bản thân"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {loading ? 'Loading...' : 'Cập nhật'}
                    </button>
                </form>
                {error && <div className="mt-4 text-red-600">{code}</div>}
            </div>
        </div>
    );
};

export default PersonalInformationForm;
