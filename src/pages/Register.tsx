import { Fragment, useEffect, useState } from 'react';
import RegisterInput, { registerInput } from '../services/models/RegisterInput';
import useApiRequest from '../hooks/useApiRequest';
import { Gender } from '../data/enum/Gender';
const REGISTER = '/api/account/register';

const Register = () => {
    const [executeRequest, { data, loading, error, code }] = useApiRequest<RegisterInput>(
        REGISTER,
        "POST"
    );
    const [formValue, setFormValue] = useState<RegisterInput>(registerInput);

    const [nickname, setNickname] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState<Gender>(Gender.Other);
    const [date, setDate] = useState({
        day: 1,
        month: 9,
        year: 2024
    });

    useEffect(() => {
        const updatedDateOfBirth = new Date(date.year, date.month - 1, date.day);
        const dateOfBirthString = updatedDateOfBirth.toISOString();

        setFormValue({
            nickName: nickname,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            dateOfBirth: dateOfBirthString,
            gender: gender
        });
    }, [nickname, firstName, lastName, email, password, gender, date])

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
        const days = getDaysInMonth(date.month, date.year);
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
        return [
            { value: 1, label: "Tháng 1" },
            { value: 2, label: "Tháng 2" },
            { value: 3, label: "Tháng 3" },
            { value: 4, label: "Tháng 4" },
            { value: 5, label: "Tháng 5" },
            { value: 6, label: "Tháng 6" },
            { value: 7, label: "Tháng 7" },
            { value: 8, label: "Tháng 8" },
            { value: 9, label: "Tháng 9" },
            { value: 10, label: "Tháng 10" },
            { value: 11, label: "Tháng 11" },
            { value: 12, label: "Tháng 12" },
        ];
    };

    const handleDateChange = (type: 'day' | 'month' | 'year', value: number) => {
        setDate((prevDate) => ({
            ...prevDate,
            [type]: value,
        }));
    };

    useEffect(() => {
        console.log(data);
    }, [data, loading, error, executeRequest])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formValue);
        executeRequest(formValue);
    };

    return (
        <Fragment>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center px-6 py-14 mx-auto md:h-screen lg:py-0 overflow-scroll lg:overflow-scroll">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-5 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-10">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-6">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register
                            </h1>
                            <p className='border-white border-2 px-2 rounded-md'>
                                {code}
                            </p>
                            <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <input type="text" name="nickname" id="nickname" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                                </div>
                                <div className='flex'>
                                    <div>
                                        <input type="text" name="firstname" id="firstname" className="bg-gray-50 border w-[95%] border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div>
                                        <input type="text" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <input type="password" name="password" id="password" placeholder="Password" className=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày sinh</label>
                                    <div className="flex space-x-2">
                                        <select
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={date.day}
                                            onChange={(e) => handleDateChange('day', Number(e.target.value))}
                                        >
                                            {getDayOptions().map((day) => (
                                                <option key={day} value={day}>
                                                    {day}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={date.month}
                                            onChange={(e) => handleDateChange('month', Number(e.target.value))}
                                        >
                                            {getMonthOptions().map((month) => (
                                                <option key={month.value} value={month.value}>
                                                    {month.label}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={date.year}
                                            onChange={(e) => handleDateChange('year', Number(e.target.value))}
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
                                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giới tính</label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value as unknown as Gender)}
                                    >
                                        <option value="Male">Nam</option>
                                        <option value="Female">Nữ</option>
                                        <option value="Other">Other</option>

                                    </select>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng ký</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default Register;
