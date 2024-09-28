import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { useState } from "react";
import PersonalInformation from "../components/PersonalInformation";
import SetUpAccountForm from "../components/SetUpAccount";
import ManageNotificationsForm from "../components/ManageNotification";
import ActivityHistory from "../components/ActivityHistory";
import DeleteAccount from "../components/DeleteAccount";

interface NavigationItem {
    id: number;
    name: string;
    current: boolean;
}

const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
}

const Profile = () => {
    const [navigation, setNavigation] = useState<NavigationItem[]>([
        { id: 0, name: 'Personal Information', current: true },
        { id: 1, name: 'Set Up Account', current: false },
        { id: 2, name: 'Manage Notifications', current: false },
        { id: 3, name: 'Activity History', current: false },
        { id: 4, name: 'Delete Account', current: false },
    ]);

    const [menuMessage, setMenuMessage] = useState<string | undefined>('Personal Information');

    const updateCurrentStatus = (id: number) => {
        const updatedNavigation = navigation.map((item) =>
            item.id === id ? { ...item, current: true } : { ...item, current: false }
        );
        setNavigation(updatedNavigation);
        setMenuMessage(navigation.find((item) => item.id === id)?.name);
    };

    const scrollToSection = (id: number) => {
        const element = document.getElementById(`section-${id}`);
        if (element) {
            window.scrollTo({
                top: 64,
                behavior: 'smooth'
            })
        }
        updateCurrentStatus(id);
    };

    return (
        <Disclosure as="div" className="top-16 mb-10 flex flex-col bg-gray-50 dark:bg-gray-900 h-[calc(100vh-64px)] overflow-auto">
            {({ open }) => (
                <div>
                    <div className="bg-gray-950 md:hidden p-4 sticky top-0 z-[999]">
                        <DisclosureButton className="w-full flex place-content-between px-3">
                            <p className="text-white text-base font-medium text-nowrap">{menuMessage}</p>
                            {open ? (
                                <p><FontAwesomeIcon icon={faChevronUp} /></p>
                            ) : (
                                <p><FontAwesomeIcon icon={faChevronDown} /></p>
                            )}
                        </DisclosureButton>
                        <DisclosurePanel className="custom:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.id}
                                        as="a"
                                        onClick={() => scrollToSection(item.id)}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-100 hover:bg-gray-700 hover:text-red-600',
                                            'block rounded-sm px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </DisclosurePanel>
                    </div>
                    <div className="flex flex-row">
                        <div className="hidden m-5 lg:w-[25%] md:block md:w-[30%]">
                            <div className="fixed">
                                <p>Profile Setting</p>
                                {navigation.map((item) => (
                                    <p
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={classNames(
                                            item.current ? 'text-red-600 font-bold' : 'text-gray-400 hover:text-red-400',
                                            'cursor-pointer p-2'
                                        )}
                                    >
                                        {item.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 mx-5">
                            <div id="section-0">
                                <PersonalInformation />
                            </div>
                            <div id="section-1">
                                <SetUpAccountForm />
                            </div>
                            <div id="section-2">
                                <ManageNotificationsForm />
                            </div>
                            <div id="section-3">
                                <ActivityHistory />
                            </div>
                            <div id="section-4">
                                <DeleteAccount />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Disclosure>
    );
}

export default Profile;
